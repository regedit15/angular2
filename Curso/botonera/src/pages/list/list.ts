import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

declare function startGame(): any;

declare function accelerate(n: any): any;

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage implements OnInit {

    mostrarBotonMobile: boolean;

    constructor(public navCtrl: NavController, private platform: Platform) {

        this.mostrarBotonMobile = this.platform.is('cordova');
        console.log('aaaa:' + this.mostrarBotonMobile)
    }

    ngOnInit() {
        startGame();
    }

    subir(valor) {
        accelerate(valor);
    }

}
