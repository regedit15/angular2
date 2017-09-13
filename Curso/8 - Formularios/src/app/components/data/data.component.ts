import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styles: []
})
export class DataComponent implements OnInit {

    forma: FormGroup;

    constructor() {
        this.forma = new FormGroup({
            'nombre': new FormControl('Martin'),
            'apellido': new FormControl(),
            'correo': new FormControl(),
        });

    }

    ngOnInit() {
    }

    guardar() {
        console.log("sadasdasd")
        console.log(this.forma.value);
        console.log(this.forma);
    }

}
