/// <reference path="./node_modules/@types/jquery/index.d.ts" />

//CSS
$(document).ready(function(){

//funcion de login
    $("#btnLogin").click(function(){
        //toma los valores
        let mail = <string>$('#mail').val();
        let clave = <string>$('#clave').val();
        //genera form
        let formData = new FormData();

        //mando el formdata con la info al ajaxs del json
        formData.append('datos', '{"mail":"' + mail + '","clave":"' + clave + '"}');

        //se manda a la pagina de validar del post
        $.ajax({
            //manda por post
            type:'POST',
            //al metodo generado por nosotros en slim
            url: 'http://localhost/Selene/LOGIN/3/Validacion/',
            data: formData,
            dataType:"json",
            contentType:false,
            processData:false,

        }).done(function(obj){
        //si todo sale bien cambia el estilo de la etiqueta del login a exito
            console.log("Todo ok");
            $("#pExito").addClass("exito");
            $("#pExito").text("Se ha encontrado su usuarix");
            // $("#pExito").text(", redireccionando a listas!");
            // setTimeout(function(){
            //     window.location.href = "./index.php";
            // }, 3000);
        }).fail(function(error){
        //si todo sale bien cambia el estilo de la etiqueta del login a error
            console.log("Error! - ");
            console.log(error);
            if($("#pExito").attr("class") == "exito"){
                $("#pExito").removeClass("exito");
            }
            $("#pExito").addClass("error");
            $("#pExito").text("Usuarix incorrectx! Revise mail o clave");
        });
    }); 

//funcion de registro
    $('#btnRegistrar').click(function(){
        //toma los valores 
        let nombre : any = $("#nombre").val();
        let apellido : any = $("#apellido").val();
        let mail : any = $("#mail").val();
        let clave : any = $("#clave").val();
        let perfil : any = $("#perfil").val();
        let foto : any = $("#foto");

        //crea el form y lo llena con la info
        let fmData:FormData = new FormData();        
        fmData.append('nombre'  , nombre);
        fmData.append('apellido', apellido);
        fmData.append('mail'  , mail);
        fmData.append('clave'   , clave);
        fmData.append('perfil'  , perfil);
        fmData.append('foto', foto.prop("files")[0]);

        //manda por la ifno
        $.ajax({
            //por post
            type: 'POST',
            //a nuestro metodo generado por slim
            url: 'http://localhost/Selene/LOGIN/3/usuarix/',
            data: fmData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
        }).done(function(obj){
            alert("Se ha podido registrar usuarix correctamente");
            // window.location.href = "./index.php";
        })
        .fail(function(err){
            alert("ERROR!");
            console.log(err);
        })
    });

});

