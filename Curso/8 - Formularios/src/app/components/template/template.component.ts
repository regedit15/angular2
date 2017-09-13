import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styles: [`
        .ng-invalid.ng-touched:not(form){
            border: 1px solid red;
        }
    `]
})
export class TemplateComponent implements OnInit {

    usuario: Object = {
        nombre: null,
        apellido: null,
        correo: null,
        pais: "CRI",
        sexo: "M",
        color: "R",
        acepta: false,
    };

    paises = [{
        codigo: "CRI",
        nombre: "Costa Rica"
    },
    {
        codigo: "AR",
        nombre: "Argentina"
    },
    {
        codigo: "EU",
        nombre: "Estados Unidos"
    }];

    colores = [{
        codigo: "R",
        nombre: "Rojo"
    },
    {
        codigo: "V",
        nombre: "Verde"
    },
    {
        codigo: "A",
        nombre: "Azul"
    }];

    constructor() { }

    ngOnInit() {
    }

    guardar(formulario: NgForm) {
        console.log("Forma: ", formulario);
        console.log("Data formulario: ", formulario.value);
        console.log("Valor: ", this.usuario)
    }

}
