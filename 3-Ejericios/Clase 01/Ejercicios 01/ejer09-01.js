"use strict";
/*Realizar una función que solicite (por medio de un parámetro) un número. Si el número es positivo,
se mostrará el factorial de ese número, caso contrario se mostrará el cubo de dicho número.
Nota: Reutilizar la función que determina el factorial de un número y la que calcula el cubo de un número. */
function Factorial2(numero) {
    var final = 1;
    for (var i = 2; i <= numero; i++) {
        final = final * i;
    }
    console.log(final);
}
function Cubo2(numero) {
    var cubo = Math.pow(numero, 3);
    return cubo;
}
function Mostrar2(cubo) {
    console.log(Cubo2(cubo));
}
function Funcion(numero) {
    //console.log("Ingrese un numero: ");
    //var numero: number = 1;
    if (numero >= 0) {
        Factorial2(numero);
    }
    else {
        Mostrar2(numero);
    }
}
Funcion(6);
Funcion(-6);
//# sourceMappingURL=ejer09-01.js.map