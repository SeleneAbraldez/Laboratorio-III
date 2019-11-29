/// <reference path="../libs/jquery/index.d.ts" />

$(document).ready(function () {
    //llamo la creacion de los jsons
    Login.Manejadora.IniciarJson();

    //activo el alert
    $('#toggleAlert').click(function () {
        $('.alert').hide();
    });

    //mando info de mail y clave a verificar 
    $("#loginForm").off('submit').submit(function (event) {
        event.preventDefault();
        let email = <string>$("#mailText").val();
        let clave = <string>$("#claveText").val();
        Login.Manejadora.VerificarLogin(email, clave);
    });

    // redireccion a registro
    $("#btnRegistrar").off('click').click(function () {
        window.location.replace('./registro.html');
    });
});

namespace Login {
    export class Manejadora {
        //////// PARTE 1
        // Al momento de cargarse la página, se debe crear un array de 5 objetos JSON (correo, clave, nombre, apellido, legajo, perfil y foto).
        // Guardarlo en el LocalStorage y mostrar los elementos por consola.
        // Si ya existe el array en el LocalStorage, no se debe sobre escribirlo. Informar por consola su previa existencia.
        public static IniciarJson() {
            if (localStorage.getItem('json') == null) {
                let usus = [{
                    "correo": "1@gmail.com",
                    "clave": "1111",
                    "nombre": "Aganice",
                    "apellido": "Tesalia",
                    "legajo": "1",
                    "perfil": "invitado",
                    "foto": "1.jpg"
                },
                {
                    "correo": "2@yahoo.com",
                    "clave": "2222",
                    "nombre": "Ada",
                    "apellido": "Lovelace",
                    "legajo": "2",
                    "perfil": "admin",
                    "foto": "2.jpg"
                },
                {
                    "correo": "3@speedy.com",
                    "clave": "3333",
                    "nombre": "Lynn",
                    "apellido": "Margulis",
                    "legajo": "3",
                    "perfil": "invitado",
                    "foto": "3.jpg"
                },
                {
                    "correo": "4@hotmail.com",
                    "clave": "4444",
                    "nombre": "Ching",
                    "apellido": "Shih",
                    "legajo": "4",
                    "perfil": "admin",
                    "foto": "4.jpg"
                },
                {
                    "correo": "5@gmail.com",
                    "clave": "5555",
                    "nombre": "Julia",
                    "apellido": "Hermosilla",
                    "legajo": "5",
                    "perfil": "superadmin",
                    "foto": "5.png"
                }];
                console.log("Json exitosamente cargado.");
                localStorage.setItem('json', JSON.stringify(usus));
            }
            else {
                console.log("Json existente, ya previamente cargado.");
            }
            // muestra el json
            console.log(JSON.parse(<string>localStorage.getItem('json')));
        }

        // Asociar el evento click del botón btnEnviar a una función que recupere el e-mail y clave y verifique en 
        // el array de JSON, si el usuario está registrado o no. Si lo está, se redireccionará hacia principal.html. 
        // Caso contrario, se informará (por medio de un alert de BOOTSRAP - warning) de lo acontecido.
        public static VerificarLogin(email: string, clave: string) {
            let usuarixs = JSON.parse(<string>localStorage.getItem('json'));
            let mensajeError = "";
            let todoOk = false;

            // recorro usus para encontrar el que tenga la misma clave y mail
            for (let usu of usuarixs) {
                if (usu.correo === email) {
                    if (usu.clave === clave) {
                        todoOk = true;
                        localStorage.setItem('sesion', JSON.stringify(usu));
                        break;
                    } else {
                        mensajeError = ("ERROR - Esa clave no es correcta para usuarix " + email);
                    }
                } else {
                    mensajeError = "ERROR - Esx usuarix no se encuentra!";
                }
            }

            if (todoOk) {
                window.location.replace('./principal.html');
            } else {
                $('#alertText').html(mensajeError);
                $('.alert').show();
            }
        }

    }




}