"use strict";
var Ejercicio01;
(function (Ejercicio01) {
    var Punto = /** @class */ (function () {
        //constr
        function Punto(x, y) {
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Punto.prototype, "GetX", {
            //gets
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Punto.prototype, "GetY", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        return Punto;
    }());
    Ejercicio01.Punto = Punto;
})(Ejercicio01 || (Ejercicio01 = {}));
//# sourceMappingURL=Punto.js.map