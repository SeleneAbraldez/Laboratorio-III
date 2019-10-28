<?php
    // y guardando la foto en “./BACKEND/fotos_modificadas”. La foto nombrarla con el mismo nombre que tenga 
    // la foto original más el texto MODIFICADA (boby.20181209_031000_MODIFICADA.jpg)
    require_once "AccesoDatos.php";

    //recibo la cadena
    $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
    //recibo la cadena json vieja
    $viejaCadenaJSON = isset($_POST['VIEJAcadenaJson']) ? $_POST['VIEJAcadenaJson'] : null;

    //lo paso a objeto
    $objJson = json_decode($cadenaJSON);   
    $viejoObjJson = json_decode($viejaCadenaJSON);    

    //preparo la foto nueva
    $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    $divido = explode(".", $nombreOriginal);
    $nombreNuevo = $viejaCadenaJSON->pathFoto . "_" . "modificada" . "." .  $extension;
    $destino = "fotos_modificadas/". $nombreNuevo;

    $objJson->pathFoto = $nombreNuevo;

    $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

    //genero la consulta de modificar el viejo con la info del nuevo
    $consulta =$objetoDatos->RetornarConsulta('UPDATE perros SET tamanio = :tamanio, edad = :edad, raza =:raza,
         path_foto=:path_foto WHERE tamanio = :tamanioAux, edad = :edadAux, raza =:razaAux, path_foto=:path_fotoAux');
    $consulta->bindValue(':tamanio', $objJson->tamanio, PDO::PARAM_STR);
    $consulta->bindValue(':edad', $objJson->edad, PDO::PARAM_INT);
    $consulta->bindValue(':raza', $objJson->raza, PDO::PARAM_STR);
    $consulta->bindValue(':path_foto', $objJson->pathFoto, PDO::PARAM_STR);

    $consulta->bindValue(':tamanioAux', $viejoObjJson->tamanio, PDO::PARAM_STR);
    $consulta->bindValue(':edadAux', $viejoObjJson->edad, PDO::PARAM_INT);  
    $consulta->bindValue(':razaAux', $viejoObjJson->raza, PDO::PARAM_STR);
    $consulta->bindValue(':path_fotoAux', $viejoObjJson->pathFoto, PDO::PARAM_STR);
    $consulta->execute();

    $objRetorno= new stdClass();

    $objRetorno->ok= false; 
    $objRetorno->pathFoto=$destino;

    if (($consulta->rowCount())>0) {
        $objRetorno->ok = true; 
    }

    move_uploaded_file($_FILES["foto"]["tmp_name"], $destino);

    echo json_encode($objRetorno);
?>