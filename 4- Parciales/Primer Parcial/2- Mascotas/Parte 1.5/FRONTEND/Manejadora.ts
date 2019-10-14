
///<reference path="Perro.ts"/>
namespace PrimerParcial {

    export interface IParte2 {
        EliminarPerro(cadenaJson: any);
        ModificarPerro(cadenaJson: any);
        ObtenerPerrosPorTamaño();

    }

    export class Manejadora implements IParte2 {

        public static AgregarPerroJSON() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            //Tomará los distintos valores desde la página index.html (
            let tamaño: string = (<HTMLInputElement>document.getElementById("tamaño")).value;
            let edad: string = (<HTMLInputElement>document.getElementById("edad")).value;
            let precio: string = (<HTMLInputElement>document.getElementById("precio")).value;

            let nombre: string = (<HTMLInputElement>document.getElementById("nombre")).value;
            let raza: string = (<HTMLSelectElement>document.getElementById("raza")).value;

            //(incluida la foto)
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            let path: string = (<HTMLInputElement>document.getElementById("foto")).value;
            console.log(path);
            let pathFoto: string = (path.split('\\'))[2]; //recupero el path porque lo necesito para el nuevo obj
            
            console.log(pathFoto);

            // creará un objeto de tipo Perro
            let perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);

            let form: FormData = new FormData();
            form.append('foto', foto.files[0]);
            let perrito : any = perro.ToJson();
            perrito = JSON.stringify(perrito);
            form.append('cadenaJson', perrito);

