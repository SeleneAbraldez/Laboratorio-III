function MayusMinus(oracion: string): void {
    if(oracion == oracion.toLocaleLowerCase()){
        console.log("Minusculas");
    }else if(oracion == oracion.toLocaleUpperCase()){
        console.log("MAYUSCULAS");
    }else{
        console.log("MeZcLa");
    }
}

MayusMinus("Buenos dias");
MayusMinus("HOLA");
MayusMinus("uwu");
