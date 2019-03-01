import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {ListaDeseosService} from '../services/lista-deseos.service';
import {ListaItem} from '../clases/lista-item';
import {Lista} from '../clases/listas';

@Component({
    selector: 'selector',
    templateUrl: 'agregar.component.html',
})
export class AgregarComponent {

    nombreLista = '';
    nombreItem = '';
    items: ListaItem[] = [];

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public listaDeseosService: ListaDeseosService) {

    }

    agregar() {

        if (this.nombreItem.length === 0) {
            return;
        }

        let item = new ListaItem();
        item.nombre = this.nombreItem;
        this.items.push(item);
        this.nombreItem = '';
    }

    borrar(index) {
        this.items.splice(index, 1);
    }

    async guardarLista() {

        if (this.nombreLista.length === 0) {

            let alert = await this.alertCtrl.create({
                header: 'Nombre de la lista',
                subHeader: 'El nombre de la lista es necesario!',
                buttons: ['OK']
            });
            alert.present();

            return;
        }

        let lista = new Lista(this.nombreLista);
        lista.items = this.items;

        this.listaDeseosService.agregarListas(lista);
        this.navCtrl.pop();
    }
}
