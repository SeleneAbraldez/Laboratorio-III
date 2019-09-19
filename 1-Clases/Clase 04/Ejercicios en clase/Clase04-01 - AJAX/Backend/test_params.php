<?php

$nombre = isset($_GET["txtNombre"])?$_GET["txtNombre"]:"";

if($nombre != ""){
    echo("Bienvenidx " . $nombre . "!");
}else{
    echo(":(");
}

?>