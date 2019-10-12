function Factorial(numero: number): void {
    var final: number = 1;
    for (var i: number = 2; i <= numero; i++) {
        final = final * i;
    }
    console.log(final);
}

Factorial(6);
