function Cubo(numero : number) : number
{
    var cubo : number = Math.pow(numero, 3) ;
    return cubo;
}

function Mostrar(cubo : number) : void
{
    console.log(Cubo(cubo));
}

Mostrar(2);