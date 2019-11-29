/// <reference path="../libs/jquery/index.d.ts" />

// alert
$(document).ready(function () {
    $('#toggleAlert').click(function () {
        $('.alert').hide();
    });

    // mando el formulario
    $("#registroForm").off('submit').submit(function (event) {
        event.preventDefault();
        let email = <string>$("#mailText").val();
        Registro.Manejadora.Registrar(email);
    });
});

namespace Registro {
    export class Manejadora {
        public static Registrar(email: string){
            let foto: any = $('#fotoFile')[0];
            let form = new FormData();
            form.append("foto", foto.files[0]);

            $.ajax({
                method: "POST",
                url: "./BACKEND/guardarFotos.php",
                data: form,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    let respuesta: any = JSON.parse(<string>xhr);
                    if (respuesta.ok) {
                        Registro.Manejadora.VerificarRegistro(email);
                    } else {
                        $('#alertText').html("ERROR! - " + xhr.error + ". Reintente.");
                        $('.alert').show();
                    }
                }
            });
        }

        public static VerificarRegistro(email: string) {
            let usuarixs = JSON.parse(<string>localStorage.getItem('json'));
            let mensajeError = "";
            let todoOk = false;

            for (let usu of usuarixs) {
                if (usu.correo === email) {
                        mensajeError = "ERROR - E-mail '" + email + "' ya registrado!";
                        break;
                } else {
                    todoOk = true;
                }
            }

            if (todoOk) {
                Registro.Manejadora.AgregarUsu();
            } else {
                $('#alertText').html(mensajeError);
                $('.alert').show();
            }
        }

        public static AgregarUsu() {
            let nombre: string = <string>$('#nombreText').val();
            let apellido: string = <string>$('#apellidoText').val();
            let mail: string = <string>$('#mailText').val();
            let legajo: string = <string>$('#legajoText').val();
            let perfil: string = <string>$('#perfilText').val();
            let clave: string = <string>$('#claveText').val();
            let foto: any = $('#fotoFile')[0];
            let pathFoto = (<string>(<HTMLInputElement>foto).value).split('\\').reverse()[0];

            let usuarix: any = {
                "correo": mail,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": pathFoto
            };

            // guardo en el json nuevx usu
            let usuarixs: any = JSON.parse(<string>localStorage.getItem('json'));
            usuarixs.push(usuarix);
            localStorage.setItem('json', JSON.stringify(usuarixs));
            window.location.replace('./login.html');
        }

    }









}
