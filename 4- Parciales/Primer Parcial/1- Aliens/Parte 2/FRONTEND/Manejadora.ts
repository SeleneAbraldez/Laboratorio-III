
///<reference path="./Alien.ts"/>

namespace RecuperatorioPrimerParcial {
    export interface IParte2 {
        EliminarAlien(objetoJson: any): void;
        ModificarAlien(objetoJson: any): void;
    }

    export class Manejadora implements IParte2 {
        public static AgregarAlien() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            //Tomará los distintos valores desde la página index.html
            let cuadrante: string = (<HTMLInputElement>document.getElementById("cuadrante")).value;
            let edad: string = (<HTMLInputElement>document.getElementById("edad")).value;
            let altura: string = (<HTMLInputElement>document.getElementById("altura")).value;

            let raza: string = (<HTMLInputElement>document.getElementById("raza")).value;
            let planeta: string = (<HTMLSelectElement>document.getElementById("cboPlaneta")).value;
            //(incluida la foto)
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            let path: string = (<HTMLInputElement>document.getElementById("foto")).value;
            let pathFoto: string = (path.split('\\'))[2];   //recupero el path porque lo necesito para el nuevo alien

            //objeto de tipo Alien
            let Alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planeta, pathFoto);

            let form: FormData = new FormData();

            form.append('foto', foto.files[0]);
            form.append('cadenaJson', JSON.stringify(Alien.ToJSON()));
            if (localStorage.getItem("modificar") == "true") {
                console.log("MODIFICAR");
                form.append('caso', 'modificar');
            } else {
                console.log("AGREGAR");
                form.append('caso', 'agregar');
            }

