if (localStorage.getItem("Empleados") == null) {
    localStorage.setItem("Empleados", "Juan-123, ROSA-456, Carlos-666");
}

function Login() {
    var banderaEncontrado = false;
    var nombre: string = (<HTMLInputElement>document.getElementById("nombre")).value;
    var legajo: string = (<HTMLInputElement>document.getElementById("legajo")).value;

    var emp = localStorage.getItem("Empleados");
    if (emp != null) {
        var empa = emp.split(", "); //separamos el string recibido en un array, marcando como separador las comas
        for (let i = 0; i < empa.length; i++) { //recorremos el array que formamos arriba
            var empar = empa[i].split("-"); //por cada vuelta del array, separa y genera un array con nombre y legajo
            if (empar[0] == nombre && empar[1] == legajo) { //comparamos si ya existe
                alert("Ingresando...");
                banderaEncontrado = true;
                window.location.href = "./principal.html";
                break;
            }
        }
    }

    if(banderaEncontrado == false){
        alert("Usuario incorrecto!");
    }
}