import {Component} from '@angular/core';
import {ListaDeseosService} from '../services/lista-deseos.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-terminados',
    templateUrl: 'terminados.component.html',
})
export class TerminadosComponent {

    constructor(private listaDeseosService: ListaDeseosService, private router: Router) {

    }

    verDetalle(lista, index) {
        this.router.navigate(['/heroe', index]);
    }
}
