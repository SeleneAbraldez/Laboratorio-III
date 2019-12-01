<?php
require_once ('ConexionBD.php');

class Auto{

    public $id;
    public $color;
    public $marca;
    public $precio;
    public $modelo;

    public function __construct($id=null,$color=null,$marca=null,$precio=null,$modelo=null)
    {
        $this->id=$id;
        $this->color=$color;
        $this->marca=$marca;
        $this->precio=$precio;
        $this->modelo=$modelo;
     
    }

    public static function AgregarAuto($request,$response,$args){

        $retorno=new stdClass();
        $retorno->Exito=false;
        $retorno->Mensaje="No se pudo agregar el auto";
        

        $param=$request->getParsedBody();
        $auto=json_decode($param['auto']);

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('INSERT INTO autos (color,marca,precio,modelo) VALUES (:color,:marca,:precio,:modelo)');
        
        $sentencia->bindValue(':color',$auto->color,PDO::PARAM_STR);
        $sentencia->bindValue(':marca',$auto->marca,PDO::PARAM_STR);
        $sentencia->bindValue(':precio',$auto->precio,PDO::PARAM_INT);
        $sentencia->bindValue(':modelo',$auto->modelo,PDO::PARAM_STR);
        
        $sentencia->execute();
        if($sentencia->rowCount()>0){
            $retorno->Exito=true;
            $retorno->Mensaje="Se agregó el auto";
            return $response->withJson($retorno,200);
        }

        return $response->withJson($retorno,418);

    }

    public static function MostrarAutos($request,$response,$args){

        $retorno=new stdClass();
        $retorno->Mensaje="No hay autos para mostrar ";
        $retorno->Exito=false;

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('SELECT * FROM autos');
        $sentencia->execute();
        
        if($sentencia->rowCount()>0){
            $autos=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            /*$tabla="<table class='table'><tr><th>Color</th><th>Marca</th><th>Precio</th><th>Modelo</th></tr>";
            foreach($autos as $auto){
                $tabla.="<tr><td>".$auto['color']."</td><td>".$auto['marca']."</td><td>".$auto['precio']."</td><td>".$auto['modelo']."</td></tr>";
            }

            $tabla.="</table>";
            echo $tabla;*/
            $retorno->Exito=true;
            $retorno->autos=$autos;
            return $response->withJson($retorno,200);

        }else{
            return $response->withJson($retorno,424);
        }

        
    }

    public static function EliminarAuto($request,$response,$args){

        $retorno=new stdClass();
        
        $retorno->Exito=false;
        $retorno->Mensaje="No se pudo eliminar";
        $param=$request->getParsedBody();
        $id=$param['id'];
        
        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('DELETE FROM autos WHERE id=:id');
        $sentencia->bindValue(':id',$id,PDO::PARAM_INT);
        $sentencia->execute();
        
        if($sentencia->rowCount()>0){

            $retorno->Exito=true;
            $retorno->Mensaje="Se modifico";
            return $response->withJson($retorno,200);

        }else{
            return $response->withJson($retorno,424);
        }

        
    }


    
    
}


?>