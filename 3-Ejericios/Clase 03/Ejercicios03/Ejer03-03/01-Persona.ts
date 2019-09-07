namespace Ejericio03 {
    export abstract class Persona {
        private _apellido: string;
        private _dni: number;
        private _nombre: string;
        private _sexo: string;

        public constructor(nombre: string, apellido: string, dni: number, sexo: string) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._dni = dni;
            this._sexo = sexo;
        }

    //Gets
        public get GetApellido(): string {
            return this._apellido;
        }

        public get GetDni(): number {
            return this._dni;
        }

        public get GetNombre(): string {
            return this._nombre;
        }

        public get GetSexo(): string {
            return this._sexo;
        }
    //

        public abstract Hablar(idioma: string): string;

        public ToString(): string {
            return "Apellido: " + this._apellido + " - Nombre: " + this._nombre + "\ - DNI: " + this._dni + " - Sexo:" + this._sexo;
        }

    }
}