import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Lista, ListaItem } from '../../app/clases/index';
import { ListaDeseosService } from '../../app/services/lista-deseos.service';


@Component({
    selector: 'app-detalle',
    templateUrl: 'detalle.component.html',
})
export class DetalleComponent implements OnInit {
    index: number;
    lista: Lista;

    constructor(public navCtrl: NavController, public navParams: NavParams, public _listaDeseos: ListaDeseosService, public alertCtrl: AlertController) {

        this.index = this.navParams.get("index");
        this.lista = this.navParams.get("lista");
    }

    ngOnInit() {

    }

    actualizar(item: ListaItem) {
        item.completado = !item.completado;
        let todosMarcados = true;

        for (let item of this.lista.items) {
            if (!item.completado) {
                todosMarcados = false;
                break;
            }
        }

        this.lista.terminada = todosMarcados;
        this._listaDeseos.actualizarData();
    }

    borrarItem() {
        let confirm = this.alertCtrl.create({
            title: this.lista.nombre,
            message: '¿Seguro desea borrar esta lista?',
            buttons: ['Cancelar',
                {
                    text: 'Eliminar',
                    handler: () => {
                        this._listaDeseos.eliminarLista(this.index);
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    }
}
