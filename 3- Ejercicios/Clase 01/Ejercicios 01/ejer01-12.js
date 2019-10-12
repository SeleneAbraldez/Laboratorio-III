"use strict";
function Signo(oracion) {
    var dia = oracion.charAt(0) + oracion.charAt(1);
    var mes = oracion.charAt(3) + oracion.charAt(4);
    var año = oracion.charAt(8) + oracion.charAt(9) + oracion.charAt(10) + oracion.charAt(11);
    switch (mes) { //se entiende que aca se pondria depende el mes y adentro depende el dia con un < o > pero es una re paja soz
        case "01": {
            break;
        }
        case "02": {
            break;
        }
        default:
            break;
    }
    console.log(dia + mes + año);
}
Signo("28-01-1999");
//# sourceMappingURL=ejer12-01.js.map