$(document).ready(function(){

    // $('#btnRegistrar').click(function(){
    //     cargarBV2();
    // });
    $('#formRegistro').bootstrapValidator({
        message:'El valor no es valido',
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            apellido:{
                validators:{
                    notEmpty:{
                        message:'Este es un campo requerido.'
                    },
                    stringLength: {
                        min: 1,
                        max: 15,
                        message:'El apellido no debe exceder los 15 caracteres.'
                    }
                    
                }
            },
            nombre:{
                validators:{
                    notEmpty:{
                        message:'Este es un campo requerido.'
                    },
                    stringLength: {
                        max: 10,
                        message: 'El nombre no debe exceder los 10 caracteres.'
                    }
                    
                }
            },
            correo:{
                validators:{
                    notEmpty:{
                        message:'Este es un campo requerido.'
                    },
                    emailAddress:{
                        message:'Debe ser un formato válido'
                    },
                    // callback:{
                    //     message:'El email ya existe.',
                    //     callback:function(valor){
                    //         let retorno=false;
                    //         $.ajax({
                    //             type:'POST',
                    //             url:'./BACKEND/verificar/',
                    //             data: {
                    //                 'correo' : valor
                    //             },
                    //             async: false,
                    //             dataType: "json",
                    //             success: function (xhr) {
                    //                 if(xhr.Exito){
                    //                     retorno=false;
                    //                 }else{
                    //                     retorno=true;
                    //                 }
                    //             }
                    //         });
                    //         return retorno;
                    //     }
                    // }
                }
            },
            perfil:{
                validators:{
                    callback:{
                        message:"Debe elegir un perfil.",
                        callback:function(perfil){
                            if(perfil==='seleccione'){
                                return false;
                            }
                            return true;
                        }
                    }                    
                }
            },
            foto:{
                validators:{
                    notEmpty: {
                        message:'Debe elegir una foto.'
                    },
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png',
                        message: 'Solo se admiten extenciones PNG y JPG.'
                    }                
                }
            },
            clave:{
                validators:{
                    notEmpty:{
                        message:'Este es un campo requerido.'
                    },
                    identical: {
                        field: 'confirmar',
                        message:'La clave y su confirmacion no coinciden.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message:'Se admiten entre 4 y 8 caracteres.'
                    }
                    
                }
            },
            confirmar:{
                validators:{
                    notEmpty:{
                        message:'Este es un campo requerido.'
                    },
                    identical: {
                        field: 'clave',
                        message:'La clave y su confirmacion no coinciden.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message:'Se admiten entre 4 y 8 caracteres.'
                    }
                }
            },

        }

    })

    $("#enviarRegistro").off('click').click(function () {
        $('#formRegistro').bootstrapValidator('revalidateField', 'nombre');
        $('#formRegistro').bootstrapValidator('revalidateField', 'apellido');
        $('#formRegistro').bootstrapValidator('revalidateField', 'correo');
        $('#formRegistro').bootstrapValidator('revalidateField', 'perfil');
        $('#formRegistro').bootstrapValidator('revalidateField', 'foto');
        $('#formRegistro').bootstrapValidator('revalidateField', 'clave');
        $('#formRegistro').bootstrapValidator('revalidateField', 'confirmar');
    });

});


// function cargarBV2(){
    // .on('success.form.bv', function (e) {
    //     e.preventDefault();
    // });

// }