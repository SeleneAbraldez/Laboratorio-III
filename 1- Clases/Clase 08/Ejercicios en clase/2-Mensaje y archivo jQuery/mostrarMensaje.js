/// <reference path="node_modules/@types/jquery/index.d.ts"/>
//1
// function MostrarMensaje(){
//     var mensaje = $("#mensaje").val();
//     mensaje = mensaje.toString();
//     $("#div_mensaje").html(mensaje);
// }
//2
// function MostrarMensaje() {
//     var mensaje = $("#mensaje").val();
//     mensaje = mensaje.toString();
//     let formData: FormData = new FormData();
//     formData.append("mensaje", mensaje);
//     //aca, se mansa por ajaxs al test php, el cual va a devolver el retorno como json para ser usado mas adelante
//     $.ajax({
//         type: 'POST',
//         url: "test.php",
//         dataType: "json",
//         cache: false,
//         contentType: false,
//         processData: false,
//         data: formData,
//         async: true
//     })
//     .done(function (objJson) {
//         //si esta todo bien devuelvo el mensaje y la fecha
//         $("#div_mensaje").html(objJson.mensaje + " - " + objJson.fecha);
//     })
//     .fail(function (error) {
//         //si hay algun tipo de error aca salta
//         alert(error);
//     }); 
// }
//3
function MostrarMensaje() {
    //le apso el valor del mensaje y lo apso a string
    var mensaje = $("#mensaje").val();
    mensaje = mensaje.toString();
    //le apso el valor del archivo
    // var archivo: any = $("#archivo");
    var archivo = document.getElementById("archivo");
    //archivo.prop("files")[0];
    //genero un form en donde mando el mensaje y elk archivo
    var formData = new FormData();
    formData.append("mensaje", mensaje);
    formData.append("archivo", archivo.files[0]);
    //aca, se mansa por ajaxs al test php, el cual va a devolver el retorno como json para ser usado mas adelante
    $.ajax({
        type: 'POST',
        url: "test.php",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        async: true
    })
        .done(function (objJson) {
        //si esta todo bien devuelvo el mensaje, la fecha y el path
        $("#div_mensaje").html(objJson.mensaje + " - " + objJson.fecha + " - " + objJson.path);
        $("#imgFoto").attr("src", objJson.path);
        $("#imgFoto").attr("style", "visibility: visible");
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}
