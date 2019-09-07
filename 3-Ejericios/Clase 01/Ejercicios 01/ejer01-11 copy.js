"use strict";
function Palíndromo(oracion) {
    oracion = oracion.toLocaleLowerCase();
    oracion = oracion.replace(/\s/g, "");
    var bandera = 0;
    var i = 0;
    for (var j = (oracion.length - 1); j >= (oracion.length / 2); j--) {
        //console.log(oracion.charAt(i) + oracion.charAt(j));
        if (oracion.charAt(i) == oracion.charAt(j)) {
        }
        else {
            bandera = 1;
            break;
        }
        i++;
    }
    if (bandera == 0) {
        console.log("Es un palíndromo");
    }
    else {
        console.log("NO es un palíndromo");
    }
}
Palíndromo("paap");
Palíndromo("larutanosaportootropasonatural");
Palíndromo("xd");
Palíndromo("Larutanosaportootropasonatural");
Palíndromo("La ruta nos aporto otro paso natural");
//# sourceMappingURL=ejer11-01 copy.js.map