
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
            let perrito: any = perro.ToJson();
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
                        let objJson: JSON = arrayJson[i];
                        tabla += "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.EliminarAlien(" + (arrayJson[i]) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='RecuperatorioPrimerParcial.IParte2.ModificarAlien(" + (arrayJson[i]) + ")' value='Modificar'</td>";
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
            let perrito: any = perro.ToJson();
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

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let retJSON = JSON.parse(xhr.responseText);
                    console.log(retJSON);
                    if (localStorage.getItem("modificar") == "true") {
                        if (retJSON.ok) {
                            // Refrescar el listado solo si se pudo modificar,
                            Manejadora.MostrarPerrosBaseDatos();
                        } else {
                            console.log(retJSON.ok);
                            console.log(retJSON.viejaCadenaJSON);
                            console.log(retJSON.CadenaJSON);
                            // caso contrario, informar (por alert y consola) lo acontecido.
                            alert("No se pudo modificar!");
                            console.log("No se pudo modificar!");
                        }
                        (<HTMLInputElement>document.getElementById("btnAgregarBd")).value = "Agregar BD";   //devolvemos el boton
                        (<HTMLInputElement>document.getElementById("nombre")).readOnly = false;
                        localStorage.clear();   //limpiamos el storage para que no interfiera   
                        Manejadora.LimpiarCampos(); //limpiamos todos los campos
                    } else {
                        if (retJSON.ok) {
                            console.info("Todo ok");
                            console.log(retJSON.pathFoto);
                            let path: string = "./BACKEND/fotos/" + retJSON.pathFoto;
                            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                            console.log(path);
                        } else {
                            console.error("Se produjio un error");
                        }
                    }
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
                    tabla += "<th colspan='2'>Acciones</th>";
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
                            if (arrayJson[i].pathFoto.indexOf("modificada") == -1) {
                                img.src = "./BACKEND/fotos/" + path;
                                tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                            } else {
                                img.src = "./BACKEND/fotos_modificadas/" + path;
                                tabla += "<img src='./BACKEND/fotos_modificadas/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>"; //si es de las fotos modoficadas, debe buscar en modificada
                            }
                        } else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        // Agregar una columna (Acciones) al listado de aliens que permita: 
                        // Eliminar y Modificar al alien elegido. Para ello, 
                        // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // EliminarAlien y ModificarAlien, respectivamente.
                        let objJson: string = JSON.stringify(arrayJson[i]); //hay que pasarlo como stringgufy porque si no se pierde el obj
                        tabla += "<td><input type='button' onclick='new PrimerParcial.Manejadora().EliminarPerro(" + objJson + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='new PrimerParcial.Manejadora().ModificarPerro(" + objJson + ")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    (<HTMLInputElement>document.getElementById("divTabla")).innerHTML = tabla;
                }
            };
        }

        //I2
        // Eliminará al perro de la base de datos (por AJAX). Recibe como parámetro al objeto JSON que se ha de eliminar.
        public EliminarPerro(cadenaJson: any) {
            // Pedir confirmación, mostrando nombre y raza, antes de eliminar. 
            if (confirm("Esta seguro que desea eliminar al perro " + cadenaJson.nombre + " y raza " + cadenaJson.raza + "?")) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                let form: FormData = new FormData();

                //le paso la cadena al eliminar
                form.append('cadenaJson', JSON.stringify(cadenaJson));
                xhr.open('POST', './BACKEND/eliminar_bd.php', true);
                xhr.setRequestHeader("enctype", "multipart/form-data");
                xhr.send(form);

                //si todo salio bien
                xhr.onreadystatechange = () => {
                    let retJSON = JSON.parse(xhr.responseText);
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        if (retJSON.ok) {
                            console.info("Perro eliminado");
                            (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/huella_default.png";
                            // Refrescar el listado para visualizar los cambios.
                            Manejadora.MostrarPerrosBaseDatos();
                        } else {
                            console.error("No se ha podido eliminar perro " + cadenaJson.nombre);
                        }
                    }
                };
            } else {
                alert("Accion eliminar cancelada");
            }
        }


        public ModificarPerro(cadenaJson: any) {
            // Mostrará todos los datos del perro que recibe por parámetro (objeto JSON), en el formulario
            (<HTMLInputElement>document.getElementById("tamaño")).value = cadenaJson.tamanio;
            (<HTMLInputElement>document.getElementById("edad")).value = cadenaJson.edad;
            (<HTMLInputElement>document.getElementById("precio")).value = cadenaJson.precio;
            // Permitirá modificar cualquier campo, a excepción del nombre, dejarlo como de solo lectura.
            (<HTMLInputElement>document.getElementById("nombre")).value = cadenaJson.nombre;
            (<HTMLInputElement>document.getElementById("nombre")).readOnly = true;
            (<HTMLSelectElement>document.getElementById("raza")).value = cadenaJson.raza;

            let path: string = "";

            //  incluida la foto.
            if (cadenaJson.pathFoto.indexOf("modificada") == -1) {  //se fija dentro del nombre de la foto si es de las modificadas
                path = "./BACKEND/fotos/" + cadenaJson.pathFoto;    //si esta en la carpeta de fotos modificadas
            } else {  //o si esta en la carpeta de fotos
                path = "./BACKEND/fotos_modificadas/" + cadenaJson.pathFoto;
            }
            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //hay que cambiar el "src" para que sepa donde buscar la foto 

            // texto del botón de “Agregar” a “Modificar”, según corresponda.
            (<HTMLInputElement>document.getElementById("btnAgregarBd")).value = "Modificar BD";

            localStorage.setItem("modificar", "true");
            localStorage.setItem("viejoModi", JSON.stringify(cadenaJson));  //le paso el viejo a modificar
        }


        public ObtenerPerrosPorTamaño() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();

            // Recupera de la base de datos todos los perros 
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let auxContador: Array<number> = new Array<number>();
                    let auxJson = JSON.parse(xhr.responseText);
                    for (let perro of auxJson) {
                        if (auxContador[perro.tamanio] === undefined) {
                            auxContador[perro.tamanio] = 0;
                        }
                        auxContador[perro.tamanio]++;
                    }
                    let auxMax: any = undefined;
                    let auxMin: any = undefined;

                    for (let tamanio1 in auxContador) {
                        if (auxMax === undefined && auxMin === undefined) {
                            auxMax = auxContador[tamanio1];
                            auxMin = auxContador[tamanio1];
                        }

                        let cantMascotas = auxContador[tamanio1];

                        if (auxMax < cantMascotas) {
                            auxMax = cantMascotas;
                        }
                        if (auxMin > cantMascotas) {
                            auxMin = cantMascotas;
                        }
                    }

                    let tamaniosMax = new Array<string>();
                    let tamaniosMin = new Array<string>();

                    for (let tamanio in auxContador) {
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
                    let mensaje: string = "Tamaño/s con mas perros ";
                    if (tamaniosMax.length > 0) {
                        for (let tamanio of tamaniosMax) {
                            mensaje += "\n-" + tamanio;
                        }
                        mensaje += "\nCon " + auxMax;
                        console.log(mensaje);
                    }

                    if (tamaniosMin.length > 0) {
                        mensaje = "Tamaño/s con menos perros ";
                        for (let tamanio of tamaniosMin) {
                            mensaje += "\n-" + tamanio;
                        }
                        mensaje += "\nCon " + auxMin;
                        console.log(mensaje);
                    }
                };
            }
        }



        //hago funcion para limpiar campòs
        public static LimpiarCampos() {
            (<HTMLInputElement>document.getElementById("tamaño")).value = "";
            (<HTMLInputElement>document.getElementById("edad")).value = "";
            (<HTMLInputElement>document.getElementById("precio")).value = "";
            (<HTMLInputElement>document.getElementById("nombre")).value = "";
            let path: string = "./BACKEND/fotos/huella_default.png";
            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;
        }
    }



}