<?php  
    include_once ("../clases/usuarix.php");
    include_once ("../clases/AccesoDatos - Mercado.php");
    // post de info de login
    $cuenta = isset($_POST["login"]) ? $_POST["login"]: NULL;
    $obj = json_decode($cuenta);

    $respu = new stdClass();
    // creamos un usuario para comparar en la funcion y que pase si existe o no
    $usu = new usuarix();
    $usu = $usu->YaExiste($obj->mail, $obj->clave);
    if($usu->ok){
        $respu->mensj = "Usuarix encontrado!";
        $respu->ok = true;
        //creamos una sesion con el tipo de perfil que tiene lx usuarix encontradx 
        session_start();
        $_SESSION["perfil"] = $usu->usuar->perfil;
    }else{
        $respu->mensj = "ERROR - Mail o contraseña incorrectos";
        $respu->ok = false;
    }

    echo json_encode($respu);
?>