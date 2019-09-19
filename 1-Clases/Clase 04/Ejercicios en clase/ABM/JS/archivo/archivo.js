"use strict";
///<reference path="../usuarixs/login.ts"/>
//--------------ARCHIVO
function Recarga() {
    //se crea el xhttp0
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./administracion.php", true);
    //header para el post
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    //paso los valores
    xhttp.send("queHago=mostrarGrilla");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) { //si todo esta piola lo mando
            document.getElementById("divGrilla").innerHTML = xhttp.responseText;
        }
    };
}
function CheckStatus() {
    var retorno = false;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "verificacion.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("value=YES");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText == "login") {
                window.location.href = "./login.php";
            }
            else if (xhttp.responseText == "page") {
                retorno = true;
            }
        }
    };
    return retorno;
}
window.onload = function () {
    if (!CheckStatus()) {
        window.location.href = "./login.php";
    }
    else {
        Recarga();
    }
};
//# sourceMappingURL=archivo.js.map