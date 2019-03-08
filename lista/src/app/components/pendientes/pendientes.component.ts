import {Component} from '@angular/core';
import {ListaService} from '../../services/lista.service';
import {Item} from '../../clases/item.interface';

@Component({
    selector: 'app-pendientes',
    templateUrl: './pendientes.component.html',
    styleUrls: ['./pendientes.component.scss'],
})
export class PendientesComponent {

    constructor(private listaService: ListaService) {
    }

    cambiarEstado(item: Item) {
        item.terminado = !item.terminado;
        this.listaService.actualizarData();
    }
}
