import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Frenando';
  lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  PI = Math.PI;
  a: number = 0.234;
  salario: number = 1234.5;

  persona = {
    nombre: 'wolverine',
    apellido: 'rodiguez',
    edad: 30,
    direccion: {
      calle: 'cordoba',
      numero: 15
    }
  };

  valorDePromesa = new Promise(
    (resolve, reject) => {
      setTimeout(() => resolve('llego la data!'), 3500);
    });

  video: string = "https://www.youtube.com/embed/H9QLTaanmNo?list=PLCKuOXG0bPi2WNLzimZB7GRSTgqj0J132"


}
