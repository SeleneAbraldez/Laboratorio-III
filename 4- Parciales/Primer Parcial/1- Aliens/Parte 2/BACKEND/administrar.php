<?php
$caso = isset($_POST["caso"]) ? $_POST["caso"] : null;

//var_dump($caso);
sleep(1);

switch ($caso) {

    case 'agregar':
        //recibo la info para agregar en el json
        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;

        //abro el archivo alien json para escribirlo
        $ar = fopen("./alien.json", "a");
        $escrt = fwrite($ar, $cadenaJSON . "\r\n");
        fclose($ar);  

        //recibo la imagen para guardarla en fotos
        $pathOrigen = $_FILES['foto']['tmp_name'];        
        $objJson = json_decode($cadenaJSON);       //decodeo la cadena recibida para extraer el path
        $pathDestino = "./fotos/" . $objJson->pathFoto;  
        $resultado = new \stdClass();
        $resultado->ok = false;      
        if(move_uploaded_file($pathOrigen, $pathDestino)) //y asi poder guardar la foto con su nombre
        {
            if($escrt > 0){
                $resultado->ok = true;
            }
        }  

        echo json_encode($resultado);   //mando un ok si se pudo agregar el televisor y mover la foto
        break;


    case 'traer':
        //abrre alien para recuperarlos
        $a = fopen("./alien.json", "r");
        $datos = "";
        while (!feof($a)) {
            $linea = trim(fgets($a));
            if (strlen($linea) > 0)
                $datos .= $linea . ','; //guardo linea a linea
        }
        fclose($a);

        $datos = substr($datos, 0, strlen($datos) - 1); //devuelve los datos sin la coma
        echo ('[' . $datos . ']');  //guardo con formato de json        
        break;


    case 'eliminar':
        //recibo la cadena Json
        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $objAlien = json_decode($cadenaJSON);

        //abro el txt para encontrar el alien
        $a = fopen("./alien.json","r");
        $datos = '';
        while(!feof($a)){
            $linea = trim(fgets($a));
            if(strlen($linea) > 0){
                $vec = explode(",", $linea);    //sacando la coma y
                $cuadrante = trim(explode(":", $vec[0])[1],'"');    //obteniendo el valor del cuadrante
                $raza = trim(explode(":", $vec[3])[1],'"');        //y de raza
                if($cuadrante == $objAlien->cuadrante && $raza == $objAlien->raza){ //comprueba si existe en el txt
                    continue;   
                }
                $datos .= $linea . "\r\n";
            }         
        }
        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = true;

        //abro el txt para sobreescribir la data sin el alien
        $a = fopen("./alien.json","w");
        $cant = fwrite($a, $datos);     //como lo salteo no lo guarda de vuelta en el txt
        fclose($a);
        if($cant < 1){
            $objRetorno->TodoOK = false;    //si no se pudo escribir
        }
  
        unlink("./fotos/" . $objAlien->pathFoto); //borra la foto
        
        echo json_encode($objRetorno);        
    break;


    case 'modificar':
        //recibo la cadena Json
        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        //la paso a un obj
        $obj = json_decode($cadenaJSON);

        $a = fopen("./alien.json","r");     //abro el json para modicicarlo
        $string = '';
        while(!feof($a)){
            $linea = trim(fgets($a));
            if(strlen($linea) > 0){
                $string .= $linea . "\r\n";
            }        
        }
        $string .=  $cadenaJSON . "\r\n";   // guarda la info nueva 

        
        
        fclose($a); //cierro json


        $objRetorno = new stdClass();
        $objRetorno->ok = true;

        $a = fopen("./alien.json","w"); //escribo los valores nuevos
        $cant = fwrite($a, $string);
        fclose($a);

        $pathOrigen = $_FILES['foto']['tmp_name'];   //recuper el nombre viejo
        $objJson = json_decode($cadenaJSON);    
        $pathDestino = "./fotos/".$objJson->pathFoto;   //para el nuevo

        if($cant < 1){  //si no se cambio el archivo
            $objRetorno->ok = false;            
        }

        move_uploaded_file($pathOrigen, $pathDestino); //si no se pudo mover el archivo

        echo json_encode($objRetorno);        
    break;

    
    default:
        echo ":(";
        break;
}