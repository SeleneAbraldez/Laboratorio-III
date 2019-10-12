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

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;

        var_dump($cadenaJSON);
        $obj = json_decode($cadenaJSON);

        $a = fopen("./alien.json","r");

        $string = '';

        while(!feof($a)){
            $linea = trim(fgets($a));
            
            if(strlen($linea) > 0){
                $vec = explode(",", $linea);
                $cuadrante = trim(explode(":", $vec[0])[1],'"');//Obtiene el valor del cuadrante.
                $raza = trim(explode(":", $vec[3])[1],'"');//Obtiene el valor del cuadrante.
                
                if($cuadrante == $obj->cuadrante && $raza == $obj->raza){
                    continue;
                }
                $string .= $linea . "\r\n";
            }         
        }

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./alien.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        if($cant < 1){
            $objRetorno->TodoOK = FALSE;
        }

        echo json_encode($objRetorno);        
        
    break;

    case 'modificar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./alien.json","r");

        $string = '';

        while(!feof($a)){
            $linea = trim(fgets($a));
            
            if(strlen($linea) > 0){
                $vec = explode(",", $linea);
                $cuadrante = trim(explode(":", $vec[0])[1],'"');//Obtiene el valor del cuadrante.
                $raza = trim(explode(":", $vec[3])[1],'"');//Obtiene el valor del cuadrante.
                
                if($cuadrante == $obj->cuadrante && $raza == $obj->raza){
                    continue;
                }
                $string .= $linea . "\r\n";
            }         
        }

        $string .=  $cadenaJSON . "\r\n";

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./alien.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        if($cant < 1){
            $objRetorno->TodoOK = FALSE;
        }

        $pathOrigen = $_FILES['foto']['tmp_name'];   
        
        $objJson = json_decode($cadenaJSON);    

        $pathDestino = "./fotos/".$objJson->pathFoto;
        
        move_uploaded_file($pathOrigen, $pathDestino);

        echo json_encode($objRetorno);        

    break;

    case "paises":
    
        $a = fopen("./paises.json","r");
        $paises = fread($a, filesize("./paises.json"));
        fclose($a);

        echo ($paises);

    break;

    default:
        echo ":(";
        break;
}