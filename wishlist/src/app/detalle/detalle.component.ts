import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {ListaDeseosService} from '../services/lista-deseos.service';
import {ListaItem} from '../clases/lista-item';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-detalle',
    templateUrl: 'detalle.component.html',
})
export class DetalleComponent {


    constructor(public router: Router, public listaDeseosService: ListaDeseosService, public alertCtrl: AlertController, private activatedRoute: ActivatedRoute) {

    }

    actualizar(item: ListaItem) {
        item.completado = !item.completado;
        let todosMarcados = true;

        for (let x of this.listaDeseosService.listaSeleccionada.items) {
            if (!x.completado) {
                todosMarcados = false;
                break;
            }
        }

        this.listaDeseosService.listaSeleccionada.terminada = todosMarcados;
        this.listaDeseosService.actualizarData();
    }

    async borrarItem() {
        let confirm = await this.alertCtrl.create({
            header: this.listaDeseosService.listaSeleccionada.nombre,
            message: '¿Seguro desea borrar esta lista?',
            buttons: ['Cancelar',
                {
                    text: 'Eliminar',
                    handler: () => {
                        this.listaDeseosService.eliminarListaSeleccionada();
                        this.router.navigate(['/pendientes']);
                    }
                }
            ]
        });
        confirm.present();
    }
}
