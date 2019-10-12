
///<reference path="./Alien.ts"/>

namespace RecuperatorioPrimerParcial {
    export class Manejadora {
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
            form.append('caso', 'agregar');

            //que se enviará (por AJAX) hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de aliens y se guarda la imagen

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //console.log(xhr.responseText);
                    let retJSON = JSON.parse(xhr.responseText);
                    if (retJSON.ok) {
                        console.info("Todo ok");
                        let path: string = "./BACKEND/fotos/" + pathFoto;
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        console.log(path);
                    } else {
                        console.error("Se produjio un error");
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
                    tabla += "<table border=1> <thead>";
                    tabla += "<tr>";
                    tabla += "<td>Cuadrante</td>";
                    tabla += "<td>Edad</td>";
                    tabla += "<td>Altura</td>";
                    tabla += "<td>Raza</td>";
                    tabla += "<td>Planeta</td>";
                    tabla += "<td>Foto</td>";
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
                        img.src = "./BACKEND/fotos/" + path;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        } else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        tabla += "</tr>";

                    }
                    tabla += "</table>";
                    (<HTMLInputElement>document.getElementById("divTabla")).innerHTML = tabla;
                }
            };
        }


        public static GuardarEnLocalStorage() {
            //Recuperará (por AJAX)
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

            if(localSto != null){ //me fijo si no viene vacio
                let lsJson:any= JSON.parse(localSto);
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
            }else{
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
            }else{
                console.log("storage vacio");
            }
        }

        // /*
        // EliminarAlien. Eliminará al alien del archivo (por AJAX) y del LocalStorage. Recibe como parámetro al objeto
        // JSON que se ha de eliminar. Pedir confirmación, mostrando cuadrante y raza, antes de eliminar. Refrescar el
        // listado para visualizar los cambios.
        // */
        // public static EliminarAlien(cadenaJson: any) {

        //     if (confirm("Esta seguro que desea eliminar al ovni de cuadrante " + cadenaJson.cuadrante + " y raza " + cadenaJson.raza)) {
        //         let xhr: XMLHttpRequest = new XMLHttpRequest();

        //         let form: FormData = new FormData();

        //         form.append('cadenaJson', JSON.stringify(cadenaJson));

        //         form.append('caso', "eliminar");

        //         xhr.open('POST', './BACKEND/administrar.php', true);

        //         xhr.setRequestHeader("enctype", "multipart/form-data");

        //         xhr.send(form);

        //         xhr.onreadystatechange = () => {

        //             if (xhr.readyState == 4 && xhr.status == 200) {
        //                 //alert(xhr.responseText);
        //                 console.log("alien eliminado");
        //                 (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/alien_defecto.jpg";
        //                 Manejadora.MostrarAliens();

        //             }
        //         };
        //     }
        //     else {
        //         alert("Accion cancelada");
        //     }

        // }

        // public static ModificarAlien(cadenaJson: any) {


        // }

    }
}