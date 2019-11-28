/// <reference path="../libs/jquery/index.d.ts" />

$(document).ready(function () {

    $('#btnGuardarCambios').off('click').click(function (event) {
        Principal.Manejadora.GuardarCambios();
    });
    // genero la tabla
    Principal.Manejadora.Tabla();
});

namespace Principal {
    export class Manejadora {

        public static Tabla() {
            let sesionUsu: any = JSON.parse(<string>localStorage.getItem('sesion'));
            let usuarixs: any = JSON.parse(<string>localStorage.getItem('json'));

            let tabla: string = `<div class="table-responsive"><table class="table table-striped" id="tablaUsers">
                                <thead><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th>
                                    <th>LEGAJO</th><th>FOTO</th>`;

            // Si no es admin, se agrega boton de accion borrar
            if (sesionUsu.perfil === "admin") {
                tabla += `<th>Acciones</th>`;
            }
            tabla += `</thead><tbody>`;

            for (let user of usuarixs) {
                tabla += `<tr><td>` + user.correo + `</td><td>` + user.nombre + `</td><td>` + user.apellido + `</td>
                            <td>`+ user.perfil + `</td><td>` + user.legajo + `</td>
                            <td><img src="./backend/fotos/`+ user.foto + `" height="50px" width="50px"></td>`;

                switch (sesionUsu.perfil) {
                    // si es admin llama al modal de confirmacion de eliminar
                    case "admin": {
                        tabla += `<td><button type="button" class="btn btn-danger" onclick='Principal.Manejadora.ConfirmarEliminar("`
                            + user.correo + `")' data-toggle="modal" data-target="#confirmarEliminar">Eliminar</button></td>`;
                        break;
                    }
                    default:
                        break;
                }
                tabla += `</tr>`;
            }
            tabla += `</tbody></table></div>`;

            $('#listadoDiv').html(tabla);

            Principal.Manejadora.CambiarAspecto();

            if (sesionUsu.perfil === "invitado") {
                $('#controles').css('visibility', 'visible');
            }
        }

        public static ConfirmarEliminar(correo: string) {
            $("#confirmarTexto").html("Desea eliminar usuarix con correo " + correo + "?");
            $("#modal-btn-si").off('click').on("click", function () {
                Principal.Manejadora.EliminarUsu(correo);
            });
        }

        public static EliminarUsu(correo: string) {
            let usuarixs: any = JSON.parse(<string>localStorage.getItem('json'));
            let usuarixsActualizadxs: any = new Array<any>();
            for (let user of usuarixs) {
                if (user.correo === correo) {
                    // si es este no lo mando al nuevo array
                    continue;
                }
                else {
                    usuarixsActualizadxs.push(user);
                }
            }
            localStorage.setItem('json', JSON.stringify(usuarixsActualizadxs));
            Principal.Manejadora.Tabla();
        }

        public static GuardarCambios() {
            let sesionUsu: any = JSON.parse(<string>localStorage.getItem('sesion'));
            let colorFondo = $('#colorFondo').val();
            let colorFuente = $('#colorFuente').val();
            let estiloFoto = $('#estiloImagen').val();

            let opciones: any = {
                "fondo": colorFondo,
                "fuente": colorFuente,
                "estilo": estiloFoto
            };

            localStorage.setItem("preferencias_" + sesionUsu.correo, JSON.stringify(opciones));
            Principal.Manejadora.Tabla();
        }

        // llamo para ver si hay alguno ya cambido y cambio
        private static CambiarAspecto() {
            let sesionUsu: any = JSON.parse(<string>localStorage.getItem('sesion'));

            if (localStorage.getItem('preferencias_' + sesionUsu.correo) != null) {
                console.log("Encuentro opciones");
                let preferencias = JSON.parse(<string>localStorage.getItem('preferencias_' + sesionUsu.correo));
                $('#tablaUsers').css({ 'background-color': preferencias.fondo, 'color': preferencias.fuente });

                $('#colorFondo').val(preferencias.fondo);
                $('#colorFuente').val(preferencias.fuente);
                $('#marcoImagen').val(preferencias.estilo);

                $("#tablaUsers tbody tr").each(function () {
                    $(this).children("td").each(function () {
                        if (preferencias.estilo != "") {
                            $(this).children('img').addClass('img-' + preferencias.estilo);
                        }
                    });
                });
            }
        }


    }
}