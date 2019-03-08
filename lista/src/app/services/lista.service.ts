import {Injectable} from '@angular/core';
import {Lista} from '../clases/lista.interface';

@Injectable({
    providedIn: 'root'
})
export class ListaService {


    listas: Lista[];


    constructor() {

        let valorObtenido = JSON.parse(localStorage.getItem('data'));

        this.listas = valorObtenido ? valorObtenido : [];
    }

    agregarLista(lista: Lista) {
        this.listas.push(lista);
        this.actualizarData();
    }

    actualizarData() {
        localStorage.setItem('data', JSON.stringify(this.listas));
    }

}
