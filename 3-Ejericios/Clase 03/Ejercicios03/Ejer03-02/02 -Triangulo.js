"use strict";
///<reference path="01 -FiguraGeometrica.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ejercicio02;
(function (Ejercicio02) {
    var Triangulo = /** @class */ (function (_super) {
        __extends(Triangulo, _super);
        function Triangulo(color, b, h) {
            var _this = _super.call(this, color) || this;
            _this._altura = h;
            _this._base = b;
            _this.CalcularDatos();
            return _this;
        }
        Triangulo.prototype.CalcularDatos = function () {
            this._perimetro = (this._base * 3);
            this._superficie = (this._base * this._altura);
        };
        Triangulo.prototype.Dibujar = function () {
            var espacios = (this._base) / 2;
            var lunares = (this._base) - (this._altura) + 1;
            var dibu = '<div style="color : green">';
            for (var i = 0; i < this._altura; i++) {
                for (var k = 0; k < espacios; k++) {
                    dibu += " ";
                }
                for (var j = 0; j < lunares; j++) {
                    dibu += "*";
                }
                dibu += "\n";
                espacios--;
                lunares++;
            }
            return dibu;
        };
        Triangulo.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + "\n" + this.Dibujar();
        };
        return Triangulo;
    }(Ejercicio02.FiguraGeometrica));
    Ejercicio02.Triangulo = Triangulo;
})(Ejercicio02 || (Ejercicio02 = {}));
//# sourceMappingURL=02 -Triangulo.js.map