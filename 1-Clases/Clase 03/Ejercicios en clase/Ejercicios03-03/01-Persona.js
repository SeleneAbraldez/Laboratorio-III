"use strict";
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
//# sourceMappingURL=01-Persona.js.map