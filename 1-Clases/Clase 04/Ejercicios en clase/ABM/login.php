<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <script src="./JS/javascript.js"></script>
</head>

<body>
<br><br>
    <table border="0" align="center">
        <tr>
            <td>Nombre: </td>
            <td><input type="text" id="nombre" name="nombretxt" placeholder="Ingrese su nombre..."> </td>
        </tr>
        <tr>
            <td>Legajo: </td>
            <td><input type="number" id="legajo" name="legajonum" placeholder="Ingrese su legajo..."></td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <input type="button" value="Ingresar" onclick="Login()"; id="btnAceptar">
            </td>
        </tr>
    </table><br>
</body>

</html>