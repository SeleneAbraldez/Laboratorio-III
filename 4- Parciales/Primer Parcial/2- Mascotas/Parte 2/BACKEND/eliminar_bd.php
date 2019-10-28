<?php
    require_once "AccesoDatos.php";

    //recupero json
    $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
    $objJson = json_decode($cadenaJSON);    

    $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

    //ejecuto la consulta de eliminar perro donde los datos coincidan
    $consulta =$objetoDatos->RetornarConsulta("DELETE FROM perros WHERE nombre= :nombre and raza=:raza and edad=:edad and precio=:precio");

    $consulta->bindValue(':edad', $objJson->edad, PDO::PARAM_INT);
    $consulta->bindValue(':nombre', $objJson->nombre, PDO::PARAM_STR);
    $consulta->bindValue(':raza', $objJson->raza, PDO::PARAM_STR);
    $consulta->bindValue(':precio', $objJson->precio, PDO::PARAM_INT);

    $consulta->execute();

    $objRetorno = new stdClass();

    $objRetorno->ok = false; 
    if (($consulta->rowCount())>0) {
        $objRetorno->ok = true; 
    }

    if (strpos($objJson->pathFoto, "modificada") == false) {
        unlink("fotos/" . $objJson->pathFoto);
    } else {
        unlink("./fotos_modificadas/" . $objJson->pathFoto); //si es de las fotos modificadas, debe buscar en modificada
    }

    echo json_encode($objRetorno);
?>