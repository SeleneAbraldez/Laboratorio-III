/// <reference path="./node_modules/@types/jquery/index.d.ts" />

//funcion de login, manda los datos de correo y clave a ya existe.php por post llamada   
    function Login() {
        $("#btnLogin").click(function(){
            let mail = <string>$('#mail').val();
            let clave = <string>$('#clave').val();
            let formData = new FormData();

            //mando el formdata con la info al ajaxs
            formData.append('login', '{"mail":"' + mail + '","clave":"' + clave + '"}');
    
            //se manda a la pagina de validar del post
            $.ajax({
                type:'POST',
                url: 'http://localhost/Clase08-Labo/Validar/',
                data: formData,
                dataType:"json",
                contentType:false,
                processData:false,

            }).done(function(obj){
                    console.log("Todo ok");
                    window.location.href = "./index.php";  
            }).fail(function(error){
                console.log(error);
                console.log("Error!");
            });
        }); 

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
                if(obj.ok){
                    alert("Registro exitoso! Redireccionando al login");
                    window.location.href = "./index.php";
                }else{
                    console.log(obj);
                    console.log("Error!");
                }
            }
        };

    }