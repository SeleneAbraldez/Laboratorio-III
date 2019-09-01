var nombre : string = "Selene";
var apellido : string  = "Abraldez";

function MostrarNombreApellido(nombre : string, apellido : string) : void
{
    console.log(nombre.toUpperCase() + ", " + apellido.charAt(0).toUpperCase() + apellido.slice(1));
    //toUpperCase hace que todo sea mayuscula
    //charAt(0) selecciona solo el primer caracter, lo que apliques a eso lo estarias aplicando a solo eso
    //slice hace que lo 'rebanes', sacandole hasta donde indiques
}

MostrarNombreApellido(nombre, apellido);