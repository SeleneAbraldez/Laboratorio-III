var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Mascota = /** @class */ (function () {
        //constructor
        function Mascota(tamaño, edad, precio) {
            this.tamanio = tamaño;
            this.edad = edad;
            this.precio = precio;
        }
        // ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse
        // con el método ToJSON, de la clase perro, forme un JSON válido).
        Mascota.prototype.ToString = function () {
            return "{\"tamanio\":\"" + this.tamanio + "\",\"edad\":\"" + this.edad + "\",\"precio\":\"" + this.precio + "\",";
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
// hereda de Mascota
///<reference path="Mascota.ts"/>
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        //constructor
        function Perro(tamaño, edad, precio, nombre, raza, path) {
            var _this = _super.call(this, tamaño, edad, precio) || this;
            _this.nombre = nombre;
            _this.raza = raza;
            _this.pathFoto = path;
            return _this;
        }
        //ToJSON():JSON, que retornará la representación del objeto en formato JSON. Se debe de
        // reutilizar el método ToString de la clase Mascota
        Perro.prototype.ToJson = function () {
            var retornoJson = this.ToString() + "\"nombre\":\"" + this.nombre + "\",\"raza\":\"" + this.raza + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(retornoJson);
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
///<reference path="Perro.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarPerroJSON = function () {
            var xhr = new XMLHttpRequest();
            //Tomará los distintos valores desde la página index.html (
            var tamaño = document.getElementById("tamaño").value;
            var edad = document.getElementById("edad").value;
            var precio = document.getElementById("precio").value;
            var nombre = document.getElementById("nombre").value;
            var raza = document.getElementById("raza").value;
            //(incluida la foto)
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            console.log(path);
            var pathFoto = (path.split('\\'))[2]; //recupero el path porque lo necesito para el nuevo obj
            console.log(pathFoto);
            // creará un objeto de tipo Perro
            var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            var perrito = perro.ToJson();
            perrito = JSON.stringify(perrito);
            form.append('cadenaJson', perrito);
            // enviará (por AJAX) hacia “./BACKEND/agregar_json.php”.
            xhr.open('POST', './BACKEND/agregar_json.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    var retJSON = JSON.parse(xhr.responseText);
                    if (retJSON.ok) {
                        console.info("Todo ok");
                        console.log(retJSON.pathFoto);
                        var path_1 = "./BACKEND/fotos/" + retJSON.pathFoto; //llamamos al path llamado nuevo porque ahora ya no es el nombre subido, es el nombre cambiado
                        document.getElementById("imgFoto").src = path_1; //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        console.log(path_1);
                    }
                    else {
                        console.error("Se produjio un error");
                    }
                }
            };
        };
        Manejadora.MostrarPerrosJSON = function () {
            // (por AJAX)
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            var auxManejadora = new Manejadora();
            // desde “./BACKEND/traer_json.php”,
            xhr.open('POST', './BACKEND/traer_json.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // todos los perros del archivo .json y generará un listado dinámico (en el FRONTEND)
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1 style='width:100%'> <thead>";
                    tabla += "<tr>";
                    tabla += "<th>&emsp;Tamaño</th>";
                    tabla += "<th>&emsp;Edad</th>";
                    tabla += "<th>&emsp;Precio</th>";
                    tabla += "<th>&emsp;Nombre</th>";
                    tabla += "<th>&emsp;Raza</th>";
                    tabla += "<th>&emsp;Foto</th>";
                    //tabla += "<th colspan='2'>Acciones</th>";
                    tabla += "</tr> </thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        // mostrará toda la información de cada uno de los perros
                        tabla += "<tr>";
                        tabla += "<td>" + arrayJson[i].tamanio + "</td>";
                        tabla += "<td>" + arrayJson[i].edad + "</td>";
                        tabla += "<td>" + arrayJson[i].precio + "</td>";
                        tabla += "<td>" + arrayJson[i].nombre + "</td>";
                        tabla += "<td>" + arrayJson[i].raza + "</td>";
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
                        // // Agregar una columna (Acciones) al listado de aliens que permita: 
                        // // Eliminar y Modificar al alien elegido. Para ello, 
                        // // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // // EliminarAlien y ModificarAlien, respectivamente.
                        // let objJson : JSON = arrayJson[i];
                        //     tabla+= "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.EliminarAlien("+(arrayJson[i])+")' value='Eliminar'</td>";
                        //     tabla+= "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.ModificarAlien("+(arrayJson[i])+")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.AgregarPerroEnBaseDatos = function () {
            var xhr = new XMLHttpRequest();
            // Tomará los distintos valores desde la página index.html
            var tamaño = document.getElementById("tamaño").value;
            var edad = document.getElementById("edad").value;
            var precio = document.getElementById("precio").value;
            var nombre = document.getElementById("nombre").value;
            var raza = document.getElementById("raza").value;
            // (incluida la foto)
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            // creará un objeto de tipo Perro
            var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
            // que se enviará (por AJAX) hacia “./BACKEND/agregar_bd.php”.
            var direccion = './BACKEND/agregar_bd.php';
            var form = new FormData();
            form.append('foto', foto.files[0]);
            var perrito = perro.ToJson();
            perrito = JSON.stringify(perrito);
            form.append('cadenaJson', perrito);
            // if (localStorage.getItem("modificar") == "true") {
            //     direccion = './BACKEND/modificar_bd.php';
            // }
            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var retJSON = JSON.parse(xhr.responseText);
                    // if (localStorage.getItem("modificar") == "true") {
                    //     if (!retJSON.Ok) {
                    //         alert("No se pudo modificar!");
                    //         console.log("No se pudo modificar!");
                    //     }
                    //     else {
                    //         Manejadora.MostrarPerrosBaseDatos();
                    //     }
                    //     (<HTMLInputElement>document.getElementById("btnAgregarBd")).value = "Agregar BD";
                    //     (<HTMLInputElement>document.getElementById("precio")).disabled = false;
                    //     localStorage.clear();
                    //     Manejadora.LimpiarCampos();
                    // }
                    // else {
                    if (retJSON.ok) {
                        console.info("Todo ok");
                        console.log(retJSON.pathFoto);
                        var path_2 = "./BACKEND/fotos/" + retJSON.pathFoto;
                        document.getElementById("imgFoto").src = path_2; //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        console.log(path_2);
                    }
                    else {
                        console.error("Se produjio un error");
                    }
                    // }
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var xhr = new XMLHttpRequest();
            //recibo los parametros a verificar
            var edad = document.getElementById("edad").value;
            var raza = document.getElementById("raza").value;
            var form = new FormData();
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var bandera = false;
                    var arrayJson = JSON.parse(xhr.responseText);
                    console.log(arrayJson);
                    //comparará las edades y la raza de los perros guardados.
                    for (var i = 0; i < arrayJson.length; i++) {
                        if (arrayJson[i].raza == raza && (arrayJson[i].edad).toString() == edad) {
                            bandera = true;
                            break;
                        }
                    }
                    // Si el perro existe, se mostrará (por consola y alert) lo acontecido.
                    if (bandera == true) {
                        console.log("El perro ya existe");
                        alert("El perro ya existe");
                    }
                    else { //Caso contrario, agregará el nuevo perro.
                        Manejadora.AgregarPerroEnBaseDatos();
                    }
                }
            };
        };
        Manejadora.MostrarPerrosBaseDatos = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1 style='width:100%' text-aling='center'> <thead>";
                    tabla += "<tr>";
                    tabla += "<th>Tamaño</th>";
                    tabla += "<th>Edad</th>";
                    tabla += "<th>Precio</th>";
                    tabla += "<th>Nombre</th>";
                    tabla += "<th>Raza</th>";
                    tabla += "<th>Foto</th>";
                    //tabla += "<th colspan='2'>Acciones</th>";
                    tabla += "</tr> </thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        // mostrará toda la información de cada uno de los perros
                        tabla += "<tr>";
                        tabla += "<td>" + arrayJson[i].tamanio + "</td>";
                        tabla += "<td>" + arrayJson[i].edad + "</td>";
                        tabla += "<td>" + arrayJson[i].precio + "</td>";
                        tabla += "<td>" + arrayJson[i].nombre + "</td>";
                        tabla += "<td>" + arrayJson[i].raza + "</td>";
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
                        // if (arrayJson[i].pathFoto.indexOf("MODIFICADA") == -1) {
                        //     tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        // }
                        // else {
                        //     tabla += "<img src='./BACKEND/fotos_modificadas/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        // }
                        // // Agregar una columna (Acciones) al listado de aliens que permita: 
                        // // Eliminar y Modificar al alien elegido. Para ello, 
                        // // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // // EliminarAlien y ModificarAlien, respectivamente.
                        // let objJson : JSON = arrayJson[i];
                        //     tabla+= "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.EliminarAlien("+(arrayJson[i])+")' value='Eliminar'</td>";
                        //     tabla+= "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.ModificarAlien("+(arrayJson[i])+")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.prototype.ObtenerPerrosPorTamaño = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('op', "traer");
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //recupero la cadena y convierto a array de json
                    var arrayJson = JSON.parse(xhr.responseText);
                    var arrayTamaños = [];
                    for (var i = 0; i < arrayJson.length; i++) {
                    }
                }
                ;
            };
        };
        Manejadora.prototype.ModificarPerro = function (cadenaJson) {
            document.getElementById("tamaño").value = cadenaJson.tamanio;
            document.getElementById("edad").value = cadenaJson.edad;
            document.getElementById("precio").value = cadenaJson.precio;
            document.getElementById("precio").disabled = true;
            document.getElementById("nombre").value = cadenaJson.nombre;
            document.getElementById("raza").value = cadenaJson.raza;
            var path = "";
            if (cadenaJson.pathFoto.indexOf("MODIFICADA") == -1) {
                path = "./BACKEND/fotos/" + cadenaJson.pathFoto;
            }
            else {
                path = "./BACKEND/fotos_modificadas/" + cadenaJson.pathFoto;
            }
            //hay que cambiar el "src" para que sepa donde buscar la foto 
            document.getElementById("imgFoto").src = path;
            document.getElementById("btnAgregarBd").value = "Modificar BD";
            //(<HTMLInputElement> document.getElementById("btn")).className="btn btn-warning";
            localStorage.setItem("modificar", "true");
        };
        //metodo de la interfaz
        Manejadora.prototype.EliminarPerro = function (cadenaJson) {
            if (confirm("Esta seguro que desea eliminar al perro de nombre " + cadenaJson.nombre + " y raza " + cadenaJson.raza)) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(cadenaJson));
                form.append('op', "eliminar_bd");
                xhr_1.open('POST', './BACKEND/eliminar_bd.php', true);
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        //alert(xhr.responseText);
                        console.log("perro eliminado");
                        document.getElementById("imgFoto").src = "./BACKEND/fotos/huella_default.png";
                        Manejadora.MostrarPerrosBaseDatos();
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        Manejadora.LimpiarCampos = function () {
            document.getElementById("tamaño").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("nombre").value = "";
            //direccion de donde se encuentra la foto
            var path = "./BACKEND/fotos/huella_default.png";
            //hay que cambiar el "src" para que sepa donde buscar la foto 
            document.getElementById("imgFoto").src = path;
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
