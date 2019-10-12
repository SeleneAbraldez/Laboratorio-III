"use strict";
///<reference path="./02-Empleado.ts"/>
var empleados = [
    new Ejericio03.Empleado("Pedro", "Alonzo", 432432465, "M", 1234, 120000),
    new Ejericio03.Empleado("Juana", "Pancha", 786554545, "F", 1233, 140000)
];
empleados.forEach(MostrarMain);
function MostrarMain(emp) {
    console.log(emp.ToString());
}
console.log(empleados[0].Hablar("Mandarin"));
//# sourceMappingURL=03-Main.js.map