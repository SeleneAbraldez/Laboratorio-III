<?php
    //si lx usuarix queire cerrar la sesion, la misma se destruye y se redirecciona al index una vez mas, este deberia ir al login 
    session_start();
    session_unset();
    session_destroy();

    header('Location: ../index.php');
?>