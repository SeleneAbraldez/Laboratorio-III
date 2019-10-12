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
            return "Color: " + this._color + " Perimetro: " + this._perimetro + " Superficie: " + this._superficie;
        };
        return FiguraGeometrica;
    }());
    Ejercicio02.FiguraGeometrica = FiguraGeometrica;
})(Ejercicio02 || (Ejercicio02 = {}));
///<reference path="01 -FiguraGeometrica.ts"/>
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
///<reference path="01 -FiguraGeometrica.ts"/>
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
            var dibu = "";
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
///<reference path="02 -Triangulo.ts"/>
///<reference path="02 -Rectangulo.ts"/>
var tri = new Ejercicio02.Triangulo("red", 5, 3);
var rect = new Ejercicio02.Rectangulo("violet", 4, 3);
console.log(tri.ToString());
console.log(rect.ToString());
