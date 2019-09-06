"use strict";
if (localStorage.getItem("Empleados") == null) {
    localStorage.setItem("Empleados", "Juan-123, ROSA-456, Carlos-666");
}
function Login() {
    var banderaEncontrado = false;
    var nombre = document.getElementById("nombre").value;
    var legajo = document.getElementById("legajo").value;
    var emp = localStorage.getItem("Empleados");
    if (emp != null) {
        var empa = emp.split(", "); //separamos el string recibido en un array, marcando como separador las comas
        for (var i = 0; i < empa.length; i++) {
            var empar = empa[i].split("-"); //por cada vuelta del array, separa y genera un array con nombre y legajo
            if (empar[0] == nombre && empar[1] == legajo) {
                alert("Ingresando...");
                banderaEncontrado = true;
                window.location.href = "./principal.html";
                break;
            }
        }
    }
    if (banderaEncontrado == false) {
        alert("Usuario incorrecto!");
    }
}
//# sourceMappingURL=login.js.map