<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <script type="text/javascript" src="ajax.js"></script>
</head>

<body>
    <br><br>
    <form>
    <table border="0" align="center">
        <tr>
            <td>Mail: <br> <input type="text" id="mail" placeholder="Ingrese su mail..."> </td>
        </tr>
        <tr>
            <td>Clave: <br> <input type="text" id="clave" placeholder="Ingrese su clave..."></td>
        </tr>
        <tr>
            <td>
                <input type="button" value="Ingresar" onclick="Login()" ; id="btnAceptar">
                <input type="reset" value="Cancelar" id="btnCancelar">
            </td>
        </tr>
        <tr> 
           <td align="left"> No estas registradx? <a href="registro.php">Registrese aqui</a></td>            
        </tr>
    </table>
    <br>
    </form>
</body>

</html>