            //que se enviará (por AJAX) hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de aliens y se guarda la imagen

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    let retJSON = JSON.parse(xhr.responseText);
                    if (localStorage.getItem("modificar") == "true") {
                        console.log("MODIFICAR");
                        if (retJSON.ok) {
                            console.info("Todo ok");
                            // let path: string = "./BACKEND/fotos/alien_defecto.jpg";
                            // (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src a la foto por defecto                      
                            let path: string = "./BACKEND/fotos/" + pathFoto;
                            (<HTMLImageElement>document.getElementById("imgFoto")).src = path; 
                            Manejadora.MostrarAliens();
                            localStorage.clear();
                            (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Agregar";
                            (<HTMLInputElement>document.getElementById("cuadrante")).value = "";
                            (<HTMLInputElement>document.getElementById("cuadrante")).readOnly = false;
                            (<HTMLInputElement>document.getElementById("edad")).value = "";
                            (<HTMLInputElement>document.getElementById("altura")).value = "";
                            (<HTMLInputElement>document.getElementById("raza")).value = "";
                            (<HTMLInputElement>document.getElementById("cboPlaneta")).value = "";
                            (<HTMLSelectElement>document.getElementById("raza")).value = "";
                        } else {
                            console.error("Se produjio un error - No se pudo modificar");
                        }
                    } else {
                        console.log("AGREGAR");
                        if (retJSON.ok) {
                            console.info("Todo ok");
                            let path: string = "./BACKEND/fotos/" + pathFoto;
                            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                            //console.log(path);
                        } else {
                            console.error("Se produjio un error - No se pudo agregar");
                        }
                    }
                }
            };
        }


        public static MostrarAliens() {
            // (por AJAX)
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();

            //(caso=”traer”)
            form.append('caso', "traer");
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Recuperará  todos los aliens del archivo .json y generará un listado dinámico 
                    let arrayJson = JSON.parse(xhr.responseText);

                    let tabla: string = "";
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

                    for (let i = 0; i < arrayJson.length; i++) {
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
                        let path: string = arrayJson[i].pathFoto;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            img.src = "./BACKEND/fotos/" + path;
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        } else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        // Agregar una columna (Acciones) al listado de aliens que permita: 
                        // Eliminar y Modificar al alien elegido. Para ello, 
                        // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // EliminarAlien y ModificarAlien, respectivamente.
                        console.log(arrayJson[i]);
                        let objJson: string = JSON.stringify(arrayJson[i]); //hay que pasarlo como stringgufy porque si no se pierde el obj
                        tabla += "<td><input type='button' onclick='new RecuperatorioPrimerParcial.Manejadora().EliminarAlien(" + objJson + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='new RecuperatorioPrimerParcial.Manejadora().ModificarAlien(" + objJson + ")' value='Modificar'</td>";
                        tabla += "</tr>";

                    }
                    tabla += "</table>";
                    (<HTMLInputElement>document.getElementById("divTabla")).innerHTML = tabla;
                }
            };
        }


        public static GuardarEnLocalStorage() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();
            // todos los aliens del archivo .json
            form.append('caso', "traer");

            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //los guarda en el LocalStorage, con la clave “aliens_local_storage”.
                    localStorage.setItem("aliens_local_storage", xhr.responseText);
                    console.log("storage ok");
                }
            };
        }


        public static VerificarExistencia() {
            let cuadrante: string = (<HTMLInputElement>document.getElementById("cuadrante")).value;
            let raza: string = (<HTMLInputElement>document.getElementById("raza")).value;
            let localSto = localStorage.getItem("aliens_local_storage");

            let existe = false;

            if (localSto != null) { //me fijo si no viene vacio
                let lsJson: any = JSON.parse(localSto);
                //comparará los códigos de los televisores guardados en el LocalStorage.
                for (let i = 0; i < lsJson.length; i++) {
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
                } else {
                    //Caso contrario, agregará el nuevo alien y se actualizará el LocalStorage
                    Manejadora.AgregarAlien();
                    Manejadora.GuardarEnLocalStorage();
                }
            } else {
                alert("No se encuentra");
                console.log("No se encuentra");
            }
        }

        public static ObtenerAliensPorCuadrante() { //este codigo es un desastre
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
                        var cuadrante: string = cuadrantesMax_1[_a];
                        mensaje += "\n*" + cuadrante;
                    }
                    mensaje += "\nCon " + auxMax;
                    console.log(mensaje);
                }
                if (cuadrantesMin.length > 0) {
                    mensaje = "Cuadrante/s con menos aliens: ";
                    for (var _b = 0, cuadrantesMin_1 = cuadrantesMin; _b < cuadrantesMin_1.length; _b++) {
                        var cuadrante: string = cuadrantesMin_1[_b];
                        mensaje += "\n*" + cuadrante;
                    }
                    mensaje += "\nCon " + auxMin;
                    console.log(mensaje);
                }
            } else {
                console.log("storage vacio");
            }
        }

        public EliminarAlien(objetoJson: any) {
            console.log(objetoJson);
            //Pedir confirmación, mostrando cuadrante y raza, antes de eliminar.
            if (confirm("¿Desea eliminar alien de cuadrante " + objetoJson.cuadrante + " y raza " + objetoJson.raza + "?")) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                let form: FormData = new FormData();

                form.append('cadenaJson', JSON.stringify(objetoJson));  // le oaso la cadena
                form.append('caso', "eliminar");

                //Eliminará al alien del archivo (por AJAX) y del LocalStorage.
                xhr.open('POST', './BACKEND/administrar.php', true);    //y aca elimina
                xhr.setRequestHeader("enctype", "multipart/form-data");
                xhr.send(form);

                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        //alert(xhr.responseText);
                        console.log("Alien eliminado");
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/alien_defecto.jpg";
                        //Refrescar el listado para visualizar los cambios.
                        Manejadora.MostrarAliens();
                        Manejadora.GuardarEnLocalStorage();
                    }
                };
            } else {
                alert("Accion cancelada");
            }

        }

        //incluida la foto (mostrarla en “imgFoto”) Modificar el método AgregarAlienpara cambiar el caso de “agregar”a “modificar” Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.Modificará al alien del archivo y del LocalStorage.
        public ModificarAlien(objetoJson: any) {
            // Mostrará todos los datos del alien que recibe por parámetro (objeto JSON) en el formulario
            (<HTMLInputElement>document.getElementById("cuadrante")).value = objetoJson.cuadrante;
            // excepción del cuadrante, dejarlo como de solo lectura.
            (<HTMLInputElement>document.getElementById("cuadrante")).readOnly = true;
            (<HTMLInputElement>document.getElementById("edad")).value = objetoJson.edad;
            (<HTMLInputElement>document.getElementById("altura")).value = objetoJson.altura;
            (<HTMLInputElement>document.getElementById("raza")).value = objetoJson.raza;
            (<HTMLInputElement>document.getElementById("cboPlaneta")).value = objetoJson.planetaOrigen;
            (<HTMLSelectElement>document.getElementById("raza")).value = objetoJson.raza;

            //incluida la foto
            let path : string= "./BACKEND/fotos/" + objetoJson.pathFoto;
            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //hay que cambiar el "src" para que sepa donde buscar la foto 

            // el texto del botón de “Agregar”a “Modificar”
            (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Modificar";

            //lamo a uan adpatacion dele liminar para que me borre el alien viejo
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();
            form.append('cadenaJson', JSON.stringify(objetoJson));  // le oaso la cadena
            form.append('caso', "eliminar");
            //Eliminará al alien del archivo (por AJAX) y del LocalStorage.
            xhr.open('POST', './BACKEND/administrar.php', true);    //y aca elimina
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log("Alien eliminado");
                }
            };

            localStorage.setItem("modificar", "true");  //guardamos en el local una variable que le avise a agregar que ahora queremos modificar los valores
        }

    }
}


//tsc --outfile Manejadora.js .\Alien.ts .\Ente.ts .\Manejadora.ts