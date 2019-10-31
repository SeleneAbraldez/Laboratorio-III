var Datos = /** @class */ (function () {
    function Datos() {
    }
    Datos.MostrarDatos = function () {
        var nombre = document.getElementById("nombretxt").value;
        var edad = document.getElementById("edadtxt").value;
        alert("Nombre: " + nombre + " -*- Edad: " + edad);
        console.log("Nombre: " + nombre + " -*- Edad: " + edad);
        //(<HTMLDivElement>document.getElementById("div")).innerHTML = "Nombre: " + nombre + " -*- Edad: " + edad;
    };
    return Datos;
}());
