"use strict";
///<reference path="./01-Persona.ts"/>
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
var Ejericio03;
(function (Ejericio03) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, sexo, legajo, sueldo) {
            var _this = _super.call(this, nombre, apellido, dni, sexo) || this;
            _this._legajo = legajo;
            _this._sueldo = sueldo;
            return _this;
        }
        Object.defineProperty(Empleado.prototype, "GetLegajo", {
            //gets
            get: function () {
                return this._legajo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Empleado.prototype, "GetSueldo", {
            get: function () {
                return this._sueldo;
            },
            enumerable: true,
            configurable: true
        });
        //
        Empleado.prototype.Hablar = function (idioma) {
            return "Empleadx " + this.GetApellido + " habla " + idioma;
        };
        Empleado.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + "Legajo: " + this._legajo + " - Sueldo: " + this._sueldo;
        };
        return Empleado;
    }(Ejericio03.Persona));
    Ejericio03.Empleado = Empleado;
})(Ejericio03 || (Ejericio03 = {}));
//# sourceMappingURL=02-Empleado.js.map