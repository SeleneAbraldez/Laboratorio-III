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
    var Rectangulo = /** @class */ (function (_super) {
        __extends(Rectangulo, _super);
        function Rectangulo(color, l1, l2) {
            var _this = _super.call(this, color) || this;
            _this._ladoUno = l1;
            _this._ladoDos = l2;
            _this.CalcularDatos();
            return _this;
        }
        Rectangulo.prototype.CalcularDatos = function () {
            this._perimetro = (this._ladoUno * 2) + (this._ladoDos * 2);
            this._superficie = this._ladoDos * this._ladoUno;
        };
        Rectangulo.prototype.Dibujar = function () {
            var retorno = "";
            for (var i = 0; i < this._ladoUno; i++) {
                for (var j = 0; j < this._ladoDos; j++) {
                    retorno += "*";
                }
                retorno += "\n";
            }
            return retorno;
        };
        Rectangulo.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + "\n" + this.Dibujar();
        };
        return Rectangulo;
    }(Ejercicio02.FiguraGeometrica));
    Ejercicio02.Rectangulo = Rectangulo;
})(Ejercicio02 || (Ejercicio02 = {}));
//# sourceMappingURL=02 -Rectangulo.js.map