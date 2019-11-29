/// <reference path="./libs/jquery/index.d.ts" />
$(document).ready(function () {
    manejador.Registro.Verificar();
});
var manejador;
(function (manejador) {
    var Registro = /** @class */ (function () {
        function Registro() {
        }
        Registro.Verificar = function () {
            $("#enviarRegistro").click(function (event) {
                event.preventDefault();
                var correo = $("#correo").val();
                var form = new FormData();
                form.append("correo", correo);
                $.ajax({
                    method: "POST",
                    url: "./BACKEND/verificar/",
                    data: form,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (xhr) {
                        if (xhr.Exito) {
                            $('#alertRegister').text('ERROR - Mail ya en uso.');
                            $('#alertRegister').show();
                        }
                        else {
                            // alert(xhr.correo);
                            manejador.Registro.Agregar();
                        }
                    }
                }).fail(function (xhr) {
                    $('#alertRegister').text('ERROR');
                    $('#alertRegister').show();
                });
            });
        };
        Registro.Agregar = function () {
            var apellido = $("#apellido").val();
            var nombre = $("#nombre").val();
            var correo = $("#correo").val();
            var perfil = $("#perfil").val();
            var fotoFile = $('#foto')[0];
            var fotoName = $("#foto").val();
            var pathFoto = (fotoName.split('\\'))[2];
            var clave = $("#clave").val();
            var fm = new FormData();
            var json = '{"correo":"' + correo +
                '","clave":"' + clave +
                '","nombre":"' + nombre +
                '","apellido":"' + apellido +
                '","perfil":"' + perfil +
                '","foto":"' + pathFoto + '"}';
            fm.append("usuario", json);
            fm.append("foto", fotoFile.files[0]);
            $.ajax({
                method: "POST",
                url: "./BACKEND/usuarios/",
                data: fm,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (xhr) {
                    if (xhr.Exito) {
                        $("#myModal").hide();
                        $('.modal-backdrop').remove();
                        // window.location.replace("./principal.html");
                    }
                }
            }).fail(function (xhr) {
                $('#alertRegister').text('ERROR - No se pudo registrar usuarix.');
                $('#alertRegister').show();
            });
        };
        return Registro;
    }());
    manejador.Registro = Registro;
})(manejador || (manejador = {}));
