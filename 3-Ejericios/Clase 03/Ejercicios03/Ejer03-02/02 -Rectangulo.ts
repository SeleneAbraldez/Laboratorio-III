///<reference path="01 -FiguraGeometrica.ts"/>

namespace Ejercicio02 {
    export class Rectangulo extends FiguraGeometrica {
        private _ladoDos: number;
        private _ladoUno: number;
        
        protected CalcularDatos(): void {
            this._perimetro = (this._ladoUno * 2) + (this._ladoDos * 2);
            this._superficie = this._ladoDos * this._ladoUno;
        }

        public constructor(color: string, l1: number, l2: number) {
            super(color);
            this._ladoUno = l1;
            this._ladoDos = l2;
            this.CalcularDatos();
        }

        public Dibujar(): string {
            var retorno: string = "";
            for (let i = 0; i < this._ladoUno; i++) {
                for (let j = 0; j < this._ladoDos; j++) {
                    retorno += "*";
                }
                retorno += "\n";
            }
            return retorno;
        }

        public ToString() {
            return super.ToString() + "\n" + this.Dibujar();
        }

    }
}