<?php
    //abrimos siempre la sesion para preguntar si esta seteada
    session_start();
    //nos fijamos si existe
    if(!(isset($_SESSION["perfil"]))){
         //si no tenemos ningun perfil cargado nos manda al login
        header('Location:login.php');        
    }else{
        //si ya hay un perfil nos tendriamos que fijar que tipo es
        ?> 
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Listas</title>
                <script type="text/javascript" src="ajax.js">

                </script>
            </head>
            <body>
                <form action="">
                    <table align="center">
                    <?php
                        if($_SESSION["perfil"] == 1){ 
                        //si el perfil es de tipo 1, muestra la tabla de productos
                    ?>
                            <tr>
                                <td><a href="./abm/listaUsuPDF.php">Mostrar lista de Usuarixs</a></td>
                            </tr>
                            <br>
                    <?php 
                        }
                        //si no lo es, solo se vera la de productos. En ambos casos esta la de productos
                    ?>
                        <tr>
                            <td><a href="./abm/listaProduPDF.php">Mostrar lista de Productos</a></td>
                        </tr>
                        <tr rowspan="6">
                            <td>
                            <a href="./abm/cerrarSesion.php">Cerrar la Sesion</a>
                            </td>
                        </tr>
                        <br>
                    </table>
                </form>    
            </body>
            </html>

        <?php
    //
    }
?>