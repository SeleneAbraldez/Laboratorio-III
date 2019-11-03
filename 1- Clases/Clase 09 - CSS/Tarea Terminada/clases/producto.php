<?php
class producto
{
    public $id;
    public $codigo_barra;
    public $nombre;
    public $path_foto;

    public static function AgregarProdu($producto)
    {
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `productos`(`codigo_barra`, `nombre`, `path_foto`)
        VALUES (:codigo_barra, :nombre, :path_foto");
                                                        
        $consulta->bindValue(':codigo_barra', $producto->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $producto->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':path_foto', $producto->mail, PDO::PARAM_STR);
        $consulta->execute();   

        if (($consulta->rowCount())>0) {
            $retorno = 1;
        }
        return $retorno;
    }

    public function MostrarDatosProdu()
    {
            return $this->id." - ".$this->codigo_barra." - ".$this->nombre." - ".$this->path_foto;
    }
    
    public static function TraerTodosProdu()
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM productos");    
        $consulta->execute();        
        $consulta->setFetchMode(PDO::FETCH_INTO, new producto);                                            
        return $consulta;     
    }
    
    public static function ModificarProdu($id, $producto)
    {
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE productos SET codigo_barra=:codigo_barra, 
        nombre=:nombre, path_foto=:path_foto WHERE id=:id");                                                    
                                                        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);  
        
        $consulta->bindValue(':codigo_barra', $producto->codigo_barra, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':path_foto', $producto->path_foto, PDO::PARAM_STR);
        $consulta->execute(); 

        if($consulta->rowCount() > 0)
        {
            $retorno = 1;
        }
        return $retorno;
    }

    public static function EliminarProdu($id)
    {
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM productos WHERE id = :id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        if($consulta->rowCount() > 0)
        {
            $retorno = 1;
        }

        return $retorno;
    }
}