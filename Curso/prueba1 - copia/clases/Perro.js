"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Perro = (function () {
    function Perro(nombre, raza) {
        this.nombre = nombre;
        this.raza = raza;
    }
    Perro.prototype.saludar = function () {
        console.log("Hola, soy un perro");
    };
    return Perro;
}());
exports.Perro = Perro;
