//hereda de Ente
///<reference path="Ente.ts"/>

namespace Entidades {
    export class Alien extends Ente {

        //atributos
        public raza: string;
        public planetaOrigen: string;
        public pathFoto: string;

        //cosntructor
        public constructor(cuadrante: string, edad: number, altura: number, raza: string, planeta: string, path: string) {
            super(cuadrante, edad, altura); //inic contructor super de ente
            this.raza = raza;
            this.planetaOrigen = planeta;
            this.pathFoto = path;
        }

        //ToJSON():JSON, que retornará la representación del objeto en formato JSON. 
            //Se debe de reutilizar el método ToString de la clase Ente.
        public ToJSON(): any {
            let retornoJson = `${super.ToString()}"raza":"${this.raza}","planetaOrigen":"${this.planetaOrigen}","pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(retornoJson);
        }
    }
}