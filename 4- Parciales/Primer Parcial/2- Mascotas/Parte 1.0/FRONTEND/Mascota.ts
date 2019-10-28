namespace Entidades {
    export class Mascota {
        //atributos
        public tamanio: string;
        public edad: number;
        public precio: number;

        //constructor
        public constructor(tamaño: string, edad: number, precio: number) {
            this.tamanio = tamaño;
            this.edad = edad;
            this.precio = precio;
        }

        // ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse
            // con el método ToJSON, de la clase perro, forme un JSON válido).
        public ToString(): string {
            return `{"tamanio":"${this.tamanio}","edad":"${this.edad}","precio":"${this.precio}",`;
        }
    }
}