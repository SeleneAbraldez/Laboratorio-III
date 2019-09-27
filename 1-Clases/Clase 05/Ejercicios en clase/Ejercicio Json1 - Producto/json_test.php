<?php
    $producto = $_POST["producto"];
    //var_dump($_POST);
    echo("Producto sin modificar: " . $producto);
    
    $productoModi = json_decode($producto);
    $productoModi->Nombre = "Mandarina";
    $productoModi->Precio = 30;

    echo("Producto modificado: " . json_encode($productoModi));
?>