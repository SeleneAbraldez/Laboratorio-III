<?php
//1
    // $respu = new stdClass();
    // $respu->mensaje = isset($_POST["mensaje"]) ? $_POST["mensaje"] : NULL ;
    // $respu->fecha = date("d/m/Y");
    // echo json_encode($respu);

//2
    //necesitamos llamar al subirFotos para que reconozca la clase archivo y poder llamar al subir
    require_once ("subirFotos.php");
    $archivo = Archivo::Subir();

    $respu = new stdClass();
    $respu->mensaje = isset($_POST["mensaje"]) ? $_POST["mensaje"] : NULL ;
    $respu->fecha = date("d/m/Y");
    //tambien agrego el path temporal al json devuelto
    $respu->path = $archivo["PathTemporal"];
    echo json_encode($respu);

?> 