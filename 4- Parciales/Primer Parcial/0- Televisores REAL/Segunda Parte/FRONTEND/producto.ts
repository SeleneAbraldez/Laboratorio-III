namespace Entidades {

    export class Producto {

        //atributos
        codigo: number;
        marca: string;
        precio: number;

        //cosntructor que reciba los tres
        public constructor(codigo: number, marca: string, precio: number) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }

        //ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse con el método ToJSON, forme
        //una cadena JSON válida
        public ToString(): string {
            return ('"codigo":' + this.codigo + ',"marca":"' + this.marca + '","precio":"' + this.precio + '",');
        }

    }
    
}