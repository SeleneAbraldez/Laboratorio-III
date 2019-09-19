"use strict";
function Recarga() {
    var xhttp = new XMLHttpRequest();
    var diveo = document.getElementById("divGrilla");
    xhttp.open("POST", "./administracion.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("queHago=mostrarGrilla");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            diveo.innerHTML = xhttp.responseText;
        }
    };
}
window.onload = function () {
    this.Recarga();
};
//# sourceMappingURL=archivo.js.map