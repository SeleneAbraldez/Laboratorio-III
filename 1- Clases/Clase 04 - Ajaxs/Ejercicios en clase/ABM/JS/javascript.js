//---------LOGIN
//if(localStorage.getItem("Usuari") == null)
localStorage.setItem("Usuari", "Juan-123,Rosa-456,Carlos-666");
function Repetido() {
    var banderaEncontrado = false;
    var nombre = document.getElementById("nombre").value;
    var legajo = document.getElementById("legajo").value;
    var emp = localStorage.getItem("Usuari");
    if (emp != null) {
        var empa = emp.split(",");
        for (var i = 0; i < empa.length; i++) {
            var empar = empa[i].split("-");
            if (empar[0] == nombre && empar[1] == legajo) {
                banderaEncontrado = true;
                break;
            }
        }
    }
    return banderaEncontrado;
}
function Login() {
    if (Repetido() == true) { //si esta repetido es que entra
        alert("Ingresando al listado...");
        window.location.href = "open_session.php";
        window.location.href = "./";
    }
    else {
        alert("Usuarix incorrectx!");
    }
}
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
                alert("Sesion no cargada!");
                window.location.href = "./login.php";
            }
            else if (xhttp.responseText == "page") {
                alert("Sesion ya cargada!");
                Recarga();
                retorno = true;
            }
        }
    };
    return retorno;
}
window.onload = function () {
    if (!CheckStatus()) {
        //window.location.href = "./login.php";
    }
    else {
        Recarga();
    }
};
