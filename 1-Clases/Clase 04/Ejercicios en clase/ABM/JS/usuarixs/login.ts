//---------LOGIN
//if(localStorage.getItem("Usuari") == null)
localStorage.setItem("Usuari", "Juan-123,Rosa-456,Carlos-666");   

   function Repetido(): boolean {  //Se fija si usuarix esta realmente cargado para poder entrar
    var banderaEncontrado: boolean = false;
    var nombre : string= (<HTMLInputElement>document.getElementById("nombre")).value;
    var legajo: string = (<HTMLInputElement>document.getElementById("legajo")).value;

    var emp = localStorage.getItem("Usuari");
    if (emp != null) {
        var empa = emp.split(","); 
        for (let i = 0; i < empa.length; i++) { 
            var empar = empa[i].split("-"); 
            if (empar[0] == nombre && empar[1] == legajo) { 
                banderaEncontrado = true;
                break;
            }
        }
    }
    return banderaEncontrado;
}

function Login() {

    if (Repetido() == true) {     //si esta repetido es que entra
        alert("Ingresando al listado...");
        window.location.href="open_session.php";
        window.location.href = "./";
     } else {
         alert("Usuarix incorrectx!");
     }
}