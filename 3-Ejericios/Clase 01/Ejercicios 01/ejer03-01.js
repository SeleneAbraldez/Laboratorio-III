function Parametros(numero, cadena) {
    if (cadena) {
        for (var i = 0; i < numero; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(numero * -1);
    }
}
Parametros(3, "tres");
Parametros(8);
Parametros(-5);
