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
            form.append('caso', 'agregar');
            //que se enviará (por AJAX) hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de aliens y se guarda la imagen
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //console.log(xhr.responseText);
                    var retJSON = JSON.parse(xhr.responseText);
                    if (retJSON.ok) {
                        console.info("Todo ok");
                        var path_1 = "./BACKEND/fotos/" + pathFoto;
                        document.getElementById("imgFoto").src = path_1; //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        console.log(path_1);
                    }
                    else {
                        console.error("Se produjio un error");
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
                    tabla += "<table border=1> <thead>";
                    tabla += "<tr>";
                    tabla += "<td>Cuadrante</td>";
                    tabla += "<td>Edad</td>";
                    tabla += "<td>Altura</td>";
                    tabla += "<td>Raza</td>";
                    tabla += "<td>Planeta</td>";
                    tabla += "<td>Foto</td>";
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
                        img.src = "./BACKEND/fotos/" + path;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            //Recuperará (por AJAX)
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
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
