<?php
use Slim\Http\Message;

require_once('ConexionBD.php');
require_once('AutenticadorJWT.php');
class Usuario
{
    public $id;
    public $email;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil;
    public $foto;

    
    public function __construct($id=null, $correo=null, $clave=null, $nombre=null, $apellido=null, $perfil=null, $foto=null)
    {
        $this->id=$id;
        $this->correo=$correo;
        $this->clave=$clave;
        $this->nombre=$nombre;
        $this->apellido=$apellido;
        $this->perfil=$perfil;
        $this->foto=$foto;
    }

    public static function AgregarUsuario($request, $response, $args)
    {
        $retorno=new stdClass();
        $retorno->Mensaje="No se pudo cargar el usuario";
        $retorno->Exito=false;
        $retorno->Estado=418;
        
        $parametros=$request->getParsedBody();
        $objUsuario=json_decode($parametros['usuario']);
        //obtengo la foto
        $archivos= $request->getUploadedFiles();
        $foto=$archivos['foto']->getClientFilename();
        //extension
        $extension= explode(".", $foto);
        $extension=array_reverse($extension);
        $nombreFoto=$objUsuario->correo.".".$extension[0];//guardo por email
        $destino="./fotos/";

        $usuario=new Usuario(null, $objUsuario->correo, $objUsuario->clave, $objUsuario->nombre, $objUsuario->apellido, $objUsuario->perfil, $nombreFoto);

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto) VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto)');
        
        $sentencia->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
        $sentencia->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
        $sentencia->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
        $sentencia->bindValue(':apellido', $usuario->apellido, PDO::PARAM_STR);
        $sentencia->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
        $sentencia->bindValue(':foto', $usuario->foto, PDO::PARAM_STR);
        
        
        $sentencia->execute();
        if ($sentencia->rowCount()>0) {
            $archivos["foto"]->moveTo($destino.$nombreFoto);
            $retorno->Mensaje="Se cargo el usuario";
            $retorno->Exito=true;
            $retorno->Estado=200;
        }
        
        return $response->withJson($retorno, $retorno->Estado);
    }

    public static function MostrarUsuarios($request, $response, $args)
    {
        $retorno=new stdClass();
        $retorno->Mensaje="No hay usuarios para mostrar ";
        $retorno->Exito=false;

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('SELECT * FROM usuarios');
        $sentencia->execute();
        
        if ($sentencia->rowCount()>0) {
            $retorno->Exito=true;
            $retorno->usuarios=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            /*$tabla="<table class='table'><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr>";
            foreach($usuarios as $user){
                $tabla.="<tr><td>".$user['correo']."</td><td>".$user['nombre']."</td><td>".$user['apellido']."</td><td>".$user['perfil']."</td><td><img width=100 height=100 src='./backend/fotos/".$user['foto']."'></img></td></tr>";
            }

            $tabla.="</table>";
            echo $tabla;*/
            return $response->withJson($retorno, 200);
        } else {
            return $response->withJson($retorno, 424);
        }
    }

    public static function LoginUsuario($request, $response, $args)
    {
        $retorno=new stdClass();
        $retorno->Exito=false;
        $retorno->jwt="null";

        $param=$request->getParsedBody();
        $datos=json_decode($param["datos"]);
        
        $usuario=Usuario::TraerUno($datos->correo, $datos->clave);
        if ($usuario) {
            $datosJwt=array('correo'=>$usuario->correo,
                            'nombre'=>$usuario->nombre,
                            'apellido'=>$usuario->apellido,
                            'perfil'=>$usuario->perfil);
            
            $token=AutenticadorJWT::CrearToken($datosJwt);
            $retorno->Exito=true;
            $retorno->jwt=$token;
            return $response->withJson($retorno, 200);
        }

        return $response->withJson($retorno, 403);
    }

    public static function VerificarJwt($request, $response, $args)
    {
        $retorno=new stdClass();
        $retorno->Mensaje="El token esta activo";
        $retorno->Exito=false;
       
        $token=$_GET['token'];
        
        try {
            AutenticadorJWT::VerificarToken($token);
            $retorno->datos=AutenticadorJWT::ObtenerData($token);
            $retorno->Exito=true;
        } catch (Exception $e) {
            $retorno->Mensaje=$e->getMessage();
            return $response->withJson($retorno, 403);
        }
        return $response->withJson($retorno, 200);
    }

    public static function TraerUno($correo, $clave)
    {
        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('SELECT * FROM usuarios WHERE correo=:correo AND clave=:clave');
        $sentencia->bindValue(':correo', $correo, PDO::PARAM_STR);
        $sentencia->bindValue(':clave', $clave, PDO::PARAM_STR);
        $sentencia->execute();
        
        if ($sentencia->rowCount()>0) {
            return $sentencia->fetchObject();
        }

        return false;
    }

    public static function VerificarCorreo($request, $response, $args)
    {
        $retorno=new stdClass();
        $retorno->Exito=false;
        
        $param=$request->getParsedBody();
        $correo=$param["correo"];

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('SELECT * FROM usuarios WHERE correo=:correo ');
        $sentencia->bindValue(':correo', $correo, PDO::PARAM_STR);
        $sentencia->execute();

        if ($sentencia->rowCount()>0) {
            $retorno->Exito=true;
        }
        $retorno->correo = $correo;
        return $response->withJson($retorno);
    }
}
