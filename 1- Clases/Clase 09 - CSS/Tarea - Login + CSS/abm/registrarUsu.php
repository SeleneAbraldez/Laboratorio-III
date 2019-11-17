<?php

    include_once ("../clases/usuarix.php");
    include_once ("../clases/AccesoDatos - Mercado.php");

    $cuenta = isset($_POST["regist"]) ? $_POST["regist"]: NULL;
    $obj = json_decode($cuenta);

    $usu = new usuarix();   
    $respu = new stdClass();

    if($usu->YaExisteMail($obj->mail)){
        $respu->mensj = "ERROR - Mail ya registrado!";
        $respu->ok = false;
    }else{
        $respu->ok = true;
        $usu->nombre = $obj->nombre;
        $usu->apellido = $obj->apellido;
        $usu->mail = $obj->mail;
        $usu->clave = $obj->clave;
        $usu->perfil = $obj->perfil;
        $usu->AgregarUsu($usu);
    }

echo json_encode($respu);

?>