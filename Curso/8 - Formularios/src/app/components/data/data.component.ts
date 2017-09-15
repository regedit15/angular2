import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styles: []
})
export class DataComponent implements OnInit {

    formulario: FormGroup;

    usuario: any = {
        nombreCompleto: {
            nombre: "Martin",
            apellido: "Rossi"
        }
        ,
        correo: "martinrossi9009@gmail.com"
    };

    constructor() {
        this.formulario = new FormGroup({

            'nombreCompleto': new FormGroup({
                'nombre': new FormControl(this.usuario.nombreCompleto.nombre, [Validators.required, Validators.minLength(3)]),
                'apellido': new FormControl('', [Validators.required]),
            }),

            'correo': new FormControl(this.usuario.correo, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")]),
        });

    }

    ngOnInit() {
    }

    guardar() {

        console.log("sadasdasd");
        console.log(this.formulario.value);
        console.log(this.formulario);
    }

}
