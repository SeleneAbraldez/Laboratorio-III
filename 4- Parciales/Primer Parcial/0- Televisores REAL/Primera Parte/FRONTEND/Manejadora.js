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
            // junto al parámetro caso (con valor “agregar”),
            form.append('caso', 'agregar');
            //hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de televs y se guarda la imagen
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    var retJSON = JSON.parse(xhr.responseText);
                    if (retJSON.TodoOK) {
                        console.info("Todo ok");
                        var path_1 = "./BACKEND/fotos/" + pathFoto;
                        document.getElementById("imgFoto").src = path_1; //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        //console.log(path);
                    }
                    else {
                        console.error("Se produjio un error - No se pudo agregar");
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
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//tsc --init
//tsc --outfile Manejadora.js televisor.ts producto.ts manejadora.ts 
