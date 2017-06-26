import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-body',
  templateUrl: 'body.component.html'
})
export class BodyComponent {

  mostrar: boolean = true;
  texto: string = "El bananero soy io";
  nombre: string = "Martin";

  personas: string[] = ["Martin", "Pepe", "Juan", "Pablo"];

}
