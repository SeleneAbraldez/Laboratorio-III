<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require_once './vendor/autoload.php';
require_once 'clases/Usuario.php';
require_once 'clases/Auto.php';
require_once 'clases/Middelware.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$app->post('/usuarios[/]',Usuario::class . '::AgregarUsuario');
$app->get('[/]',Usuario::class . '::MostrarUsuarios');
$app->post('/verificar[/]',Usuario::class . '::VerificarCorreo');

$app->post('/login[/]',Usuario::class . '::LoginUsuario');
$app->get('/login[/]',Usuario::class . '::VerificarJwt');

$app->post('[/]',Auto::class . '::AgregarAuto');
$app->get('/autos[/]',Auto::class . '::MostrarAutos');

$app->delete('[/]',Auto::class . '::EliminarAuto');

$app->run();


?>