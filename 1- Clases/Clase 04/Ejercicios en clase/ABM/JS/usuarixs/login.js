"use strict";
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
//# sourceMappingURL=login.js.map