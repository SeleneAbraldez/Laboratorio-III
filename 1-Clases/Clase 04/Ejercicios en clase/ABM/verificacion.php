<?php
session_start(); //es necesario llamar a session start porque no tiene forma de chequear si alguna existe si no

if(isset($_SESSION)){
    if($_SESSION["usuario"] =='ok'){
        echo("login");
    }else{
        if($check == "YES")
        {
            echo("page");
        }
    }
}
?>