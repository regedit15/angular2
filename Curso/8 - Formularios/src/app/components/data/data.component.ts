import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {Observable} from "rxjs/Observable";
import {reject} from "q";

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
        },
        correo: "martinrossi9009@gmail.com",
        pasatiempos: ["Correr"]
    };

    constructor() {
        this.formulario = new FormGroup({

            'nombreCompleto': new FormGroup({
                'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
                'apellido': new FormControl('', [Validators.required, this.noHerrera]),
            }),

            'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")]),

            'pasatiempos': new FormArray([
                new FormControl('Correr', Validators.required)
            ]),
            'username': new FormControl('', Validators.required, this.usuarioExistente),
            'password1': new FormControl('', Validators.required),
            'password2': new FormControl('', Validators.required)

        });

        // this.formulario.setValue(this.usuario);

        //forma de setear una validacion en un formulario programaticamente
        this.formulario.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this.formulario)])

        // this.formulario.controls['username'].valueChanges.subscribe(
        //     data => {
        //         console.log(data);
        //     }
        // );

        this.formulario.controls['username'].statusChanges.subscribe(
            data => {
                console.log(data);
            }
        );

    }

    ngOnInit() {
    }

    guardar() {

        console.log("sadasdasd");
        console.log(this.formulario.value);
        console.log(this.formulario);

        this.formulario.reset({
            nombreCompleto: {
                nombre: "",
                apellido: ""
            },
            correo: ""
        });


    }

    agregarPasatiempo() {
        (<FormArray>this.formulario.controls['pasatiempos']).push(
            new FormControl('', Validators.required)
        )
    }


    noHerrera(control: FormControl) {
        let resultado;
        if (control.value === 'herrera') {
            resultado = {
                noherrera: true
            }
        }

        return resultado;
    }


    noIgual(control: FormControl) {

        let resultado;
        let formaulario: any = this;

        if (control.value != formaulario.controls['password1'].value) {
            resultado = {
                noiguales: true
            }
        }

        return resultado;
    }

    usuarioExistente(control: FormControl): Promise<any> | Observable<any> {

        let promesa = new Promise(
            (resolve, reject) => {
                setTimeout(() => {

                    let resultado;

                    if (control.value === 'martin') {
                        resultado = {
                            existe: true
                        };
                    }

                    resolve(resultado);
                }, 3000)
            }
        );

        return promesa;
    }
}

