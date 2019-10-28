/// <reference path="./producto.ts" />
/// <reference path="./televisor.ts" />
namespace PrimerParcial {
    export class Manejadora {

        public static AgregarTelevisor() {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            //Tomará los distintos valores desde la página index.html
            let codigo: string = (<HTMLInputElement>document.getElementById("codigo")).value;
            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let precio: string = (<HTMLInputElement>document.getElementById("precio")).value;

            let tipo: string = (<HTMLInputElement>document.getElementById("tipo")).value;
            let pais: string = (<HTMLSelectElement>document.getElementById("pais")).value;
            //(incluida la foto)
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            console.log(foto);
            let path: string = (<HTMLInputElement>document.getElementById("foto")).value;
            console.log(path);
            let pathFoto: string = (path.split('\\'))[2];   //recupero el path porque lo necesito para el nuevo alien
            console.log(pathFoto);

            //objeto de tipo Televisor
            let tele = new Entidades.Televisor(parseInt(codigo), marca, parseFloat(precio), tipo, pais, pathFoto);

            let form: FormData = new FormData();

            form.append('foto', foto.files[0]);
            form.append('cadenaJson', JSON.stringify(tele.ToJSON()));
            if (localStorage.getItem("modificar") == "true") {
                console.log("MODIFICAR");
                form.append('caso', 'modificar');
            } else {
                console.log("AGREGAR");
                form.append('caso', 'agregar');
            }

            //hacia “./BACKEND/adminstrar.php”.
            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form); //dentro de esta se guarda el json de televs y se guarda la imagen

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    let retJSON = JSON.parse(xhr.responseText);
                    if (localStorage.getItem("modificar") == "true") {
                        console.log("MODIFICAR");
                        if (retJSON.TodoOK) {
                            console.info("Todo ok");
                            let path: string = "./BACKEND/fotos/" + pathFoto;
                            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;
                            Manejadora.MostrarTelevisores();
                            localStorage.clear();
                            (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Agregar";
                            (<HTMLInputElement>document.getElementById("codigo")).value = "";
                            (<HTMLInputElement>document.getElementById("codigo")).readOnly = false;
                            (<HTMLInputElement>document.getElementById("marca")).value = "";
                            (<HTMLInputElement>document.getElementById("precio")).value = "";
                            (<HTMLInputElement>document.getElementById("tipo")).value = "";
                            (<HTMLInputElement>document.getElementById("pais")).value = "";
                        } else {
                            console.error("Se produjio un error - No se pudo modificar");
                        }
                    } else {
                        if (retJSON.TodoOK) {
                            console.info("Todo ok");
                            let path: string = "./BACKEND/fotos/" + pathFoto;
                            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //cambiamos src porque ahora busca la foto nueva ahi, pisando la vieja
                            //console.log(path);
                        } else {
                            console.error("Se produjio un error - No se pudo agregar");
                        }
                    }
                }
            }
        };



        public static MostrarTelevisores() {
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
                    // Recuperará  todos los televs del archivo .json y generará un listado dinámico 
                    let arrayJson = JSON.parse(xhr.responseText);

                    let tabla: string = "";
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

                    for (let i = 0; i < arrayJson.length; i++) {
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
                        let path: string = arrayJson[i].pathFoto;
                        if (arrayJson[i].pathFoto !== "undefined") {
                            img.src = "./BACKEND/fotos/" + path;
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        } else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        // Agregar una columna (Acciones) al listado de televisores que permita: 
                        // Eliminar y Modificar al televisor elegido. Para ello, 
                        // agregue dos botones (input [type=button]) que invoquen a las funciones 
                        // EliminarTelevisor y ModificarTelevisor, respectivamente.
                        console.log(arrayJson[i]);
                        let objJson: string = JSON.stringify(arrayJson[i]); //hay que pasarlo como stringgufy porque si no se pierde el obj
                        tabla += "<td colspan='2'><input type='button' onclick='new PrimerParcial.Manejadora().EliminarTelevisor(" + objJson + ")' value='Eliminar'</td>";
                        tabla += "<input type='button' onclick='new PrimerParcial.Manejadora().ModificarAlien(" + objJson + ")' value='Modificar'";
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
            // todos los televisores del archivo .json
            //(caso=”traer”)
            form.append('caso', "traer");

            xhr.open('POST', './BACKEND/administrar.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //los guarda en el LocalStorage, con la clave "televisores_local_storage".
                    localStorage.setItem("televisores_local_storage", xhr.responseText);
                    console.log("storage ok");
                }
            };
        }

        public static VerificarExistencia() {
            let codigo: string = (<HTMLInputElement>document.getElementById("codigo")).value;
            let localSto = localStorage.getItem("televisores_local_storage");

            let existe = false;

            if (localSto != null) { //me fijo si no viene vacio
                let lsJson: any = JSON.parse(localSto);
                //comparará los códigos de los televisores guardados en el LocalStorage.
                for (let i = 0; i < lsJson.length; i++) {
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
                } else {
                    //Caso contrario, agregará el nuevo televisor y se actualizará el LocalStorage
                    Manejadora.AgregarTelevisor();
                    Manejadora.GuardarEnLocalStorage();
                }
            } else {
                alert("Storage vacio");
                console.log("Storage vacio");
            }
        }

        //parte 2

        public EliminarTelevisor(objetoJson: any) {
            console.log(objetoJson);
            //Pedir confirmación, mostrando codigo y tipo, antes de eliminar.
            if (confirm("¿Desea eliminar televisor de codigo " + objetoJson.codigo + " y tipo " + objetoJson.tipo + "?")) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                let form: FormData = new FormData();

                form.append('cadenaJson', JSON.stringify(objetoJson));  // le oaso la cadena
                //(caso=eliminar)
                form.append('caso', "eliminar");

                xhr.open('POST', './BACKEND/administrar.php', true);    //y aca elimina
                xhr.setRequestHeader("enctype", "multipart/form-data");
                xhr.send(form);

                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        //alert(xhr.responseText);
                        console.log("Televisor eliminado");
                        (<HTMLImageElement>document.getElementById("imgFoto")).src = "./BACKEND/fotos/tv_defecto.jpg";
                        //Refrescar el listado para visualizar los cambios.
                        Manejadora.MostrarTelevisores();
                        Manejadora.GuardarEnLocalStorage();
                    }
                };
            } else {
                alert("Accion cancelada");
            }
        }



        public ModificarAlien(objetoJson: any) {
            // Mostrará todos los datos del alien que recibe por parámetro (objeto JSON) en el formulario
            (<HTMLInputElement>document.getElementById("codigo")).value = objetoJson.codigo;
            // excepción del codigo, dejarlo como de solo lectura.
            (<HTMLInputElement>document.getElementById("codigo")).readOnly = true;
            (<HTMLInputElement>document.getElementById("marca")).value = objetoJson.marca;
            (<HTMLInputElement>document.getElementById("precio")).value = objetoJson.precio;
            (<HTMLInputElement>document.getElementById("tipo")).value = objetoJson.tipo;
            (<HTMLInputElement>document.getElementById("pais")).value = objetoJson.pais;

            //incluida la foto
            let path: string = "./BACKEND/fotos/" + objetoJson.pathFoto;
            (<HTMLImageElement>document.getElementById("imgFoto")).src = path;  //hay que cambiar el "src" para que sepa donde buscar la foto 

            // el texto del botón de “Agregar”a “Modificar”
            (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Modificar";

            //lamo a uan adpatacion dele liminar para que me borre el televisor viejo
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let form: FormData = new FormData();
            form.append('cadenaJson', JSON.stringify(objetoJson));  // le oaso la cadena
            form.append('caso', "eliminar");
            //Eliminará al televisor del archivo (por AJAX) y del LocalStorage.
            xhr.open('POST', './BACKEND/administrar.php', true);    //y aca elimina
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log("Parte 1 ok");
                }
            };
            localStorage.setItem("modificar", "true");  //guardamos en el local una variable que le avise a agregar que ahora queremos modificar los valores
        }

















    }
}

//tsc --init
//tsc --outfile Manejadora.js televisor.ts producto.ts manejadora.ts