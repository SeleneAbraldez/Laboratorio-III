<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- iconito -->
    <link href="https://p7.hiclipart.com/preview/48/269/148/whiskers-cat-tic-tac-toe-game-neko-atsume-cat.jpg" rel="icon"/>    
    <title>Login</title>

    <!-- jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- ajaxs -->
    <script type="text/javascript" src="ajax.js"></script>
    <!-- bootstrap 4 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <!-- para iconos -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <!-- muevo esta a lo utlimo para que no haya conflictos -->
    <link type="text/css" rel="stylesheet" href="css/estilos.css" />
</head>

<body>
    <br><br>
    <h1 class="titulo"><i class="fas fa-sign-in-alt"></i> Login</h1>
    <br>
    <div class="row">
        <!-- agrego espacio para que el login este en el medio -->
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
        <div class="container">
            <br>
            <form action="" role="form">
                <div class="form-group">
                    <label for="mail">Mail: </label>
                    <input type="email" class="form-control" id="mail" placeholder="Ingrese su mail...">
                </div>
                <div class="form-group">
                    <label for="clave">Clave: </label>
                    <input type="password" class="form-control" id="clave" placeholder="Ingrese su clave...">
                </div>
                <button type="button" class="btn btn-primary" id="btnLogin">Enviar</button>
                <button type="reset" class="btn btn-light" id="btnCancelar">Cancelar</button>
                <br>
                <p class="help-block"><br>¿No esta registradx? <a href="registro.php">Registrese aqui</a></p>
            </form>
            <br>

            <p id="pExito"></p>

        </div>        
    </div>

</body>

</html>