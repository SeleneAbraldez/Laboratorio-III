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
            if(!sesionUsu){
                window.location.replace('./login.html');
            }

            let tabla: string = `<div class="table-responsive"><table class="table table-striped" id="tablaUsers">
                                <thead><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th>
                                    <th>LEGAJO</th><th>FOTO</th>`;

            // Si no es invitado, se agrega boton de accion borrar
            if (sesionUsu.perfil == "superadmin") {
                tabla += `<th colspan="2">Acciones</th>`;
            }
            if (sesionUsu.perfil == "admin") {
                tabla += `<th>Acciones</th>`;
            }
            tabla += `</thead><tbody>`;

            for (let user of usuarixs) {
                tabla += `<tr><td>` + user.correo + `</td><td>` + user.nombre + `</td><td>` + user.apellido + `</td>
                            <td>`+ user.perfil + `</td><td>` + user.legajo + `</td>
                            <td><img src="./backend/fotos/`+ user.foto + `" height="50px" width="50px"></td>`;

                switch (sesionUsu.perfil) {
                    // si es admin llama al modal de confirmacion de eliminar
                    case "superadmin": {
                        tabla += `<td><button type="button" class="btn btn-warning" onclick='Principal.Manejadora.Modificar("` + 
                        user.correo + `")' data-toggle="modal" data-target="#modificacion">Modificar</button></td>`;
                    }
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

        // PARTE 3
        public static Modificar(correo: string) {
            let usuarixs: any = JSON.parse(<string>localStorage.getItem('json'));
            let corre : string;

            for (let usu of usuarixs) {
                if (usu.correo === correo) {
                    $('#nombreText').val(usu.nombre);
                    $('#apellidoText').val(usu.apellido);
                    $('#mailText').val(usu.correo);
                    $('#legajoText').val(usu.legajo);
                    $('#perfilText').val(usu.perfil);
                    $('#claveText').val(usu.clave);
                    $('#claveDuplicadaText').val(usu.clave);
                    corre = usu.correo;
                    break;
                }
            }

            $("#registroForm").off('submit').submit(function (event) {
                event.preventDefault();
                Principal.Manejadora.GuardarFotoModi(corre);
            });
        }

        public static GuardarFotoModi(corre : string) {
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
                        Principal.Manejadora.EliminarUsu(corre);
                        Principal.Manejadora.ModificarUsu();
                        $("#modificacion").hide();
                        $('.modal-backdrop').remove();
                    }
                    else {
                        $('#alertText').html("ERROR - " + xhr.error + ". Reintente.");
                        $('.alert').show();
                    }
                }
            });


        }

        public static ModificarUsu() {
            let nombre: string = <string>$('#nombreText').val();
            let apellido: string = <string>$('#apellidoText').val();
            let mail: string = <string>$('#mailText').val();
            let legajo: string = <string>$('#legajoText').val();
            let perfil: string = <string>$('#perfilText').val();
            let clave: string = <string>$('#claveText').val();
            let fotoFile: any = $('#fotoFile')[0];
            let pathFoto = (<string>(<HTMLInputElement>fotoFile).value).split('\\').reverse()[0];

            let usuario: any = {
                "correo": mail,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": pathFoto
            };

            let arrUsuarios: any = JSON.parse(<string>localStorage.getItem('json'));
            arrUsuarios.push(usuario);
            localStorage.setItem('json', JSON.stringify(arrUsuarios));
            Principal.Manejadora.Tabla();
        }


    }
}