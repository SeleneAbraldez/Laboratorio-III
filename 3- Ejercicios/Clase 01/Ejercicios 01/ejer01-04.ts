function numerosParesImpares(numero : number) : void
{
    if (numero%2==0){
        console.log(`El número ${numero} es par`) ;
    }else{
        console.log(`El número ${numero} es impar`) ;
    }
}

numerosParesImpares(5);
numerosParesImpares(20);
numerosParesImpares(-7);