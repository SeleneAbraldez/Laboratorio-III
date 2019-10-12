///<reference path="./02-Empleado.ts"/>

let empleados: Array<Ejericio03.Empleado> = [
    new Ejericio03.Empleado("Pedro", "Alonzo",  432432465, "M", 1234, 120000),
    new Ejericio03.Empleado("Juana", "Pancha",  786554545, "F", 1233, 140000)
];

empleados.forEach(MostrarMain);

function MostrarMain(emp: Ejericio03.Empleado): void {

    console.log(emp.ToString());
}

console.log(empleados[0].Hablar("Mandarin"));