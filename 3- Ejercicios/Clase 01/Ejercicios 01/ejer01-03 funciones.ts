function Parametros(numero: number, cadena?: string): void {
    if (cadena) {
        for (var i = 0; i < numero; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(numero * -1);
    }
}