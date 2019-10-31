var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ejericio03;
(function (Ejericio03) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, sexo) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._dni = dni;
            this._sexo = sexo;
        }
        Object.defineProperty(Persona.prototype, "GetApellido", {
            //Gets
            get: function () {
                return this._apellido;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetDni", {
            get: function () {
                return this._dni;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetNombre", {
            get: function () {
                return this._nombre;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetSexo", {
            get: function () {
                return this._sexo;
            },
            enumerable: true,
            configurable: true
        });
        Persona.prototype.ToString = function () {
            return "Apellido: " + this._apellido + " - Nombre: " + this._nombre + "\ - DNI: " + this._dni + " - Sexo:" + this._sexo;
        };
        return Persona;
    }());
    Ejericio03.Persona = Persona;
})(Ejericio03 || (Ejericio03 = {}));
///<reference path="./01-Persona.ts"/>
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
///<reference path="./02-Empleado.ts"/>
var empleados = [
    new Ejericio03.Empleado("Pedro", "Alonzo", 432432465, "M", 1234, 120000),
    new Ejericio03.Empleado("Juana", "Pancha", 786554545, "F", 1233, 140000)
];
empleados.forEach(MostrarMain);
function MostrarMain(emp) {
    console.log(emp.ToString());
}
console.log(empleados[0].Hablar("Mandarin"));
