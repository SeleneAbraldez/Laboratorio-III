///<reference path="01 -FiguraGeometrica.ts"/>

namespace Ejercicio02 {
    export class Triangulo extends FiguraGeometrica {
        private _altura: number;
        private _base: number;

        protected CalcularDatos(): void {
            this._perimetro = (this._base * 3);
            this._superficie = (this._base * this._altura);
        }

        public constructor(color: string, b: number, h: number) {
            super(color);
            this._altura = h;
            this._base = b;
            this.CalcularDatos();
        }

        public Dibujar(): string {
            let espacios = (this._base) / 2;
            let lunares = (this._base) - (this._altura) + 1;
            let dibu = "";
            for (let i = 0; i < this._altura; i++) {
                for (let k = 0; k < espacios; k++) {
                    dibu += " ";
                }
                for (let j = 0; j < lunares; j++) {
                    dibu += "*";
                }
                dibu += "\n";
                espacios--;
                lunares++;
            }
            return dibu;
        }

        public ToString() {
            return super.ToString() + "\n" + this.Dibujar();
        }
    }
}