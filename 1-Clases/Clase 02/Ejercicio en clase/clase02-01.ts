class Datos {
    public static MostrarDatos(): void {
        let nombre: string = (<HTMLInputElement>document.getElementById("nombretxt")).value;
        let edad: string = (<HTMLInputElement>document.getElementById("edadtxt")).value;

        alert("Nombre: " + nombre + " -*- Edad: " + edad);
        console.log("Nombre: " + nombre + " -*- Edad: " + edad);

        (<HTMLDivElement>document.getElementById("div")).innerHTML = "Nombre: " + nombre + " -*- Edad: " + edad;
    }
}
