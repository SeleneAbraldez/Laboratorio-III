// hereda de Mascota
///<reference path="Mascota.ts"/>

namespace Entidades {
    export class Perro extends Mascota {
        //atributos
        public nombre: string;
        public raza: string;
        public pathFoto: string;

        //constructor
        public constructor(tamaño: string, edad: number, precio: number, nombre: string, raza: string, path: string) {
            super(tamaño, edad, precio);
            this.nombre = nombre;
            this.raza = raza;
            this.pathFoto = path;
        }

        //ToJSON():JSON, que retornará la representación del objeto en formato JSON. Se debe de
            // reutilizar el método ToString de la clase Mascota
        public ToJson(): any {
            let retornoJson = `${this.ToString()}"nombre":"${this.nombre}","raza":"${this.raza}","pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(retornoJson);
        }

    }
}