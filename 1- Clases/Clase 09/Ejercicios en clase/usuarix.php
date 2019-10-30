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
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `usuarixs`(`nombre`, `apellido`, `mail`, `clave`, `perfil`, `foto`)
        VALUES (:nombre, :apellido, :mail, :clave, :perfil, :foto)");
                                                        
        $consulta->bindValue(':nombre', $usuarix->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuarix->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':mail', $usuarix->mail, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $usuarix->clave, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $usuarix->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $usuarix->estado, PDO::PARAM_STR);
        $consulta->execute();   

        if (($consulta->rowCount())>0) {
            $retorno = 1;
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
        $retorno = 0;
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
            $retorno = 1;
        }
        return $retorno;
    }

    public static function EliminarUsu($id)
    {
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM usuarixs WHERE id = :id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        if($consulta->rowCount() > 0)
        {
            $retorno = 1;
        }

        return $retorno;
    }

    public static function YaExiste($correo, $clave)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarixs WHERE correo=:correo && clave=:clave");        
        $consulta->bindValue(":correo", $correo, PDO::PARAM_STR);
        $consulta->bindValue(":clave", $clave, PDO::PARAM_STR);

        $consulta->execute(); 
        
        //si la consulta selecciono uno signnifica que existe
        if($consulta->rownCount() > 0)
        {
            $retorno = true;
        }

        return $retorno;
    }
    
}