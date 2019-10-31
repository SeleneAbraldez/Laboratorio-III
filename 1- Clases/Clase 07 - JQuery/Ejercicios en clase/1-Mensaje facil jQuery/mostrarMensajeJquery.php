<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
    function MostrarMensaje(){
        var mensaje = $("#mensaje").val();
        $("#div_mensaje").html(mensaje);
    }
    </script>
</head>

<body>
    <br>
    <br>
    <br>
    <table border="0" align="center">
        <tr>
            <td><input type="text" id="mensaje"><td>
        </tr>
        <tr>
            <td><input type="button" onclick="MostrarMensaje()" value="Mostrar Mensaje"><td>
        </tr>
        <tr>
            <td><div id="div_mensaje"></div><td>
        </tr>
    </table>

</body>
</html>