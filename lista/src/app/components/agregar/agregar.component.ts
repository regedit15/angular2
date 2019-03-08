import {Component} from '@angular/core';
import {Item} from '../../clases/item.interface';
import {Lista} from '../../clases/lista.interface';
import {ListaService} from '../../services/lista.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent {

    items: Item [];
    nombre;
    nombreItem;

    constructor(private listaService: ListaService, private router: Router) {
        this.items = [];
        this.nombre = '';
        this.nombreItem = '';
    }

    agregarItem() {
        this.items.push({nombre: this.nombreItem});
        this.nombreItem = '';
    }

    guardarLista() {
        let lista: Lista = {
            nombre: this.nombre,
            items: this.items
        };

        this.listaService.agregarLista(lista);
        this.router.navigate(['/pendientes']);
    }

}
