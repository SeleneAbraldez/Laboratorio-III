<?php
    session_start();
    //se fija si efectivamente el perfil es el primero, o si se esta entrando sin permiso
    if($_SESSION["perfil"] == 1 || $_SESSION["perfil"] == 0)
    {
        include_once ("../clases/AccesoDatos - Mercado.php");
        include_once ("../clases/producto.php");
        //carga el composer
        require_once ('../vendor/autoload.php');
        //le avisa que necesita pdf
        header('content-type:application/pdf');

        //cambia las palabras usadas en el header y footer
        $mpdf = new \Mpdf\Mpdf(['orientation' => 'P', 
                                'pagenumPrefix' => 'Página nro. ',
                                'pagenumSuffix' => ' - ',
                                'nbpgPrefix' => ' de ',
                                'nbpgSuffix' => ' páginas']);

        //configura header y foooter, depende | es donde esta
        $mpdf->SetHeader('{DATE j-m}||{PAGENO}{nbpg}');
        $mpdf->setFooter('{DATE Y}|Programacón III|{PAGENO}{nbpg}');

        $mpdf->WriteHTML("<br><i><b><u>Lista de Productos: </i></b></u><br><br><br>");
        //genero la tabla de usx
        $productos = producto::TraerTodosProdu();
                $tabla = "<table align='center' border='0' cellspacing='5' style='text-align:center;'><tr><td>ID</td><td>CODIGO DE BARRA</td><td>NOMBRE</td><td>FOTO</td></tr>";
                foreach ($productos as $producto) {
                    $exploProdu = $producto->MostrarDatosProdu();
                    $fila = explode(" - ", $exploProdu);
                    if($fila[3] == ""){
                        $fila[3] = "No hay foto";
                    }else{
                        $fila[3] = "<img src='../fotos/productos/" . $fila[3] . "' width='50px' height='50px'/>";
                    }
                    $tabla .= "<tr><td>" . $fila[0] . "</td><td>" . $fila[1] . "</td><td>" . $fila[2] .  "</td><td>" . $fila[3] . "</td></tr>";
                }
                $tabla .= "</table>";
        echo $tabla;

        $mpdf->WriteHTML($tabla);

        //nombre del pdf al descargase, mas la forma de out
        $mpdf->Output('Productos_Lista.pdf', 'I');

    }else{
        header('Location:../index.php');
    }
?>