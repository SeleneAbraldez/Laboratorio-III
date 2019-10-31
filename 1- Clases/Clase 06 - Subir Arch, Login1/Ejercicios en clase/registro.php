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
            <td>Nombre: </td>
            <td><input type="text" id="nombre" placeholder="Ingrese su nombre..."> </td>
        </tr>
        <tr>
            <td>Apellido: </td>
            <td><input type="text" id="apellido" placeholder="Ingrese su apellido..."></td>
        </tr>
        <tr>
            <td>Correo: </td>
            <td><input type="text" id="mail" placeholder="Ingrese su correo..."> </td>
        </tr>
        <tr>
            <td>Clave: </td>
            <td><input type="text" id="clave" placeholder="Ingrese su clave..."></td>
        </tr>
        <tr>
            <td>Perfil: </td>
            <td><input type="text" id="perfil" placeholder="Ingrese su perfil..."> </td>
        </tr>
        <tr>
            <td>Foto: </td>
            <td><input type="file" id="foto" style="color:grey" accept="image/*"/> </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <input type="button" value="Registrar" onclick="Register()" ; id="btnAceptar">
                <input type="reset" value="Cancelar" id="btnCancelar">
            </td>
        </tr>
        <tr> 
           <td colspan="2"> Ya esta registradx? <a href="login.php">Ingrese aqui</a></td>            
        </tr>
    </table><br>
    </form>
</body>

</html>