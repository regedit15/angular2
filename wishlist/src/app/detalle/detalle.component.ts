import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {ListaDeseosService} from '../services/lista-deseos.service';
import {ListaItem} from '../clases/lista-item';
import {Lista} from '../clases/listas';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-detalle',
    templateUrl: 'detalle.component.html',
})
export class DetalleComponent {
    index: number;
    lista: Lista;

    constructor(public router: Router, public listaDeseosService: ListaDeseosService, public alertCtrl: AlertController, private activatedRoute: ActivatedRoute) {

        this.activatedRoute.params.subscribe(params => {
            this.index = params['index'];
            this.lista = this.listaDeseosService.listas[this.index];
        });
    }

    actualizar(item: ListaItem) {
        item.completado = !item.completado;
        let todosMarcados = true;

        for (let x of this.lista.items) {
            if (!x.completado) {
                todosMarcados = false;
                break;
            }
        }

        this.lista.terminada = todosMarcados;
        this.listaDeseosService.actualizarData();
    }

    async borrarItem() {
        let confirm = await this.alertCtrl.create({
            header: this.lista.nombre,
            message: '¿Seguro desea borrar esta lista?',
            buttons: ['Cancelar',
                {
                    text: 'Eliminar',
                    handler: () => {
                        this.listaDeseosService.eliminarLista(this.index);
                        this.router.navigate(['/pendientes']);
                    }
                }
            ]
        });
        confirm.present();
    }
}
