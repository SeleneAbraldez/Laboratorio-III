/// <reference path="./libs/jquery/index.d.ts" />
$(document).ready(function () {
    manejador.Login.Verificar();
    $('#limpiar').click(function (event) {
        $('#alertRegister').hide();
        $('#alertLogin').hide();
        $("#formLogin").data('bootstrapValidator').resetForm();
        $("#formRegistro").data('bootstrapValidator').resetForm();
    });
});
var manejador;
(function (manejador) {
    var Login = /** @class */ (function () {
        function Login() {
        }
        Login.Verificar = function () {
            $("#enviarLogin").click(function (event) {
                event.preventDefault();
                var correo = $("#correoLogin").val();
                var clave = $("#claveLogin").val();
                var fm = new FormData();
                var json = '{"correo":"' + correo + '","clave":"' + clave + '"}';
                fm.append("datos", json);
                $.ajax({
                    method: "POST",
                    url: "./backend/login/",
                    data: fm,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (xhr) {
                        if (xhr.Exito) {
                            localStorage.setItem('token', xhr.jwt);
                            window.location.replace("./principal.html");
                        }
                    }
                }).fail(function (xhr) {
                    var correo = $("#correoLogin").val();
                    var clave = $("#claveLogin").val();
                    if (correo == "" || clave == "") {
                    }
                    else {
                        $('#alertLogin').text('ERROR - Usuarix o contraseña no correctas.');
                        $('#alertLogin').show();
                    }
                });
            });
        };
        Login.Limpiar = function () {
            document.getElementById('correoLogin').value = "";
            document.getElementById('claveLogin').value = "";
            $('#alertLogin').hide();
        };
        return Login;
    }());
    manejador.Login = Login;
})(manejador || (manejador = {}));
