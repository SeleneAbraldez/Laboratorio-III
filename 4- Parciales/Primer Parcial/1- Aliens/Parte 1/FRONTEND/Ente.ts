namespace Entidades {
    export class Ente {
        //atributos
        public cuadrante: string;
        public edad: number;
        public altura: number;

        //constructor
        public constructor(cuadrante: string, edad: number, altura: number) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }

        //ToString():string, que retorne la representación de la clase en formato cadena (
            //preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
        public ToString(): string {
            return `{"cuadrante":"${this.cuadrante}","edad":"${this.edad}","altura":"${this.altura}",`;
        }
    }
}