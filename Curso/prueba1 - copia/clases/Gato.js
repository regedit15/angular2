"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gato = (function () {
    function Gato(nombre, raza) {
        this.nombre = nombre;
        this.raza = raza;
    }
    Gato.prototype.saludar = function () {
        console.log("Hola soy un gato");
    };
    return Gato;
}());
exports.Gato = Gato;
