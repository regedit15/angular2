import {Component, Input, OnInit} from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing';
import {Botones} from '../../interfaces/boton.interface';

@Component({
    selector: 'app-boton',
    templateUrl: './boton.component.html',
    styles: []
})
export class BotonComponent implements OnInit {

    @Input() botones: Botones[];
    @Input('appData') palabras: string[];

    //
    constructor(private socialSharing: SocialSharing) {
    }

    ngOnInit() {
    }

    play(archivo: string) {
        let audio = new Audio(archivo);
        audio.play();
    }

    compartir(archivo) {


        this.socialSharing.shareViaWhatsApp('Lemondata 2018', 'www/assets/sonidos/' + archivo).then(() => {
            console.log('todo bien!')
        }).catch(error => {
            console.log('todo mal!:' + error);
        });

        //--------FUNCIONO
        // this.socialSharing.share('nombreee', 'bbbbbbb', 'www/assets/imgs/limon.jpg').then(() => {
        //     console.log('todo bien!')
        // }).catch(error => {
        //     console.log('todo mal!:' + error);
        // });
        // --------------------------
    }


    quitarPalabras() {
        this.palabras = [];
    }


}
