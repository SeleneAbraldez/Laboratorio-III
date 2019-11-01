<?php

    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    require_once './vendor/autoload.php';
    require_once './clases/usuarix.php';
    require_once './clases/AccesoDatos - Mercado.php';

    $config['displayErrorDetails'] = true;
    $config['addContentLengthHeader'] = false;

    $app = new \Slim\App(["settings" => $config]);

    //genero un grupo para interactuar con usuarix
    $app->group("/usuarix", function(){
        //cuando es get nos devuelve todos los usuarios 
        $this->get("/", \usuarix::class . ":TraerTodxsUsuApi");
        //si mandamos por get una id nos trae esx usuarix
        $this->get("/{id}", \usuarix::class . ":TraerUnxApi");
        //por post agregamos
        $this->post("/", \usuarix::class . ":AgregarUsuApi");
        //por delete borramos
        $this->delete("/", \usuarix::class . ":EliminarUsuApi");
        //por put mopdificamos
        $this->put("/", \usuarix::class . ":ModificarUsuApi");
    });


    $app->group("/Validacion",function(){ 
        $this->post("/", function(Request $request, Response $response){
            $datos = $request->getParsedBody(); 
            $usu = json_decode($datos["datos"]); 
            $validacion = usuarix::YaExiste($usu->mail, $usu->clave);

            if($validacion->ok){
                $retorno = $response->withJson($usuar, 200);
            }else{
                $retorno = $response->withJson("No se ha podido encontrar usuarix", 403);
            }
            return $retorno;
        });
        $this->post("/Agregar", \Usuario::class . ":AgregarUsu");
    });


    $app->run(); 

?>