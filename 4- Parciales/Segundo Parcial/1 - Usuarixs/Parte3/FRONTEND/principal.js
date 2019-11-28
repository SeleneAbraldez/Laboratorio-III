/// <reference path="../libs/jquery/index.d.ts" />
$(document).ready(function () {
    $('#btnGuardarCambios').off('click').click(function (event) {
        Principal.Manejadora.GuardarCambios();
    });
    // genero la tabla
    Principal.Manejadora.Tabla();
});
var Principal;
(function (Principal) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Tabla = function () {
            var sesionUsu = JSON.parse(localStorage.getItem('sesion'));
            var usuarixs = JSON.parse(localStorage.getItem('json'));
            if (!sesionUsu) {
                window.location.replace('./login.html');
            }
            var tabla = "<div class=\"table-responsive\"><table class=\"table table-striped\" id=\"tablaUsers\">\n                                <thead><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th>\n                                    <th>LEGAJO</th><th>FOTO</th>";
            // Si no es invitado, se agrega boton de accion borrar
            if (sesionUsu.perfil == "superadmin") {
                tabla += "<th colspan=\"2\">Acciones</th>";
            }
            if (sesionUsu.perfil == "admin") {
                tabla += "<th>Acciones</th>";
            }
            tabla += "</thead><tbody>";
            for (var _i = 0, usuarixs_1 = usuarixs; _i < usuarixs_1.length; _i++) {
                var user = usuarixs_1[_i];
                tabla += "<tr><td>" + user.correo + "</td><td>" + user.nombre + "</td><td>" + user.apellido + "</td>\n                            <td>" + user.perfil + "</td><td>" + user.legajo + "</td>\n                            <td><img src=\"./backend/fotos/" + user.foto + "\" height=\"50px\" width=\"50px\"></td>";
                switch (sesionUsu.perfil) {
                    // si es admin llama al modal de confirmacion de eliminar
                    case "superadmin": {
                        tabla += "<td><button type=\"button\" class=\"btn btn-warning\" onclick='Principal.Manejadora.Modificar(\"" +
                            user.correo + "\")' data-toggle=\"modal\" data-target=\"#modificacion\">Modificar</button></td>";
                    }
                    case "admin": {
                        tabla += "<td><button type=\"button\" class=\"btn btn-danger\" onclick='Principal.Manejadora.ConfirmarEliminar(\""
                            + user.correo + "\")' data-toggle=\"modal\" data-target=\"#confirmarEliminar\">Eliminar</button></td>";
                        break;
                    }
                    default:
                        break;
                }
                tabla += "</tr>";
            }
            tabla += "</tbody></table></div>";
            $('#listadoDiv').html(tabla);
            Principal.Manejadora.CambiarAspecto();
            if (sesionUsu.perfil === "invitado") {
                $('#controles').css('visibility', 'visible');
            }
        };
        Manejadora.ConfirmarEliminar = function (correo) {
            $("#confirmarTexto").html("Desea eliminar usuarix con correo " + correo + "?");
            $("#modal-btn-si").off('click').on("click", function () {
                Principal.Manejadora.EliminarUsu(correo);
            });
        };
        Manejadora.EliminarUsu = function (correo) {
            var usuarixs = JSON.parse(localStorage.getItem('json'));
            var usuarixsActualizadxs = new Array();
            for (var _i = 0, usuarixs_2 = usuarixs; _i < usuarixs_2.length; _i++) {
                var user = usuarixs_2[_i];
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
        };
        Manejadora.GuardarCambios = function () {
            var sesionUsu = JSON.parse(localStorage.getItem('sesion'));
            var colorFondo = $('#colorFondo').val();
            var colorFuente = $('#colorFuente').val();
            var estiloFoto = $('#estiloImagen').val();
            var opciones = {
                "fondo": colorFondo,
                "fuente": colorFuente,
                "estilo": estiloFoto
            };
            localStorage.setItem("preferencias_" + sesionUsu.correo, JSON.stringify(opciones));
            Principal.Manejadora.Tabla();
        };
        // llamo para ver si hay alguno ya cambido y cambio
        Manejadora.CambiarAspecto = function () {
            var sesionUsu = JSON.parse(localStorage.getItem('sesion'));
            if (localStorage.getItem('preferencias_' + sesionUsu.correo) != null) {
                var preferencias_1 = JSON.parse(localStorage.getItem('preferencias_' + sesionUsu.correo));
                $('#tablaUsers').css({ 'background-color': preferencias_1.fondo, 'color': preferencias_1.fuente });
                $('#colorFondo').val(preferencias_1.fondo);
                $('#colorFuente').val(preferencias_1.fuente);
                $('#marcoImagen').val(preferencias_1.estilo);
                $("#tablaUsers tbody tr").each(function () {
                    $(this).children("td").each(function () {
                        if (preferencias_1.estilo != "") {
                            $(this).children('img').addClass('img-' + preferencias_1.estilo);
                        }
                    });
                });
            }
        };
        // PARTE 3
        Manejadora.Modificar = function (correo) {
            var usuarixs = JSON.parse(localStorage.getItem('json'));
            var corre;
            for (var _i = 0, usuarixs_3 = usuarixs; _i < usuarixs_3.length; _i++) {
                var usu = usuarixs_3[_i];
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
                // Principal.Manejadora.EliminarUsu(corre);
            });
        };
        Manejadora.GuardarFotoModi = function (corre) {
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
        };
        Manejadora.ModificarUsu = function () {
            var nombre = $('#nombreText').val();
            var apellido = $('#apellidoText').val();
            var mail = $('#mailText').val();
            var legajo = $('#legajoText').val();
            var perfil = $('#perfilText').val();
            var clave = $('#claveText').val();
            var fotoFile = $('#fotoFile')[0];
            var pathFoto = fotoFile.value.split('\\').reverse()[0];
            var usuario = {
                "correo": mail,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": pathFoto
            };
            var arrUsuarios = JSON.parse(localStorage.getItem('json'));
            arrUsuarios.push(usuario);
            localStorage.setItem('json', JSON.stringify(arrUsuarios));
            Principal.Manejadora.Tabla();
        };
        return Manejadora;
    }());
    Principal.Manejadora = Manejadora;
})(Principal || (Principal = {}));
