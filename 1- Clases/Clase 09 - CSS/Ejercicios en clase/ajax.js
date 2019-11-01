//funcion de login, manda los datos de correo y clave a ya existe.php por post llamada   
function Login() {
    var xhttp = new XMLHttpRequest();
    //recibo los parametros
    var mail = document.getElementById("mail").value;
    var clave = document.getElementById("clave").value;
    //manda los datos a yaexiste para corroborar
    xhttp.open("POST", "abm/loginUsu.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send('login={"mail":"' + mail + '","clave":"' + clave + '"}');
    //recibe el estado y muestra
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            if (obj.ok) {
                console.log("Todo ok");
                window.location.href = "./index.php";
            }
            else {
                console.log(obj);
                console.log("Error!");
            }
        }
    };
}
//
function Register() {
    var xhttp = new XMLHttpRequest();
    //recibo los parametros 
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var mail = document.getElementById("mail").value;
    var clave = document.getElementById("clave").value;
    var perfil = document.getElementById("perfil").value;
    var estado = 1;
    var foto = document.getElementById("foto");
    var form = new FormData();
    //mando los datos del usuario como json
    form.append('regist', '{"nombre":"' + nombre + '", "apellido":"' + apellido + '", "mail":"' + mail + '", "clave":"' + clave + '","perfil":"' + perfil + '"}');
    //mando la foto tambien por files
    form.append('foto', foto.files[0]);
    xhttp.open("POST", "abm/registrarUsu.php", true);
    //como le paso tambien foto paso formdata
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    //y mando el form
    xhttp.send(form);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            if (obj.ok) {
                alert("Registro exitoso! Redireccionando al login");
                window.location.href = "./index.php";
            }
            else {
                console.log(obj);
                console.log("Error!");
            }
        }
    };
}
