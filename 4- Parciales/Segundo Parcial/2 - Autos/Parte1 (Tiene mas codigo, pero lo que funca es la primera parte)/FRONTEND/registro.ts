/// <reference path="./libs/jquery/index.d.ts" />
$(document).ready(function () {
    manejador.Registro.Verificar();
});

namespace manejador {
    export class Registro {

        public static Verificar() {
            $("#enviarRegistro").click(function (event) {
                event.preventDefault();
                let correo = <string>$("#correo").val();

                let form = new FormData();
                form.append("correo", correo);
                $.ajax({
                    method: "POST",
                    url: "./BACKEND/verificar/",
                    data: form,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    success: function (xhr) {
                        if(xhr.Exito){
                            $('#alertRegister').text('ERROR - Mail ya en uso.');
                            $('#alertRegister').show();
                        }else{
                            // alert(xhr.correo);
                            manejador.Registro.Agregar();
                        }
                    },
                }).fail(function (xhr) {
                    $('#alertRegister').text('ERROR');
                    $('#alertRegister').show();
                });

            });
        }
        public static Agregar() {
            let apellido = <string>$("#apellido").val();
            let nombre = <string>$("#nombre").val();
            let correo = <string>$("#correo").val();
            let perfil = <string>$("#perfil").val();
            let fotoFile: any = $('#foto')[0];
            let fotoName = <string>$("#foto").val();
            let pathFoto = (fotoName.split('\\'))[2];
            let clave = <string>$("#clave").val();

            let fm = new FormData();
            let json = '{"correo":"' + correo +
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
                },
            }).fail(function (xhr) {
                $('#alertRegister').text('ERROR - No se pudo registrar usuarix.');
                $('#alertRegister').show();
            });
        }




    }
}