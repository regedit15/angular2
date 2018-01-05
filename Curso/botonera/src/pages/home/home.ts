import {Component} from '@angular/core';
import {MediaObject} from '@ionic-native/media';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    private file: MediaObject;

    constructor() {
    }

    play(archivo: string) {
        let audio = new Audio(archivo);
        audio.play();
    }

}
