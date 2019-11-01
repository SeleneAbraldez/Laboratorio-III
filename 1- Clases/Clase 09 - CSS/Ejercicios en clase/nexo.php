<?php

    include_once ("./clases/AccesoDatos - Mercado.php");
    include_once ("./clases/usuarix.php");

    $op = isset($_POST['op']) ? $_POST['op'] : NULL;

    switch ($op) {

    //USUARIXS

        case 'mostrarTodxsUsu':
            $usuarixs = usuarix::TraerTodxsUsu();
            $tabla = "<table><tr><td>ID</td><td>NOMBRE</td><td>APELLIDO</td><td>MAIL</td><td>PERFIL</td><td>ESTADO</td><td>FOTO</td></tr>";
            foreach ($usuarixs as $usuarix) {
                $exploUsu = $usuarix->MostrarDatosUsu();
                $fila = explode(" - ", $exploUsu);
                if($fila[7] == ""){
                    $fila[7] = "No hay foto";
                }else{
                    $fila[7] = "<img src='./fotos/" . $fila[7] . "' width='100px' height='100px'/>";
                }
                $tabla .= "<tr><td>" . $fila[0] . "</td><td>" . $fila[1] . "</td><td>" . $fila[2] .  "</td><td>" . $fila[3] . "</td><td>" . $fila[5] ."</td><td>" . $fila[6] ."</td><td>" . $fila[7] . "</td></tr>";
            }
            $tabla .= "</table>";
            echo $tabla;
            break;

        case 'agregarUsu':
            $miUsu = new usuarix();
            $miUsu->nombre =  isset($_POST['nombreAgre']) ? $_POST['nombreAgre'] : NULL;
            $miUsu->apellido =  isset($_POST['apellidoAgre']) ? $_POST['apellidoAgre'] : NULL;
            $miUsu->mail =  isset($_POST['mailAgre']) ? $_POST['mailAgre'] : NULL;
            $miUsu->clave =  isset($_POST['claveAgre']) ? $_POST['claveAgre'] : NULL;
            $miUsu->perfil =  isset($_POST['perfilAgre']) ? $_POST['perfilAgre'] : NULL;
            $miUsu->estado =  isset($_POST['estadoAgre']) ? $_POST['estadoAgre'] : NULL;

            $objRetorno = new stdClass();
            $objRetorno->Ok = false;

            $destino = "./fotos/" . date("Ymd_His") . ".jpg";
            
            if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
                $objRetorno->Ok = true;
                $objRetorno->Path = $destino;
            }

            echo json_encode($objRetorno);

            if(usuarix::AgregarUsu($miUsu) == 1){
                echo "Usuarix {$miUsu->apellido} agregadx!";
            }else{
                echo "ERROR -! No se ha agregado usuarix {$miUsu->apellido}";
            }

            break;

        case 'modificarUsu':
            $idModi = $_POST['idModi'] ;    
            $miUsu = new usuarix();
            $miUsu->nombre =  isset($_POST['nombreModi']) ? $_POST['nombreModi'] : NULL;
            $miUsu->apellido =  isset($_POST['apellidoModi']) ? $_POST['apellidoModi'] : NULL;
            $miUsu->mail =  isset($_POST['mailModi']) ? $_POST['mailModi'] : NULL;
            $miUsu->clave =  isset($_POST['claveModi']) ? $_POST['claveModi'] : NULL;
            $miUsu->perfil =  isset($_POST['perfilModi']) ? $_POST['perfilModi'] : NULL;
            $miUsu->estado =  isset($_POST['estadoModi']) ? $_POST['estadoModi'] : NULL;

            if(usuarix::ModificarUsu($idModi, $miUsu) == 1){
                echo "Usuarix {$idModi} modificadx!";
            }else{
                echo "ERROR -! No se ha modificado usuarix {$idModi}";
            }

            break;

        case 'eliminarUsu':
            $idEli = isset($_POST['idEli']) ? $_POST['idEli'] : NULL;
            if(usuarix::EliminarUsu($idEli) == 1){
                echo "Usuarix {$idEli} eliminadx!";
            }else{
                echo "ERROR -! No se ha eliminado usuarix {$idEli}";
            }
            break;
            
        default:
            echo "Selecione una opcion porfi :(";
            break;
    }
