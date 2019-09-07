namespace Ejercicio01 {
    export class Punto {

        private _x: number;
        private _y: number;

    //constr
        public constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

    //gets
        public get GetX(): number {
            return this._x;
        }


        public get GetY(): number {
            return this._y;
        }
    //

    }

}