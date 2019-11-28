// Los campos de entrada tendrán aplicadas BOOTSTRAPVALIDATOR, a saber:
//  E-mail: Valida el formato de correo. Es un campo requerido.
//  Clave: Admite longitudes de entre 4 y 8 caracteres. Es un campo requerido.
// Mostrar los mensajes de error correspondiente.
$(document).ready(function () {
    $('#loginForm').bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El email es un campo requerido.'
                    },
                    emailAddress: {
                        message: 'El email no tiene un formato valido.'
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
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    }
                }
            }
        }
    });
 
    $("#btnEnviar").off('click').click(function () {
        $('#loginForm').bootstrapValidator('revalidateField', 'mail');
        $('#loginForm').bootstrapValidator('revalidateField', 'clave');
    });
});