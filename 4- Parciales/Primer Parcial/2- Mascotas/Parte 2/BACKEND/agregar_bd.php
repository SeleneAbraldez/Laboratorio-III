<?php
    require_once "AccesoDatos.php";
    //recibe cadena Jsoncon datos para agregar
    $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
    //la paso a objeto para poder usarla
    $objJson = json_decode($cadenaJSON);    

    $extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);  //extension de la foto
    $destino = $objJson->nombre ."." . date("Gis").  "." . $extension;
    $objJson->pathFoto = $destino;

    $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

    $consulta =$objetoDatos->RetornarConsulta("INSERT INTO perros (tamanio, edad, precio, nombre, raza, path_foto)"
                                                            . "VALUES(:tamanio, :edad, :precio, :nombre, :raza, :path_foto)"); 
                
    $consulta->bindValue(':tamanio', $objJson->tamanio, PDO::PARAM_STR);
    $consulta->bindValue(':edad', $objJson->edad, PDO::PARAM_INT);
    $consulta->bindValue(':precio', $objJson->precio, PDO::PARAM_INT);
    $consulta->bindValue(':nombre', $objJson->nombre, PDO::PARAM_STR);
    $consulta->bindValue(':raza', $objJson->raza, PDO::PARAM_STR);
    $consulta->bindValue(':path_foto', $objJson->pathFoto, PDO::PARAM_STR);

    $consulta->execute();

    $objRetorno= new stdClass();

    $objRetorno->ok = false; 

    $destino = "./fotos/" . $objJson->nombre . "." . date("Gis") . "." . $extension;
    if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino))
    {
        $objRetorno->ok = true;
        $objRetorno->pathFoto = $objJson->nombre . "." . date("Gis") . "." . $extension;  //le devolemos el path nuevo, ya que al haberle cambiado el nombre, hay que actualizar el path
    }
        
    echo json_encode($objRetorno);

    //1-Primero voy a traer la instancia anterior para poder obtener el nombre original y luego guardar la foto con el nombre original + "MODIFICADA"
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

    $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM perros WHERE precio=:precio");

    $consulta->bindValue(':precio',  $objJson->precio, PDO::PARAM_INT);

    $consulta->execute();

    $fila=$consulta->fetch();

    if($fila!==null)
    {
        $nombreOriginal = $fila[6];
    }


    $extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);
    $fecha=date("Gis");
    $divido = explode(".",$nombreOriginal);
    $destino = "fotos_modificadas/". $divido[0] . "." .$divido[1] . "_" . "MODIFICADA" ."." .  $extension;

    $objJson->pathFoto=$divido[0] . "." .$divido[1] . "_" . "MODIFICADA" ."." .  $extension;


    //2-Ahora modifico los datos en la base de datos
    $objetoDatos = AccesoDatos::DameUnObjetoAcceso();

    $consulta =$objetoDatos->RetornarConsulta('UPDATE perros SET tamanio = :tamanio, edad = :edad, nombre = :nombre, raza =:raza, path_foto=:path_foto WHERE precio = :precioAux' );

    $consulta->bindValue(':tamanio', $objJson->tamanio, PDO::PARAM_STR);
    $consulta->bindValue(':edad', $objJson->edad, PDO::PARAM_INT);
    $consulta->bindValue(':nombre', $objJson->nombre, PDO::PARAM_STR);
    $consulta->bindValue(':raza', $objJson->raza, PDO::PARAM_STR);
    $consulta->bindValue(':path_foto', $objJson->pathFoto, PDO::PARAM_STR);

    $consulta->bindValue(':precioAux', $objJson->precio, PDO::PARAM_INT);
    $consulta->execute();

    $objRetorno= new stdClass();

    $objRetorno->Ok= false; 
    $objRetorno->pathFoto=$destino;

    if(move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
    {
        $objRetorno->Ok=true;
    }
?>