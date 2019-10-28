var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        //cosntructor que reciba los tres
        function Producto(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        //ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse con el método ToJSON, forme
        //una cadena JSON válida
        Producto.prototype.ToString = function () {
            return ('"codigo":' + this.codigo + ',"marca":"' + this.marca + '","precio":"' + this.precio + '",');
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
//hereda de producto
/// <reference path="producto.ts" />
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        //inciialñiza todos
        function Televisor(codigo, marca, precio, tipo, pais, foto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = pais;
            _this.pathFoto = foto;
            return _this;
        }
        // Un método ToJSON():JSON,
        // que retornará la representación del objeto en formato JSON. Se debe de reutilizar el método
        // ToString de la clase Producto.
        Televisor.prototype.ToJSON = function () {
            var retornoJson = ('{' + _super.prototype.ToString.call(this) + '"tipo":"' + this.tipo + '","pais":"' + this.paisOrigen + '","pathFoto":"' + this.pathFoto + '"}');
            return JSON.parse(retornoJson);
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
/// <reference path="./producto.ts" />
/// <reference path="./televisor.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function () {
            var xhr = new XMLHttpRequest();
            //Tomará los distintos valores desde la página index.html
            var codigo = document.getElementById("codigo").value;
            var marca = document.getElementById("marca").value;
            var precio = document.getElementById("precio").value;
            var tipo = document.getElementById("tipo").value;
            var pais = document.getElementById("pais").value;
            //(incluida la foto)
            var foto = document.getElementById("foto");
            console.log(foto);
            var path = document.getElementById("foto").value;
            console.log(path);
            var pathFoto = (path.split('\\'))[2]; //recupero el path porque lo necesito para el nuevo alien
            console.log(pathFoto);
            //objeto de tipo Televisor
            var tele = new Entidades.Televisor(parseInt(codigo), marca, parseFloat(precio), tipo, pais, pathFoto);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('cadenaJson', JSON.stringify(tele.ToJSON()));
            if (localStorage.getItem("modificar") == "true") {
                console.log("MODIFICAR");
                form.append('caso', 'modificar');
            }
            else {
                console.log("AGREGAR");
                form.append('caso', 'agregar');
            }
            //hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de televs y se guarda la imagen
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    var retJSON = JSON.parse(xhr.responseText);
                    if (localStorage.getItem("modificar") == "true") {
                        console.log("MODIFICAR");
                        if (retJSON.TodoOK) {
                            console.info("Todo ok");
                            var path_1 = "./BACKEND/fotos/" + pathFoto;
                            document.getElementById("imgFoto").src = path_1;
                            Manejadora.MostrarTelevisores();
                            localStorage.clear();
                            document.getElementById("btn-agregar").value = "Agregar";
                            document.getElementById("codigo").value = "";
                            document.getElementById("codigo").readOnly = false;
                            document.getElementById("marca").value = "";
                            document.getElementById("precio").value = "";
                            document.getElementById("tipo").value = "";
                            document.getElementById("pais").value = "";
                        }
                        else {
                            console.error("Se produjio un error - No se pudo modificar");
                        }
                    }
                    else {
                        if (retJSON.TodoOK) {
                            console.info("Todo ok");
                            var path_2 = "./BACKEND/fotos/" + pathFoto;
                            document.getElementById("imgFoto").src = path_2; //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                            //console.log(path);
                        }
                        else {
                            console.error("Se produjio un error - No se pudo agregar");
                        }
                    }
                }
            };
        };
        ;
        Manejadora.MostrarTelevisores = function () {
            // (por AJAX)
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            //(caso=”traer”)
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Recuperará  todos los televs del archivo .json y generará un listado dinámico 
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1 style='width:100%' text-aling='center'> <thead>";
                    tabla += "<tr>";
                    tabla += "<th>Codigo</th>";
                    tabla += "<th>Marca</th>";
                    tabla += "<th>Precio</th>";
                    tabla += "<th>Tipo</th>";
                    tabla += "<th>Pais</th>";
                    tabla += "<th>Foto</th>";
                    tabla += "<th colspan='2'>Acciones</th>";
                    tabla += "</tr> </thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        // mostrará toda la información de cada uno de los televisores
                        tabla += "<tr>";
                        tabla += "<td>" + arrayJson[i].codigo + "</td>";
                        tabla += "<td>" + arrayJson[i].marca + "</td>";
                        tabla += "<td>" + arrayJson[i].precio + "</td>";
                        tabla += "<td>" + arrayJson[i].tipo + "</td>";
                        tabla += "<td>" + arrayJson[i].pais + "</td>";
                        // (incluida la foto)
                        tabla += "<td>";
                        var img = new Image();
                        var path = arrayJson[i].pathFoto;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            img.src = "./BACKEND/fotos/" + path;
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        // Agregar una columna (Acciones) al listado de televisores que permita: 
                        // Eliminar y Modificar al televisor elegido. Para ello, 
                        // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // EliminarTelevisor y ModificarTelevisor, respectivamente.
                        console.log(arrayJson[i]);
                        var objJson = JSON.stringify(arrayJson[i]); //hay que pasarlo como stringgufy porque si no se pierde el obj
                        tabla += "<td colspan='2'><input type='button' onclick='new PrimerParcial.Manejadora().EliminarTelevisor(" + objJson + ")' value='Eliminar'</td>";
                        tabla += "<input type='button' onclick='new PrimerParcial.Manejadora().ModificarAlien(" + objJson + ")' value='Modificar'";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            // todos los televisores del archivo .json
            //(caso=”traer”)
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //los guarda en el LocalStorage, con la clave "televisores_local_storage".
                    localStorage.setItem("televisores_local_storage", xhr.responseText);
                    console.log("storage ok");
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var codigo = document.getElementById("codigo").value;
            var localSto = localStorage.getItem("televisores_local_storage");
            var existe = false;
            if (localSto != null) {
                var lsJson = JSON.parse(localSto);
                //comparará los códigos de los televisores guardados en el LocalStorage.
                for (var i = 0; i < lsJson.length; i++) {
                    if (lsJson[i].codigo == codigo) {
                        existe = true;
                    }
                }
                console.log(localSto);
                console.log(existe);
                if (existe == true) {
                    //Si el televisor existe, se mostrará (por consola y alert)
                    console.log("El televisor ya existe");
                    alert("El televisor ya existe");
                }
                else {
                    //Caso contrario, agregará el nuevo televisor y se actualizará el LocalStorage
                    Manejadora.AgregarTelevisor();
                    Manejadora.GuardarEnLocalStorage();
                }
            }
            else {
                alert("Storage vacio");
                console.log("Storage vacio");
            }
        };
        //parte 2
        Manejadora.prototype.EliminarTelevisor = function (objetoJson) {
            console.log(objetoJson);
            //Pedir confirmación, mostrando codigo y tipo, antes de eliminar.
            if (confirm("¿Desea eliminar televisor de codigo " + objetoJson.codigo + " y tipo " + objetoJson.tipo + "?")) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(objetoJson)); // le oaso la cadena
                //(caso=eliminar)
                form.append('caso', "eliminar");
                xhr_1.open('POST', './BACKEND/administrar.php', true); //y aca elimina
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        //alert(xhr.responseText);
                        console.log("Televisor eliminado");
                        document.getElementById("imgFoto").src = "./BACKEND/fotos/tv_defecto.jpg";
                        //Refrescar el listado para visualizar los cambios.
                        Manejadora.MostrarTelevisores();
                        Manejadora.GuardarEnLocalStorage();
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        Manejadora.prototype.ModificarAlien = function (objetoJson) {
            // Mostrará todos los datos del alien que recibe por parámetro (objeto JSON) en el formulario
            document.getElementById("codigo").value = objetoJson.codigo;
            // excepción del codigo, dejarlo como de solo lectura.
            document.getElementById("codigo").readOnly = true;
            document.getElementById("marca").value = objetoJson.marca;
            document.getElementById("precio").value = objetoJson.precio;
            document.getElementById("tipo").value = objetoJson.tipo;
            document.getElementById("pais").value = objetoJson.pais;
            //incluida la foto
            var path = "./BACKEND/fotos/" + objetoJson.pathFoto;
            document.getElementById("imgFoto").src = path; //hay que cambiar el "src" para que sepa donde buscar la foto 
            // el texto del botón de “Agregar”a “Modificar”
            document.getElementById("btn-agregar").value = "Modificar";
            //lamo a uan adpatacion dele liminar para que me borre el televisor viejo
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('cadenaJson', JSON.stringify(objetoJson)); // le oaso la cadena
            form.append('caso', "eliminar");
            //Eliminará al televisor del archivo (por AJAX) y del LocalStorage.
            xhr.open('POST', './BACKEND/administrar.php', true); //y aca elimina
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log("Parte 1 ok");
                }
            };
            localStorage.setItem("modificar", "true"); //guardamos en el local una variable que le avise a agregar que ahora queremos modificar los valores
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//tsc --init
//tsc --outfile Manejadora.js televisor.ts producto.ts manejadora.ts 
