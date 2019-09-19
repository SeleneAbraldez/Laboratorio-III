"use strict";
function test() {
    var request = new XMLHttpRequest;
    request.open("GET", "../Backend/test.php", true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);
            alert(request.responseText);
        }
    };
}
//cuando la ventana se carga, llama automaticamente a test
window.onload = function () {
    test();
};
function test_params() {
    var request = new XMLHttpRequest;
    var nombre = document.getElementById("txtNombre").value;
    request.open("GET", "../Backend/test_params.php?txtNombre=" + nombre, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            alert(request.responseText);
        }
    };
}
//# sourceMappingURL=test_ajam.js.map