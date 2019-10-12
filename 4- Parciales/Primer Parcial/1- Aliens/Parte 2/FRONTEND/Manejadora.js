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
    var Ente = /** @class */ (function () {
        //constructor
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        //ToString():string, que retorne la representación de la clase en formato cadena (
        //preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
        Ente.prototype.ToString = function () {
            return "{\"cuadrante\":\"" + this.cuadrante + "\",\"edad\":\"" + this.edad + "\",\"altura\":\"" + this.altura + "\",";
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
//hereda de Ente
///<reference path="Ente.ts"/>
var Entidades;
(function (Entidades) {
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        //cosntructor
        function Alien(cuadrante, edad, altura, raza, planeta, path) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this.raza = raza;
            _this.planetaOrigen = planeta;
            _this.pathFoto = path;
            return _this;
        }
        //ToJSON():JSON, que retornará la representación del objeto en formato JSON. 
        //Se debe de reutilizar el método ToString de la clase Ente.
        Alien.prototype.ToJSON = function () {
            var retornoJson = _super.prototype.ToString.call(this) + "\"raza\":\"" + this.raza + "\",\"planetaOrigen\":\"" + this.planetaOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(retornoJson);
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
///<reference path="./Alien.ts"/>
var RecuperatorioPrimerParcial;
(function (RecuperatorioPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function () {
            var xhr = new XMLHttpRequest();
            //Tomará los distintos valores desde la página index.html
            var cuadrante = document.getElementById("cuadrante").value;
            var edad = document.getElementById("edad").value;
            var altura = document.getElementById("altura").value;
            var raza = document.getElementById("raza").value;
            var planeta = document.getElementById("cboPlaneta").value;
            //(incluida la foto)
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2]; //recupero el path porque lo necesito para el nuevo alien
            //objeto de tipo Alien
            var Alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planeta, pathFoto);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('cadenaJson', JSON.stringify(Alien.ToJSON()));
            if (localStorage.getItem("modificar") == "true") {
                console.log("MODIFICAR");
                form.append('caso', 'modificar');
            }
            else {
                console.log("AGREGAR");
                form.append('caso', 'agregar');
            }
            //que se enviará (por AJAX) hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de aliens y se guarda la imagen
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    var retJSON = JSON.parse(xhr.responseText);
                    if (localStorage.getItem("modificar") == "true") {
                        console.log("MODIFICAR");
                        if (retJSON.ok) {
                            console.info("Todo ok");
                            // let path: string = "./BACKEND/fotos/alien_defecto.jpg";
                            // (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src a la foto por defecto                      
                            var path_1 = "./BACKEND/fotos/" + pathFoto;
                            document.getElementById("imgFoto").src = path_1;
                            Manejadora.MostrarAliens();
                            localStorage.clear();
                            document.getElementById("btn-agregar").value = "Agregar";
                            document.getElementById("cuadrante").value = "";
                            document.getElementById("cuadrante").readOnly = false;
                            document.getElementById("edad").value = "";
                            document.getElementById("altura").value = "";
                            document.getElementById("raza").value = "";
                            document.getElementById("cboPlaneta").value = "";
                            document.getElementById("raza").value = "";
                        }
                        else {
                            console.error("Se produjio un error - No se pudo modificar");
                        }
                    }
                    else {
                        console.log("AGREGAR");
                        if (retJSON.ok) {
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
        Manejadora.MostrarAliens = function () {
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
                    // Recuperará  todos los aliens del archivo .json y generará un listado dinámico 
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1 style='width:100%' text-aling='center'> <thead>";
                    tabla += "<tr>";
                    tabla += "<th>Cuadrante</th>";
                    tabla += "<th>Edad</th>";
                    tabla += "<th>Altura</th>";
                    tabla += "<th>Raza</th>";
                    tabla += "<th>Planeta</th>";
                    tabla += "<th>Foto</th>";
                    tabla += "<th colspan='2'>Acciones</th>";
                    tabla += "</tr> </thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        // mostrará toda la información de cada uno de los televisores
                        tabla += "<tr>";
                        tabla += "<td>" + arrayJson[i].cuadrante + "</td>";
                        tabla += "<td>" + arrayJson[i].edad + "</td>";
                        tabla += "<td>" + arrayJson[i].altura + "</td>";
                        tabla += "<td>" + arrayJson[i].raza + "</td>";
                        tabla += "<td>" + arrayJson[i].planetaOrigen + "</td>";
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
                        // Agregar una columna (Acciones) al listado de aliens que permita: 
                        // Eliminar y Modificar al alien elegido. Para ello, 
                        // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // EliminarAlien y ModificarAlien, respectivamente.
                        console.log(arrayJson[i]);
                        var objJson = JSON.stringify(arrayJson[i]); //hay que pasarlo como stringgufy porque si no se pierde el obj
                        tabla += "<td><input type='button' onclick='new RecuperatorioPrimerParcial.Manejadora().EliminarAlien(" + objJson + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='new RecuperatorioPrimerParcial.Manejadora().ModificarAlien(" + objJson + ")' value='Modificar'</td>";
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
            // todos los aliens del archivo .json
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //los guarda en el LocalStorage, con la clave “aliens_local_storage”.
                    localStorage.setItem("aliens_local_storage", xhr.responseText);
                    console.log("storage ok");
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var cuadrante = document.getElementById("cuadrante").value;
            var raza = document.getElementById("raza").value;
            var localSto = localStorage.getItem("aliens_local_storage");
            var existe = false;
            if (localSto != null) { //me fijo si no viene vacio
                var lsJson = JSON.parse(localSto);
                //comparará los códigos de los televisores guardados en el LocalStorage.
                for (var i = 0; i < lsJson.length; i++) {
                    if (lsJson[i].cuadrante == cuadrante && lsJson[i].raza == raza) {
                        existe = true;
                    }
                }
                console.log(localSto);
                console.log(existe);
                if (existe == true) {
                    //Si el alien existe, se mostrará (por consola y alert)
                    console.log("El alien ya existe");
                    alert("El alien ya existe");
                }
                else {
                    //Caso contrario, agregará el nuevo alien y se actualizará el LocalStorage
                    Manejadora.AgregarAlien();
                    Manejadora.GuardarEnLocalStorage();
                }
            }
            else {
                alert("No se encuentra");
                console.log("No se encuentra");
            }
        };
        Manejadora.ObtenerAliensPorCuadrante = function () {
            var auxContador = new Array();
            var auxLocalStorage = localStorage.getItem("aliens_local_storage");
            if (auxLocalStorage != null) {
                var auxJson = JSON.parse(auxLocalStorage);
                for (var _i = 0, auxJson_1 = auxJson; _i < auxJson_1.length; _i++) {
                    var alien = auxJson_1[_i];
                    if (auxContador[alien.cuadrante] === undefined) {
                        auxContador[alien.cuadrante] = 0;
                    }
                    auxContador[alien.cuadrante]++;
                }
                var auxMax = undefined;
                var auxMin = undefined;
                for (var cuadrante in auxContador) {
                    if (auxMax === undefined && auxMin === undefined) {
                        auxMax = auxContador[cuadrante];
                        auxMin = auxContador[cuadrante];
                    }
                    var cantAliens = auxContador[cuadrante];
                    if (auxMax < cantAliens) {
                        auxMax = cantAliens;
                    }
                    if (auxMin > cantAliens) {
                        auxMin = cantAliens;
                    }
                }
                var cuadrantesMax = new Array();
                var cuadrantesMin = new Array();
                for (var cuadrante in auxContador) {
                    if (auxContador[cuadrante] == auxMax) {
                        cuadrantesMax.push(cuadrante);
                    }
                    else if (auxContador[cuadrante] == auxMin) {
                        cuadrantesMin.push(cuadrante);
                    }
                }
                var mensaje = "Cuadrante/s con mas aliens: ";
                if (cuadrantesMax.length > 0) {
                    for (var _a = 0, cuadrantesMax_1 = cuadrantesMax; _a < cuadrantesMax_1.length; _a++) {
                        var cuadrante = cuadrantesMax_1[_a];
                        mensaje += "\n*" + cuadrante;
                    }
                    mensaje += "\nCon " + auxMax;
                    console.log(mensaje);
                }
                if (cuadrantesMin.length > 0) {
                    mensaje = "Cuadrante/s con menos aliens: ";
                    for (var _b = 0, cuadrantesMin_1 = cuadrantesMin; _b < cuadrantesMin_1.length; _b++) {
                        var cuadrante = cuadrantesMin_1[_b];
                        mensaje += "\n*" + cuadrante;
                    }
                    mensaje += "\nCon " + auxMin;
                    console.log(mensaje);
                }
            }
            else {
                console.log("storage vacio");
            }
        };
        Manejadora.prototype.EliminarAlien = function (objetoJson) {
            console.log(objetoJson);
            //Pedir confirmación, mostrando cuadrante y raza, antes de eliminar.
            if (confirm("¿Desea eliminar alien de cuadrante " + objetoJson.cuadrante + " y raza " + objetoJson.raza + "?")) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(objetoJson)); // le oaso la cadena
                form.append('caso', "eliminar");
                //Eliminará al alien del archivo (por AJAX) y del LocalStorage.
                xhr_1.open('POST', './BACKEND/administrar.php', true); //y aca elimina
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        //alert(xhr.responseText);
                        console.log("Alien eliminado");
                        document.getElementById("imgFoto").src = "./BACKEND/fotos/alien_defecto.jpg";
                        //Refrescar el listado para visualizar los cambios.
                        Manejadora.MostrarAliens();
                        Manejadora.GuardarEnLocalStorage();
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        //incluida la foto (mostrarla en “imgFoto”) Modificar el método AgregarAlienpara cambiar el caso de “agregar”a “modificar” Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.Modificará al alien del archivo y del LocalStorage.
        Manejadora.prototype.ModificarAlien = function (objetoJson) {
            // Mostrará todos los datos del alien que recibe por parámetro (objeto JSON) en el formulario
            document.getElementById("cuadrante").value = objetoJson.cuadrante;
            // excepción del cuadrante, dejarlo como de solo lectura.
            document.getElementById("cuadrante").readOnly = true;
            document.getElementById("edad").value = objetoJson.edad;
            document.getElementById("altura").value = objetoJson.altura;
            document.getElementById("raza").value = objetoJson.raza;
            document.getElementById("cboPlaneta").value = objetoJson.planetaOrigen;
            document.getElementById("raza").value = objetoJson.raza;
            //incluida la foto
            var path = "./BACKEND/fotos/" + objetoJson.pathFoto;
            document.getElementById("imgFoto").src = path; //hay que cambiar el "src" para que sepa donde buscar la foto 
            // el texto del botón de “Agregar”a “Modificar”
            document.getElementById("btn-agregar").value = "Modificar";
            //lamo a uan adpatacion dele liminar para que me borre el alien viejo
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('cadenaJson', JSON.stringify(objetoJson)); // le oaso la cadena
            form.append('caso', "eliminar");
            //Eliminará al alien del archivo (por AJAX) y del LocalStorage.
            xhr.open('POST', './BACKEND/administrar.php', true); //y aca elimina
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log("Alien eliminado");
                }
            };
            localStorage.setItem("modificar", "true"); //guardamos en el local una variable que le avise a agregar que ahora queremos modificar los valores
        };
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
//tsc --outfile Manejadora.js .\Alien.ts .\Ente.ts .\Manejadora.ts
