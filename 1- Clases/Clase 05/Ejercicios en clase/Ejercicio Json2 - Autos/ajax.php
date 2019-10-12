<?php
$archivo = fopen("./archivos/autos.json", "r");
$datos = fread($archivo, filesize("./archivos/autos.json"));
fclose($archivo);
echo($datos);
?>