<?php
    session_start();
    //se fija si efectivamente el perfil es el primero, o si se esta entrando sin permiso
    if($_SESSION["perfil"] == 1)
    {
        include_once ("../clases/AccesoDatos - Mercado.php");
        include_once ("../clases/usuarix.php");
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

        $mpdf->WriteHTML("<br><i><b><u>Lista de Usuarixs: </i></b></u><br><br><br>");

        //genero la tabla de usx
        $usuarixs = usuarix::TraerTodxsUsu();
                $tabla = "<table align='center' border='0' cellspacing='5' style='text-align:center;'><tr><td>ID</td><td>NOMBRE</td><td>APELLIDO</td><td>MAIL</td><td>PERFIL</td><td>ESTADO</td><td>FOTO</td></tr>";
                foreach ($usuarixs as $usuarix) {
                    $exploUsu = $usuarix->MostrarDatosUsu();
                    $fila = explode(" - ", $exploUsu);
                    if($fila[7] == ""){
                        $fila[7] = "No hay foto";
                    }else{
                        $fila[7] = "<img src='../fotos/usuarixs/" . $fila[7] . "' width='50px' height='50px'/>";
                    }
                    $tabla .= "<tr><td>" . $fila[0] . "</td><td>" . $fila[1] . "</td><td>" . $fila[2] .  "</td><td>" . $fila[3] . "</td><td>" . $fila[5] ."</td><td>" . $fila[6] ."</td><td>" . $fila[7] . "</td></tr>";
                }
                $tabla .= "</table>";
        echo $tabla;

        $mpdf->WriteHTML($tabla);

        //nombre del pdf al descargase, mas la forma de out
        $mpdf->Output('Usuarixs_Lista.pdf', 'I');
    }else{
        header('Location:../index.php');
    }
?>