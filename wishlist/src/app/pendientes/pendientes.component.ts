import {Component} from '@angular/core';
import {ListaDeseosService} from '../services/lista-deseos.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pendientes',
    templateUrl: 'pendientes.component.html',
})
export class PendientesComponent {

    constructor(private listaDeseosService: ListaDeseosService, private router: Router) {

    }


    irAgregar() {
        this.router.navigate(['/agregar']);
    }

    verDetalle(lista, index) {
        this.router.navigate(['/detalle', index]);
    }
}
