<?php
class usuarix
{
    public $id;
    public $nombre;
    public $apellido;
    public $mail;
    public $clave;
    public $perfil;
    public $estado;

    public static function AgregarUsu($usuarix)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();    

        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `usuarixs`(`nombre`, `apellido`, `mail`, `clave`, `perfil`, `foto`)
        VALUES (:nombre, :apellido, :mail, :clave, :perfil, :foto)");
                                                        
        $consulta->bindValue(':nombre', $usuarix->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuarix->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':mail', $usuarix->mail, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $usuarix->clave, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $usuarix->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $usuarix->foto, PDO::PARAM_STR);
        $consulta->execute();   

        if ($consulta->rowCount()>0) {
            $retorno = true;
        }
        return $retorno;
    }

    public function MostrarDatosUsu()
    {
            return $this->id." - ".$this->nombre." - ".$this->apellido." - ".$this->mail. " - ".$this->clave." - ".$this->perfil." - " . $this->estado. " - " . $this->foto;
    }
    
    public static function TraerTodxsUsu()
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarixs");    
        $consulta->execute();   
        $usuarixs = $consulta->fetchAll(PDO::FETCH_CLASS, "usuarix");
        return $usuarixs;         
    }

    public static function TraerUsuxId($id) 
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta = $objetoAccesoDato->RetornarConsulta("SELECT * from usuarixs WHERE id=$id");
			$consulta->execute();
			$usuarix= $consulta->fetchObject('usuarix');
			return $usuarix;						
	}
    
    public static function ModificarUsu($id, $usuarix)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarixs SET nombre=:nombre, apellido=:apellido,
                         mail=:mail, clave=:clave, perfil=:perfil, estado=:estado WHERE id=:id");                                                    
                                                        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);  
        
        $consulta->bindValue(':nombre', $usuarix->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuarix->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':mail', $usuarix->mail, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $usuarix->clave, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $usuarix->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':estado', $usuarix->estado, PDO::PARAM_STR);
        $consulta->execute(); 

        if($consulta->rowCount() > 0){
            $retorno = true;
        }
        return $retorno;
    }

    public static function EliminarUsu($id)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM usuarixs WHERE id = :id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        if($consulta->rowCount() > 0){
            $retorno = true;
        }

        return $retorno;
    }

    public static function YaExiste($mail, $clave)
    {
        $retorno = new stdClass();
        $retorno->ok = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarixs WHERE mail=:mail && clave=:clave");        
        $consulta->bindValue(":mail", $mail, PDO::PARAM_STR);
        $consulta->bindValue(":clave", $clave, PDO::PARAM_STR);

        $consulta->execute(); 
        
        //si la consulta selecciono uno signnifica que existe
        if($consulta->rowCount() > 0) 
        {
            $retorno->ok = true;
            //le paso el usuario por stdclass si la encuentr apara poder despues usarlo, sobretodo el perfil
            $retorno->usuar = $consulta->fetchObject();
        }

        return $retorno;
    }

    public static function YaExisteMail($mail)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarixs WHERE mail=:mail");        
        $consulta->bindValue(":mail", $mail, PDO::PARAM_STR);

        $consulta->execute(); 
        
        //si la consulta selecciono uno signnifica que existe
        if($consulta->rowCount() > 0) 
        {
            $retorno = true;
        }

        return $retorno;
    }

//3
    //PARA APIREST

    //generamos las funciones con el responde, devolviendo el json con las consultas y con el estado correcto
    public function TraerTodxsUsuApi($request, $response, $args){
        $usuarixs= usuarix::TraerTodxsUsu();
        $retorno = $response->withJson($usuarixs, 200); 
        return $retorno;
     }
 
    public function TraerUnxApi($request, $response, $args) {
        $id = $args['id'];
        $usuarix = usuarix::TraerUsuxId($id);
        $retorno = $response->withJson($usuarix, 200);  
        return $retorno;
    }

    public function AgregarUsuApi($request, $response){ 
        //obtengo los parametros
        $array = $request->getParsedBody();

        //y los archivos
        $archivos = $request->getUploadedFiles(); 
        $destino = "./fotos/usuarixs/";

        $usu = new usuarix();

        $extension = explode(".", $archivos['foto']->getClientFilename()); //nombre de la ext
        // $extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);  
        $path =  $array["mail"] ."." . date("Gis").  "." . $extension[1];

        $usu->nombre = $array["nombre"];
        $usu->apellido = $array["apellido"];
        $usu->mail = $array["mail"];
        $usu->clave = $array["clave"];
        $usu->perfil = $array["perfil"];
        $usu->foto = $path;

        $std= new stdclass();

        $archivos['foto']->moveTo($destino . $path);

        if($usu->AgregarUsu($usu)){
            $std->exito = true;
            $std->mensaje = "Usuarix se ha agregado!";
            $std->user = $usu;
        }else{
            $std->exito = false;
            $std->mensaje = "ERROR! Usuarix no se ha  podido agregar!";
        }
        $retorno = $response->withJson($std, 200);
        return $retorno;
   }

   public function EliminarUsuApi($request, $response, $args)
   {
        $array = $request->getParsedBody();
        $id = $array['id'];
        $usu = new usuarix();
        $usu->id = $id;

        $std= new stdclass();

        if($usu->EliminarUsu($id)){
            $std->exito = true;
            $std->mensaje = "Usuarix se ha borrado";
        }else{
            $std->exito = false;
            $std->mensaje = "ERROR! Usuarix no se ha podido borrar!";
        }
        $retorno = $response->withJson($std, 200);  
        return $retorno;
   }


   public function ModificarUsuApi($request, $response, $args)
   {
        $array = $request->getParsedBody();

        $usu = new usuarix();
        $id = $array['id'];

        $archivos = $request->getUploadedFiles(); 
        $destino = "./fotos/usuarixs";

        $usu->nombre = $array['nombre'];
        $usu->apellido = $array['apellido'];
        $usu->mail = $array['mail'];
        $usu->clave = $array['clave'];
        $usu->perfil = $array['perfil'];
        $usu->estado = $array['estado'];


        $std= new stdclass();

        if($usu->ModificarUsu($id, $usu)){
            $std->exito = true;
            $std->mensaje = "Usuarix se ha modificado";
            //con post mandar fotos no funk, f
            // $extension = explode(".", $archivos['foto']->getClientFilename()); //nombre de la exte
            // $destino .= $datos->mail ."." . date("Gis").  "." . $extension[1];
            // $archivos['foto']->moveTo($destino);
        }else{
            $std->exito = false;
            $std->mensaje = "ERROR! Usuarix no se ha podido modificar!";
        }
        $retorno = $response->withJson($std, 200);  

        return $retorno;	
   }
    //
    
}