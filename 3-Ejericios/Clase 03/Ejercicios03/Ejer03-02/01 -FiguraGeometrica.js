"use strict";
var Ejercicio02;
(function (Ejercicio02) {
    var FiguraGeometrica = /** @class */ (function () {
        function FiguraGeometrica(color) {
            this._color = color;
            this._perimetro = 0;
            this._superficie = 0;
        }
        Object.defineProperty(FiguraGeometrica.prototype, "GetColor", {
            get: function () {
                return this._color;
            },
            enumerable: true,
            configurable: true
        });
        FiguraGeometrica.prototype.ToString = function () {
            return "Color: " + this._color + "Perimetro: " + this._perimetro + "Superficie: " + this._superficie;
        };
        return FiguraGeometrica;
    }());
    Ejercicio02.FiguraGeometrica = FiguraGeometrica;
})(Ejercicio02 || (Ejercicio02 = {}));
//# sourceMappingURL=01 -FiguraGeometrica.js.map