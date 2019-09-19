function Recarga():void
{
    let xhttp : XMLHttpRequest = new XMLHttpRequest();
    let diveo = (<HTMLDivElement>document.getElementById("divGrilla"));
    xhttp.open("POST", "./administracion.php", true);
    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
    xhttp.send("queHago=mostrarGrilla");
    xhttp.onreadystatechange = () => 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            diveo.innerHTML = xhttp.responseText;
        }
    };
}

window.onload = function()
{
    this.Recarga();
}