///<reference path="./01-Persona.ts"/>

namespace Ejericio03 {
    export class Empleado extends Persona {
        protected _legajo: number;
        protected _sueldo: number;

        public constructor(nombre: string, apellido: string, dni: number, sexo: string, legajo: number, sueldo: number) {
            super(nombre, apellido, dni, sexo);
            this._legajo = legajo;
            this._sueldo = sueldo;
        }
    
    //gets
        public get GetLegajo(): number {
            return this._legajo;
        }

        public get GetSueldo(): number {
            return this._sueldo;
        }
    //

        public Hablar(idioma: string): string {
            return "Empleadx " + this.GetApellido + " habla " + idioma;
        }

        public ToString(): string {
            return  super.ToString() + "Legajo: " + this._legajo  + " - Sueldo: " + this._sueldo;
        }

    }
}