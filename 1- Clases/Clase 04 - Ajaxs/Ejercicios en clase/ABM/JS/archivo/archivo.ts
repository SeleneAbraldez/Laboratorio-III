///<reference path="../usuarixs/login.ts"/>

//--------------ARCHIVO


function Recarga(): void {  //v
    //se crea el xhttp0
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    xhttp.open("POST", "./administracion.php", true);
    //header para el post
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    //paso los valores
    xhttp.send("queHago=mostrarGrilla");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) { //si todo esta piola lo mando
            (<HTMLDivElement>document.getElementById("divGrilla")).innerHTML = xhttp.responseText;
        }
    };
}

function CheckStatus() : boolean{ 
    let retorno = false;
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
     xhttp.open("POST", "verificacion.php", true);
     xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
     xhttp.send("value=YES");
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
             if (xhttp.responseText == "login") {
                alert("Sesion no cargada!");
                 window.location.href = "./login.php";
             } else if (xhttp.responseText == "page") {
                alert("Sesion ya cargada!");
                Recarga();
                retorno = true;
             }
         }
     };
     return retorno;
 }

window.onload = function () {
    if(!CheckStatus()){
        //window.location.href = "./login.php";
    }else{
        Recarga();
    }
        
}