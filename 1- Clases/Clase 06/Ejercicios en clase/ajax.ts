

//funcion de login, manda los datos de correo y clave a ya existe.php por post llamada   
    function Login() {
        let xhttp: XMLHttpRequest = new XMLHttpRequest();

        //recibo los parametros
        var mail = (<HTMLInputElement>document.getElementById("mail")).value;
        var clave = (<HTMLInputElement>document.getElementById("clave")).value;

        //manda los datos a yaexiste para corroborar
        xhttp.open("POST", "abm/yaExisteUsu.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send('login={"mail":"' + mail + '","clave":"' + clave + '"}');

        //recibe el estado y muestra
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var obj = JSON.parse(xhttp.responseText);
                console.log(obj);
            }
        };
    }



//
    function Register() {
        let xhttp: XMLHttpRequest = new XMLHttpRequest();

        //recibo los parametros 
        var nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
        var apellido = (<HTMLInputElement>document.getElementById("apellido")).value;
        var mail = (<HTMLInputElement>document.getElementById("mail")).value;
        var clave = (<HTMLInputElement>document.getElementById("clave")).value;
        var perfil = (<HTMLInputElement>document.getElementById("perfil")).value;
        var estado = 1;
        var foto: any = (<HTMLInputElement>document.getElementById("foto"));

        let form: FormData = new FormData();

        //mando los datos del usuario como json
        form.append('regist', '{"nombre":"' + nombre + '", "apellido":"' + apellido + '", "mail":"' + mail + '", "clave":"' + clave + '","perfil":"' + perfil + '"}');

        //mando la foto tambien por files
        form.append('foto', foto.files[0]);

        xhttp.open("POST", "abm/registrarUsu.php", true);
        //como le paso tambien foto paso formdata
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        //y mando el form
        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var obj = JSON.parse(xhttp.responseText);
                console.log(obj);
            }
        };

    }