            // enviará (por AJAX) hacia “./BACKEND/agregar_json.php”.
            xhr.open('POST', './BACKEND/agregar_json.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    let retJSON = JSON.parse(xhr.responseText);
                    if (retJSON.ok) {
                        console.info("Todo ok");
                        console.log(retJSON.pathFoto);
                        let path: string = "./BACKEND/fotos/" + retJSON.pathFoto;   //llamamos al path llamado nuevo porque ahora ya no es el nombre subido, es el nombre cambiado
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        console.log(path);
                    } else {
                        console.error("Se produjio un error");
                    }
                }
            };
        }


        public static MostrarPerrosJSON() {
            // (por AJAX)
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();

            let auxManejadora = new Manejadora();

            // desde “./BACKEND/traer_json.php”,
            xhr.open('POST', './BACKEND/traer_json.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // todos los perros del archivo .json y generará un listado dinámico (en el FRONTEND)
                    let arrayJson = JSON.parse(xhr.responseText);

                    let tabla: string = "";
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

                    for (let i = 0; i < arrayJson.length; i++) {
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
                        let path: string = arrayJson[i].pathFoto;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            img.src = "./BACKEND/fotos/" + path;
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        } else {
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
                    (<HTMLInputElement>document.getElementById("divTabla")).innerHTML = tabla;
                }
            };
        }


        public static AgregarPerroEnBaseDatos() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            // Tomará los distintos valores desde la página index.html
            let tamaño: string = (<HTMLInputElement>document.getElementById("tamaño")).value;
            let edad: string = (<HTMLInputElement>document.getElementById("edad")).value;
            let precio: string = (<HTMLInputElement>document.getElementById("precio")).value;

            let nombre: string = (<HTMLInputElement>document.getElementById("nombre")).value;
            let raza: string = (<HTMLSelectElement>document.getElementById("raza")).value;
            // (incluida la foto)
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            let path: string = (<HTMLInputElement>document.getElementById("foto")).value;
            let pathFoto: string = (path.split('\\'))[2];

            // creará un objeto de tipo Perro
            let perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);

            // que se enviará (por AJAX) hacia “./BACKEND/agregar_bd.php”.
            let direccion: string = './BACKEND/agregar_bd.php';

            let form: FormData = new FormData();

            form.append('foto', foto.files[0]);
            let perrito : any = perro.ToJson();
            perrito = JSON.stringify(perrito);
            form.append('cadenaJson', perrito);

            // if (localStorage.getItem("modificar") == "true") {
            //     direccion = './BACKEND/modificar_bd.php';
            // }

            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let retJSON = JSON.parse(xhr.responseText);
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
                        let path: string = "./BACKEND/fotos/" + retJSON.pathFoto;
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                        console.log(path);
                    } else {
                        console.error("Se produjio un error");
                    }
                    // }
                }
            };

        }


        public static VerificarExistencia() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            //recibo los parametros a verificar
            let edad: string = (<HTMLInputElement>document.getElementById("edad")).value;
            let raza: string = (<HTMLSelectElement>document.getElementById("raza")).value;

            let form: FormData = new FormData();

            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let bandera: boolean = false;
                    let arrayJson = JSON.parse(xhr.responseText);
                    console.log(arrayJson);
                    //comparará las edades y la raza de los perros guardados.
                    for (let i = 0; i < arrayJson.length; i++) {
                        if (arrayJson[i].raza == raza && (arrayJson[i].edad).toString() == edad) {
                            bandera = true;
                            break;
                        }
                    }
                    // Si el perro existe, se mostrará (por consola y alert) lo acontecido.
                    if (bandera == true) {
                        console.log("El perro ya existe");
                        alert("El perro ya existe");
                    } else {    //Caso contrario, agregará el nuevo perro.
                        Manejadora.AgregarPerroEnBaseDatos();
                    }
                }
            };
        }


        public static MostrarPerrosBaseDatos() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();

            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let arrayJson = JSON.parse(xhr.responseText);

                    let tabla: string = "";
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

                    for (let i = 0; i < arrayJson.length; i++) {
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
                        let path: string = arrayJson[i].pathFoto;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            img.src = "./BACKEND/fotos/" + path;
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        } else {
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
                    (<HTMLInputElement>document.getElementById("divTabla")).innerHTML = tabla;
                }
            };
        }





        public ObtenerPerrosPorTamaño() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            let form: FormData = new FormData();

            form.append('op', "traer");


            xhr.open('POST', './BACKEND/traer_bd.php', true);

            xhr.setRequestHeader("enctype", "multipart/form-data");

            xhr.send(form);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) {
                    //recupero la cadena y convierto a array de json
                    let arrayJson = JSON.parse(xhr.responseText);
                    let arrayTamaños = [];
                    for (let i = 0; i < arrayJson.length; i++) {

                    }

                };
            }
        }

        public ModificarPerro(cadenaJson: any) {
            (<HTMLInputElement>document.getElementById("tamaño")).value = cadenaJson.tamanio;
            (<HTMLInputElement>document.getElementById("edad")).value = cadenaJson.edad;
            (<HTMLInputElement>document.getElementById("precio")).value = cadenaJson.precio;
            (<HTMLInputElement>document.getElementById("precio")).disabled = true;
            (<HTMLInputElement>document.getElementById("nombre")).value = cadenaJson.nombre;
            (<HTMLSelectElement>document.getElementById("raza")).value = cadenaJson.raza;

            let path: string = "";

            if (cadenaJson.pathFoto.indexOf("MODIFICADA") == -1) {
                path = "./BACKEND/fotos/" + cadenaJson.pathFoto;
            }
            else {
                path = "./BACKEND/fotos_modificadas/" + cadenaJson.pathFoto;
            }

            //hay que cambiar el "src" para que sepa donde buscar la foto 
            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;

            (<HTMLInputElement>document.getElementById("btnAgregarBd")).value = "Modificar BD";
            //(<HTMLInputElement> document.getElementById("btn")).className="btn btn-warning";

            localStorage.setItem("modificar", "true");
        }
        //metodo de la interfaz
        public EliminarPerro(cadenaJson: any) {
            if (confirm("Esta seguro que desea eliminar al perro de nombre " + cadenaJson.nombre + " y raza " + cadenaJson.raza)) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();

                let form: FormData = new FormData();

                form.append('cadenaJson', JSON.stringify(cadenaJson));

                form.append('op', "eliminar_bd");

                xhr.open('POST', './BACKEND/eliminar_bd.php', true);

                xhr.setRequestHeader("enctype", "multipart/form-data");

                xhr.send(form);

                xhr.onreadystatechange = () => {

                    if (xhr.readyState == 4 && xhr.status == 200) {
                        //alert(xhr.responseText);
                        console.log("perro eliminado");
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/huella_default.png";
                        Manejadora.MostrarPerrosBaseDatos();

                    }
                };
            }
            else {
                alert("Accion cancelada");
            }


        }












        public static LimpiarCampos() {
            (<HTMLInputElement>document.getElementById("tamaño")).value = "";
            (<HTMLInputElement>document.getElementById("edad")).value = "";
            (<HTMLInputElement>document.getElementById("precio")).value = "";
            (<HTMLInputElement>document.getElementById("nombre")).value = "";
            //direccion de donde se encuentra la foto
            let path: string = "./BACKEND/fotos/huella_default.png";
            //hay que cambiar el "src" para que sepa donde buscar la foto 
            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;

        }


    }

}