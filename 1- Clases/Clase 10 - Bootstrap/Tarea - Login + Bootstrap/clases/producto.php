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



//PARA APIREST

    public function TraerTodosProduApi($request, $response, $args){
        $productos= producto::TraerTodosProdu();
        $retorno = $response->withJson($productos, 200); 
        return $retorno;
    }

    public function AgregarProduApri($request, $response){ 
        //obtengo los parametros
        $array = $request->getParsedBody();

        //y los archivos
        $archivos = $request->getUploadedFiles(); 
        $destino = "./fotos/productos/";

        $usu = new producto();

        $extension = explode(".", $archivos['foto']->getClientFilename()); //nombre de la ext
        // $extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);  
        $path =  $array["codigo_barra"] ."." . date("Gis").  "." . $extension[1];

        $produ->codigo_barra = $array["codigo_barra"];
        $produ->nombre = $array["nombre"];
        $produ->path_foto = $path;

        $std= new stdclass();

        $archivos['foto']->moveTo($destino . $path);

        if($produ->AgregarProdu($produ)){
            $std->exito = true;
            $std->mensaje = "Producto se ha agregado!";
            $std->user = $produ;
        }else{
            $std->exito = false;
            $std->mensaje = "ERROR! Producto no se ha  podido agregar!";
        }
        $retorno = $response->withJson($std, 200);
        return $retorno;
   }

   public function EliminarProduApi($request, $response, $args)
   {
        $array = $request->getParsedBody();
        $id = $array['id'];
        $produ = new producto();
        $produ->id = $id;

        $std= new stdclass();

        if($produ->EliminarProdu($id)){
            $std->exito = true;
            $std->mensaje = "Producto se ha borrado";
        }else{
            $std->exito = false;
            $std->mensaje = "ERROR! Producto no se ha podido borrar!";
        }
        $retorno = $response->withJson($std, 200);  
        return $retorno;
   }


   public function ModificarProduApi($request, $response, $args)
   {
        $array = $request->getParsedBody();

        $usu = new producto();
        $id = $array['id'];

        $archivos = $request->getUploadedFiles(); 
        $destino = "./fotos/productos";

        $produ->codigo_barra = $array["codigo_barra"];
        $produ->nombre = $array["nombre"];
        $produ->path_foto = $path;

        $std= new stdclass();

        if($produ->ModificarProdu($id, $produ)){
            $std->exito = true;
            $std->mensaje = "Producto se ha modificado";
            //con post mandar fotos no funk, f
            // $extension = explode(".", $archivos['foto']->getClientFilename()); //nombre de la exte
            // $destino .= $datos->mail ."." . date("Gis").  "." . $extension[1];
            // $archivos['foto']->moveTo($destino);
        }else{
            $std->exito = false;
            $std->mensaje = "ERROR! Producto no se ha podido modificar!";
        }
        $retorno = $response->withJson($std, 200);  

        return $retorno;	
   }
    //


}