<?php
    session_start();
    $_SESSION["usuario"] = "ok";
    header('Location:index.php');
?>