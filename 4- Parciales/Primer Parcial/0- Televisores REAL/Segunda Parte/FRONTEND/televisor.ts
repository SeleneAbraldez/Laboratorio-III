//hereda de producto
/// <reference path="producto.ts" />

namespace Entidades {

    export class Televisor extends Producto {

        //atributos
        tipo: string;
        paisOrigen: string;
        pathFoto: string;

        //inciialñiza todos
        public constructor(codigo: number, marca: string, precio: number, tipo: string, pais: string, foto: string) {
            super(codigo, marca, precio);
            this.tipo = tipo;
            this.paisOrigen = pais;
            this.pathFoto = foto;
        }

        // Un método ToJSON():JSON,
        // que retornará la representación del objeto en formato JSON. Se debe de reutilizar el método
        // ToString de la clase Producto.
        public ToJSON(): any {
            let retornoJson = ('{' + super.ToString() + '"tipo":"' + this.tipo + '","pais":"' + this.paisOrigen + '","pathFoto":"' + this.pathFoto + '"}'); 
            return JSON.parse(retornoJson);
        }

    }

}