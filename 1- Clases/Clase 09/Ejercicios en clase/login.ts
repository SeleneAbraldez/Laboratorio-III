function Login() {
    var correo = (<HTMLInputElement>document.getElementById("corre")).value;
    var clave = (<HTMLInputElement>document.getElementById("clave")).value;

    let xhttp: XMLHttpRequest = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj);
        }
    };

    xhttp.open("POST", "Test_usuarix.php", true);

    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhttp.send('Login={"correo":"' + correo + '","clave":"' + clave + '}');
}

