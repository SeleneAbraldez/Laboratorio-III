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
                        var objJson = arrayJson[i];
                        tabla += "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.EliminarAlien(" + (arrayJson[i]) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.ModificarAlien(" + (arrayJson[i]) + ")' value='Modificar'</td>";
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
            // Modificar el método AgregarPerroEnBaseDatos para que cambie el comportamiento del método
            // Se enviará (por AJAX) hacia “./BACKEND/modificar_bd.php”, modificando la tabla de la base de datos
            if (localStorage.getItem("modificar") == "true") {
                direccion = './BACKEND/modificar_bd.php';
                form.append('VIEJAcadenaJson', localStorage.getItem("viejoModi"));
            }
            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var retJSON = JSON.parse(xhr.responseText);
                    console.log(retJSON);
                    if (localStorage.getItem("modificar") == "true") {
                        if (retJSON.ok) {
                            // Refrescar el listado solo si se pudo modificar,
                            Manejadora.MostrarPerrosBaseDatos();
                        }
                        else {
                            console.log(retJSON.ok);
                            console.log(retJSON.viejaCadenaJSON);
                            console.log(retJSON.CadenaJSON);
                            // caso contrario, informar (por alert y consola) lo acontecido.
                            alert("No se pudo modificar!");
                            console.log("No se pudo modificar!");
                        }
                        document.getElementById("btnAgregarBd").value = "Agregar BD"; //devolvemos el boton
                        document.getElementById("nombre").readOnly = false;
                        localStorage.clear(); //limpiamos el storage para que no interfiera   
                        Manejadora.LimpiarCampos(); //limpiamos todos los campos
                    }
                    else {
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
                    }
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
                    tabla += "<th colspan='2'>Acciones</th>";
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
                            if (arrayJson[i].pathFoto.indexOf("modificada") == -1) {
                                img.src = "./BACKEND/fotos/" + path;
                                tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                            }
                            else {
                                img.src = "./BACKEND/fotos_modificadas/" + path;
                                tabla += "<img src='./BACKEND/fotos_modificadas/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>"; //si es de las fotos modoficadas, debe buscar en modificada
                            }
                        }
                        else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        // Agregar una columna (Acciones) al listado de aliens que permita: 
                        // Eliminar y Modificar al alien elegido. Para ello, 
                        // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // EliminarAlien y ModificarAlien, respectivamente.
                        var objJson = JSON.stringify(arrayJson[i]); //hay que pasarlo como stringgufy porque si no se pierde el obj
                        tabla += "<td><input type='button' onclick='new PrimerParcial.Manejadora().EliminarPerro(" + objJson + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='new PrimerParcial.Manejadora().ModificarPerro(" + objJson + ")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        //I2
        // Eliminará al perro de la base de datos (por AJAX). Recibe como parámetro al objeto JSON que se ha de eliminar.
        Manejadora.prototype.EliminarPerro = function (cadenaJson) {
            // Pedir confirmación, mostrando nombre y raza, antes de eliminar. 
            if (confirm("Esta seguro que desea eliminar al perro " + cadenaJson.nombre + " y raza " + cadenaJson.raza + "?")) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                //le paso la cadena al eliminar
                form.append('cadenaJson', JSON.stringify(cadenaJson));
                xhr_1.open('POST', './BACKEND/eliminar_bd.php', true);
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                //si todo salio bien
                xhr_1.onreadystatechange = function () {
                    var retJSON = JSON.parse(xhr_1.responseText);
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        if (retJSON.ok) {
                            console.info("Perro eliminado");
                            document.getElementById("imgFoto").src = "./BACKEND/fotos/huella_default.png";
                            // Refrescar el listado para visualizar los cambios.
                            Manejadora.MostrarPerrosBaseDatos();
                        }
                        else {
                            console.error("No se ha podido eliminar perro " + cadenaJson.nombre);
                        }
                    }
                };
            }
            else {
                alert("Accion eliminar cancelada");
            }
        };
        Manejadora.prototype.ModificarPerro = function (cadenaJson) {
            // Mostrará todos los datos del perro que recibe por parámetro (objeto JSON), en el formulario
            document.getElementById("tamaño").value = cadenaJson.tamanio;
            document.getElementById("edad").value = cadenaJson.edad;
            document.getElementById("precio").value = cadenaJson.precio;
            // Permitirá modificar cualquier campo, a excepción del nombre, dejarlo como de solo lectura.
            document.getElementById("nombre").value = cadenaJson.nombre;
            document.getElementById("nombre").readOnly = true;
            document.getElementById("raza").value = cadenaJson.raza;
            var path = "";
            //  incluida la foto.
            if (cadenaJson.pathFoto.indexOf("modificada") == -1) { //se fija dentro del nombre de la foto si es de las modificadas
                path = "./BACKEND/fotos/" + cadenaJson.pathFoto; //si esta en la carpeta de fotos modificadas
            }
            else { //o si esta en la carpeta de fotos
                path = "./BACKEND/fotos_modificadas/" + cadenaJson.pathFoto;
            }
            document.getElementById("imgFoto").src = path; //hay que cambiar el "src" para que sepa donde buscar la foto 
            // texto del botón de “Agregar” a “Modificar”, según corresponda.
            document.getElementById("btnAgregarBd").value = "Modificar BD";
            localStorage.setItem("modificar", "true");
            localStorage.setItem("viejoModi", JSON.stringify(cadenaJson)); //le paso el viejo a modificar
        };
        Manejadora.prototype.ObtenerPerrosPorTamaño = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            // Recupera de la base de datos todos los perros 
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var auxContador = new Array();
                    var auxJson = JSON.parse(xhr.responseText);
                    for (var _i = 0, auxJson_1 = auxJson; _i < auxJson_1.length; _i++) {
                        var perro = auxJson_1[_i];
                        if (auxContador[perro.tamanio] === undefined) {
                            auxContador[perro.tamanio] = 0;
                        }
                        auxContador[perro.tamanio]++;
                    }
                    var auxMax = undefined;
                    var auxMin = undefined;
                    for (var tamanio1 in auxContador) {
                        if (auxMax === undefined && auxMin === undefined) {
                            auxMax = auxContador[tamanio1];
                            auxMin = auxContador[tamanio1];
                        }
                        var cantMascotas = auxContador[tamanio1];
                        if (auxMax < cantMascotas) {
                            auxMax = cantMascotas;
                        }
                        if (auxMin > cantMascotas) {
                            auxMin = cantMascotas;
                        }
                    }
                    var tamaniosMax = new Array();
                    var tamaniosMin = new Array();
                    for (var tamanio in auxContador) {
                        if (auxContador[tamanio] == auxMax) {
                            tamaniosMax.push(tamanio);
                        }
                        else if (auxContador[tamanio] == auxMin) {
                            tamaniosMin.push(tamanio);
                        }
                    }
                    // y muestra, por consola, 
                    // que tamaño o tamaños poseen más perros (y su cantidad) y que tamaño o 
                    // tamaños poseen menos perros (y su cantidad).
                    var mensaje = "Tamaño/s con mas perros ";
                    if (tamaniosMax.length > 0) {
                        for (var _a = 0, tamaniosMax_1 = tamaniosMax; _a < tamaniosMax_1.length; _a++) {
                            var tamanio = tamaniosMax_1[_a];
                            mensaje += "\n-" + tamanio;
                        }
                        mensaje += "\nCon " + auxMax;
                        console.log(mensaje);
                    }
                    if (tamaniosMin.length > 0) {
                        mensaje = "Tamaño/s con menos perros ";
                        for (var _b = 0, tamaniosMin_1 = tamaniosMin; _b < tamaniosMin_1.length; _b++) {
                            var tamanio = tamaniosMin_1[_b];
                            mensaje += "\n-" + tamanio;
                        }
                        mensaje += "\nCon " + auxMin;
                        console.log(mensaje);
                    }
                }
                ;
            };
        };
        //hago funcion para limpiar campòs
        Manejadora.LimpiarCampos = function () {
            document.getElementById("tamaño").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("nombre").value = "";
            var path = "./BACKEND/fotos/huella_default.png";
            document.getElementById("imgFoto").src = path;
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
