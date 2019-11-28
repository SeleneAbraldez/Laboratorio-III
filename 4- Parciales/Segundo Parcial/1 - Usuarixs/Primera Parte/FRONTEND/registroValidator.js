// Los campos de entrada tendrán aplicados BOOTSTRAPVALIDATOR:
//  Apellido: La longitud máxima será de 15 caracteres.
//  Nombre: La longitud máxima será de 10 caracteres.
//  E-mail: Valida el formato de correo.
//  Legajo: Debe ser un número entero de entre 3 y 6 dígitos.
//  Foto: Sólo admitirá extensiones ‘jpg’ y ‘png’.
//  Clave: Admite longitudes de entre 4 y 8 caracteres. Debe coincidir con la confirmación de clave.
//  Confirmar: Admite longitudes de entre 4 y 8 caracteres. Debe coincidir con la clave.
$(document).ready(function () {
    $('#registroForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            apellido: {
                validators: {
                    notEmpty: {
                        message: 'El apellido es un campo requerido.'
                    },
                    stringLength: {
                        inclusive: true,
                        max: 15,
                        message: 'El apellido no debe exceder los 15 caracteres.'
                    }
                }
            },
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es un campo requerido.'
                    },
                    stringLength: {
                        inclusive: true,
                        max: 10,
                        message: 'El nombre no debe exceder los 10 caracteres.'
                    }
                }
            },
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El email es un campo requerido.'
                    },
                    emailAddress: {
                        message: 'El email no tiene un formato valido.'
                    },
                    // callback: {
                    //     message: 'Correo ya en uso',
                    //     callback: function (correo) {
                    //         var usuarixs = JSON.parse(localStorage.getItem('json'));
                    //         var retorno = true;
                        
                    //         for (var usu of usuarixs) {
                    //             if (usu['correo'] === correo) {
                    //                 retorno = false;
                    //                 break;
                    //             }
                    //         }
                    //         return retorno;
                    //     }
                    // }
                }
            },
            legajo: {
                validators: {
                    notEmpty: {
                        message: 'El legajo es un campo requerido.'
                    },
                    between: {
                        inclusive: true,
                        min: 100,
                        max: 999999,
                        message: 'El legajo debe tener entre 3 y 6 cifras.'
                    }
                }
            },
            foto: {
                validators: {
                    notEmpty: {
                        message: 'La foto es requerida.'
                    },
                    file: {
                        extension: 'jpeg,png,jpg',
                        type: 'image/jpeg,image/png,image/jpg',
                        message: 'El archivo seleccionado debe ser de extension jpg o png.'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La clave es un campo requerido.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres.'
                    },
                    identical: {
                        field: 'claveDuplicada',
                        message: 'La clave no coincide con la confirmacion.'
                    }
                }
            },
            claveDuplicada: {
                validators: {
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'clave',
                        message: 'La confirmacion debe coincidir con la clave.'
                    }
                }
            }
        }
    });

    $("#btnEnviar").off('click').click(function () {
        $('#registroForm').bootstrapValidator('revalidateField', 'nombre');
        $('#registroForm').bootstrapValidator('revalidateField', 'apellido');
        $('#registroForm').bootstrapValidator('revalidateField', 'mail');
        $('#registroForm').bootstrapValidator('revalidateField', 'legajo');
        $('#registroForm').bootstrapValidator('revalidateField', 'foto');
        $('#registroForm').bootstrapValidator('revalidateField', 'clave');
        $('#registroForm').bootstrapValidator('revalidateField', 'claveDuplicada');
    });
});