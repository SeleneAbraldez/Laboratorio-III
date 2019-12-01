/// <reference path="./libs/jquery/index.d.ts" />

$(document).ready(function(){
    manejador.Login.Verificar();

    $('#limpiar').click(function(event){
        $('#alertRegister').hide();
        $('#alertLogin').hide();
        $("#formLogin").data('bootstrapValidator').resetForm();
        $("#formRegistro").data('bootstrapValidator').resetForm();
    })
});

namespace manejador{
    export class Login{

        public static  Verificar(){
            
            $("#enviarLogin").click(function (event) {
                event.preventDefault();
                let correo=<string>$("#correoLogin").val();
                let clave=<string>$("#claveLogin").val();
                let fm=new FormData();
                let json='{"correo":"' + correo + '","clave":"' + clave + '"}';
                fm.append("datos",json);
                
                
                $.ajax({
                    method:"POST",
                    url:"./backend/login/",
                    data:fm,
                    contentType: false,
                    processData: false,
                    dataType:"json",
                    success:function(xhr){
                        if(xhr.Exito){
                            localStorage.setItem('token',xhr.jwt);
                            window.location.replace("./principal.html");
                        }
                    },
                    
                }).fail(function(xhr){
                    let correo=<string>$("#correoLogin").val();
                    let clave=<string>$("#claveLogin").val();
                    if(correo == "" || clave == ""){

                    }else{
                        $('#alertLogin').text('ERROR - Usuarix o contraseña no correctas.');
                        $('#alertLogin').show();
                    }
                });
            });

        }

        public static Limpiar(){
        (<HTMLInputElement>document.getElementById('correoLogin')).value = "";
        (<HTMLInputElement>document.getElementById('claveLogin')).value = "";
        $('#alertLogin').hide();
        }
    }
    
}

