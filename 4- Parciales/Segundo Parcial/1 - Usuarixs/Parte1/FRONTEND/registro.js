/// <reference path="../libs/jquery/index.d.ts" />
// alert
$(document).ready(function () {
    $('#toggleAlert').click(function () {
        $('.alert').hide();
    });
    // mando el formulario
    $("#registroForm").off('submit').submit(function (event) {
        event.preventDefault();
        var email = $("#mailText").val();
        Registro.Manejadora.Registrar(email);
    });
});
var Registro;
(function (Registro) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Registrar = function (email) {
            var foto = $('#fotoFile')[0];
            var form = new FormData();
            form.append("foto", foto.files[0]);
            $.ajax({
                method: "POST",
                url: "./BACKEND/guardarFotos.php",
                data: form,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    var respuesta = JSON.parse(xhr);
                    if (respuesta.ok) {
                        Registro.Manejadora.VerificarRegistro(email);
                    }
                    else {
                        $('#alertText').html("ERROR! - " + xhr.error + ". Reintente.");
                        $('.alert').show();
                    }
                }
            });
        };
        Manejadora.VerificarRegistro = function (email) {
            var usuarixs = JSON.parse(localStorage.getItem('json'));
            var mensajeError = "";
            var todoOk = false;
            for (var _i = 0, usuarixs_1 = usuarixs; _i < usuarixs_1.length; _i++) {
                var usu = usuarixs_1[_i];
                if (usu.correo === email) {
                    mensajeError = "ERROR - E-mail '" + email + "' ya registrado!";
                    break;
                }
                else {
                    todoOk = true;
                }
            }
            if (todoOk) {
                Registro.Manejadora.AgregarUsu();
            }
            else {
                $('#alertText').html(mensajeError);
                $('.alert').show();
            }
        };
        Manejadora.AgregarUsu = function () {
            var nombre = $('#nombreText').val();
            var apellido = $('#apellidoText').val();
            var mail = $('#mailText').val();
            var legajo = $('#legajoText').val();
            var perfil = $('#perfilText').val();
            var clave = $('#claveText').val();
            var foto = $('#fotoFile')[0];
            var pathFoto = foto.value.split('\\').reverse()[0];
            var usuarix = {
                "correo": mail,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": pathFoto
            };
            // guardo en el json nuevx usu
            var usuarixs = JSON.parse(localStorage.getItem('json'));
            usuarixs.push(usuarix);
            localStorage.setItem('json', JSON.stringify(usuarixs));
            window.location.replace('./login.html');
        };
        return Manejadora;
    }());
    Registro.Manejadora = Manejadora;
})(Registro || (Registro = {}));
