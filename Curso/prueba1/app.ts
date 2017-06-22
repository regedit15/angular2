
import {Perro, Gato} from "./clases/index";

// let perro = new Perro("aaa", "bbb");

// perro.saludar();

function consola(constructor: Function) {
  console.log(constructor);
}


@consola
class Persona {
  constructor(public nombre: string) {
  }
}
