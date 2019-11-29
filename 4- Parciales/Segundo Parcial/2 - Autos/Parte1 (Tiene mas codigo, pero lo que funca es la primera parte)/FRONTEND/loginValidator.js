$(document).ready(function () {
    $('#formLogin').bootstrapValidator({
        message: 'El valor no es valido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            correoLogin: {
                validators: {
                    notEmpty: {
                        message: 'El email es un campo requerido.'
                    },
                    emailAddress: {
                        message: 'Debe ser un formato válido'
                    }
                }
            },
            claveLogin: {
                validators: {
                    notEmpty: {
                        message: 'El clave no debe estar vacía.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe contener entre 4 y 8 caracteres.'
                    }
                }
            }
        }
    });

    $("#enviarLogin").off('click').click(function () {
        $('#formLogin').bootstrapValidator('revalidateField', 'correoLogin');
        $('#formLogin').bootstrapValidator('revalidateField', 'claveLogin');
    });
});
