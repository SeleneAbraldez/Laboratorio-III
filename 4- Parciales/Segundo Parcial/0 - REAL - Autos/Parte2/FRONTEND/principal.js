/// <reference path="./libs/jquery/index.d.ts" />
$(document).ready(function () {
    Principal.Manejadora.VerificarToken();
    var datosUsuario = JSON.parse(localStorage.getItem('usuarioActual'));
    Principal.Manejadora.TraerUsuarios();
    Principal.Manejadora.TraerAutos();
    Principal.Manejadora.MostrarTabla(datosUsuario.perfil);
});
var Principal;
(function (Principal) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.MostrarTabla = function (perfil) {
            var usuarios = JSON.parse(localStorage.getItem('usuarios'));
            var autos = JSON.parse(localStorage.getItem('autos'));
            var tablaUsuarios = "";
            var tablaAutos = "";
            switch (perfil) {
                case 'propietario':
                    tablaUsuarios = "<div class='table-responsive'><table class='table table-striped'> <thead><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>FOTO</th></tr></thead>";
                    for (var i = 0; i < usuarios.length; i++) {
                        tablaUsuarios += "<tr><td>" + usuarios[i].correo + "</td><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].apellido + "</td><td>" + usuarios[i].perfil + "</td><td><img width=60 height=60 src='./backend/fotos/" + usuarios[i].foto + "'></img></td></tr>";
                    }
                    tablaUsuarios += "</table></div>";
                    tablaAutos = "<div class='table-responsive'><table class='table'><thead><tr><th>ID</th><th>COLOR</th><th>MARCA</th><th>PRECIO</th><th>MODELO</th><th>ACCIONS</th></tr></thead>";
                    for (var i = 0; i < autos.length; i++) {
                        tablaAutos += "<tr><td>" + autos[i].id + "</td><td>" + autos[i].color + "</td><td>" + autos[i].marca + "</td><td>" + autos[i].precio + "</td><td>" + autos[i].modelo + "</td><td><button class=\"btn btn-danger\" type=\"button\" onclick=Principal.Manejadora.ConfirmarEliminar(\"" + autos[i].id + "\") data-toggle=\"modal\" data-target=\"#confirmarEliminar\">Eliminar</button></td></tr>";
                    }
                    tablaAutos += "</table></div>";
                    break;
                case 'encargado':
                    tablaUsuarios = "<div class='table-responsive'><table class='table table-striped'><thead><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr></thead>";
                    for (var i = 0; i < usuarios.length; i++) {
                        tablaUsuarios += "<tr><td>" + usuarios[i].correo + "</td><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].apellido + "</td><td>" + usuarios[i].perfil + "</td><td><img class='img-thumbnail' width=60 height=60 src='./backend/fotos/" + usuarios[i].foto + "'></img></td></tr>";
                    }
                    tablaUsuarios += "</table></div>";
                    tablaAutos = "<div class='table-responsive'><table class='table table-bordered'><thead><tr><th>Color</th><th>Marca</th><th>Precio</th><th>Modelo</th></tr></thead>";
                    for (var i = 0; i < autos.length; i++) {
                        tablaAutos += "<tr><td>" + autos[i].color + "</td><td>" + autos[i].marca + "</td><td>" + autos[i].precio + "</td><td>" + autos[i].modelo + "</td></tr>";
                    }
                    tablaAutos += "</table></div>";
                    break;
                case 'empleado':
                    tablaUsuarios = "<div class='table-responsive'><table class='table table-striped'><thead ><tr><th >Correo</th><th >Nombre</th><th >Apellido</th><th >Perfil</th><th >Foto</th></tr></thead>";
                    for (var i = 0; i < usuarios.length; i++) {
                        tablaUsuarios += "<tr><td>" + usuarios[i].correo + "</td><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].apellido + "</td><td>" + usuarios[i].perfil + "</td><td><img class='img-rounded' width=60 height=60 src='./backend/fotos/" + usuarios[i].foto + "'></img></td></tr>";
                    }
                    tablaUsuarios += "</table></div>";
                    tablaAutos = "<div class='table-responsive'><table class='table table-bordered'><thead><tr><th>Color</th><th>Marca</th><th>Precio</th><th>Modelo</th></tr></thead>";
                    for (var i = 0; i < autos.length; i++) {
                        tablaAutos += "<tr><td>" + autos[i].color + "</td><td>" + autos[i].marca + "</td><td>" + autos[i].precio + "</td><td>" + autos[i].modelo + "</td></tr>";
                    }
                    tablaAutos += "</table></div>";
                    break;
            }
            //window.location.replace('./principal.html');
            $('#tablaUsuarios').html(tablaUsuarios);
            $('#tablaAutos').html(tablaAutos);
        };
        Manejadora.VerificarToken = function () {
            var token = localStorage.getItem('token');
            $.ajax({
                type: 'GET',
                url: './backend/login?token=' + token,
                cache: false,
                contentType: false,
                processData: false,
                //async: true,
                async: false,
                dataType: "json",
                success: function (xhr) {
                    if (xhr.Exito) {
                        localStorage.setItem('usuarioActual', JSON.stringify(xhr.datos));
                    }
                }
            }).fail(function (xhr) {
                alert(JSON.parse(xhr.responseText).Mensaje);
                window.location.replace('./');
            }); //falta modificar por si llega mal mandar a login
        };
        Manejadora.TraerUsuarios = function () {
            $.ajax({
                type: 'GET',
                url: './backend/',
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                //async: true,
                success: function (xhr) {
                    if (xhr.Exito) {
                        localStorage.setItem('usuarios', JSON.stringify(xhr.usuarios));
                    }
                }
            });
        };
        Manejadora.TraerAutos = function () {
            $.ajax({
                type: 'GET',
                url: './backend/autos/',
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                dataType: "json",
                success: function (xhr) {
                    if (xhr.Exito) {
                        localStorage.setItem('autos', JSON.stringify(xhr.autos));
                    }
                }
            });
        };
        Manejadora.ConfirmarEliminar = function (id) {
            Principal.Manejadora.VerificarToken();
            $("#confirmarTexto").html("Segurx que se desea eliminar el auto con ID " + id + "?");
            $("#modal-btn-si").off('click').on("click", function () {
                Principal.Manejadora.Eliminar(id);
            });
            $("#modal-btn-no").off('click').on("click", function () {
                $('#alertAuto').text("Ha rechazado eliminar Auto " + id);
                $('#alertAuto').show();
            });
        };
        Manejadora.Eliminar = function (id) {
            $.ajax({
                type: "DELETE",
                url: "./backend/",
                data: { 'id': id },
                async: false,
                dataType: "json"
            }).done(function (response) {
                if (response.Exito) {
                    Principal.Manejadora.TraerAutos();
                    var datosUsuario = JSON.parse(localStorage.getItem('usuarioActual'));
                    Principal.Manejadora.MostrarTabla(datosUsuario.perfil);
                }
                else {
                    alert("no");
                }
            }).fail(function (xhr) {
                alert("No se pudo borrar");
                $('#alertAuto').text("No se pudo borrar");
                $('#alertAuto').show();
            });
        };
        return Manejadora;
    }());
    Principal.Manejadora = Manejadora;
})(Principal || (Principal = {}));
