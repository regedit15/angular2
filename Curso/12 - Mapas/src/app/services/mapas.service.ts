import {Injectable} from '@angular/core';
import {Marcador} from '../interfaces/marcador.interface';

@Injectable()
export class MapasService {

    marcadores: Marcador[] = [];

    constructor() {
        const nuevoMarcador: Marcador = {
            lat: -31.7305514,
            lng: -60.5363867,
            draggable: true,
            titulo: 'hola',
            descripcion: 'desccc'
        };

        this.marcadores.push(nuevoMarcador);
    }


    guardarMarcadores() {
        localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
    }

    borrarMarcador(indice) {
        this.marcadores.splice(indice, 1);
        this.guardarMarcadores();
    }

    cargarMarcadores() {

        let variable = localStorage.getItem('marcadores');
        let valor = [];

        if (variable) {
            valor = JSON.parse(variable);
        }

        this.marcadores = valor;

    }

}
