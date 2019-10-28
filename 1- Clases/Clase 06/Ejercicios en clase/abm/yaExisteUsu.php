<?php  
    include_once ("../clases/usuarix.php");
    include_once ("../clases/AccesoDatos - Usuarixs.php");
    // post de info de login
    $cuenta = isset($_POST["login"]) ? $_POST["login"]: NULL;
    $obj = json_decode($cuenta);

    $respu = new stdClass();
    // creamos un usuario para comparar en la funcion y que pase si existe o no
    $usu = new usuarix();
    if($usu->YaExiste($obj->mail, $obj->clave)){
        $respu->mensj = "Usuarix se encuentra!";
        $respu->ok = true;
    }else{
        $respu->mensj = "ERROR - Mail o contraseña incorrectos";
        $respu->ok = false;
    }

    echo json_encode($respu);
?>