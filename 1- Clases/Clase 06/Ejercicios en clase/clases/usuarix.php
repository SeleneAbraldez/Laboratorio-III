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

        $extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);  
        $path = $usuarix->mail ."." . date("Gis").  "." . $extension;

        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `usuarixs`(`nombre`, `apellido`, `mail`, `clave`, `perfil`, `foto`)
        VALUES (:nombre, :apellido, :mail, :clave, :perfil, :foto)");
                                                        
        $consulta->bindValue(':nombre', $usuarix->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuarix->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':mail', $usuarix->mail, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $usuarix->clave, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $usuarix->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $path, PDO::PARAM_STR);
        $consulta->execute();   

        if ($consulta->rowCount()>0) {
            $retorno = true;
            move_uploaded_file($_FILES["foto"]["tmp_name"], "../fotos/" . $path);
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
        $consulta->setFetchMode(PDO::FETCH_INTO, new usuarix);                                            
        return $consulta;     
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

        if($consulta->rowCount() > 0)
        {
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
        if($consulta->rowCount() > 0)
        {
            $retorno = true;
        }

        return $retorno;
    }

    public static function YaExiste($mail, $clave)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarixs WHERE mail=:mail && clave=:clave");        
        $consulta->bindValue(":mail", $mail, PDO::PARAM_STR);
        $consulta->bindValue(":clave", $clave, PDO::PARAM_STR);

        $consulta->execute(); 
        
        //si la consulta selecciono uno signnifica que existe
        if($consulta->rowCount() > 0) 
        {
            $retorno = true;
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
    
}