import {Component} from '@angular/core';
import {ListaService} from '../../services/lista.service';

@Component({
    selector: 'app-terminados',
    templateUrl: './terminados.component.html',
    styleUrls: ['./terminados.component.scss'],
})
export class TerminadosComponent {

    constructor(private listaService: ListaService) {
    }


}
