import {Component} from '@angular/core';
import {Botones} from '../../interfaces/boton.interface';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {


    public botones: Botones[];

    colores: string[] = ['rojo', 'blanco', 'azul'];

    constructor() {

        this.botones = [{
            nombreArchivo: 'BastaChicos.mp3',
            nombreBoton: 'Basta Chicos',
        }, {
            nombreArchivo: 'FortMaiameee.mp3',
            nombreBoton: 'MAIAMEE!',
        }, {
            nombreArchivo: 'a_comerla.mp3',
            nombreBoton: 'A Comerla',
        }, {
            nombreArchivo: 'en_diez_dias_salis.mp3',
            nombreBoton: 'En Diez Dias Salis',
        }, {
            nombreArchivo: 'estamos_en_la_b.mp3',
            nombreBoton: 'Estamos En La B',
        }, {
            nombreArchivo: 'me_cago_en_la_puta_madre.mp3',
            nombreBoton: 'Me Cago En La',
        }, {
            nombreArchivo: 'nooooo.mp3',
            nombreBoton: 'Nooooo!',
        }, {
            nombreArchivo: 'pedazo_de_boludo.mp3',
            nombreBoton: 'Pedazo De Boludo',
        }, {
            nombreArchivo: 'sabes_que_si.mp3',
            nombreBoton: 'Sabes Que Si?',
        }, {
            nombreArchivo: 'sos_inimputable_hermano.mp3',
            nombreBoton: 'Sos Inimputable Hermano',
            letraChica: true
        }];
    }

}
