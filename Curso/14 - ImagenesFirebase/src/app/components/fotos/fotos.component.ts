import {Component, OnInit} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

export interface Item {
    nombre: string;
    url: string;
}

@Component({
    selector: 'app-fotos',
    templateUrl: './fotos.component.html',
    styles: []
})
export class FotosComponent implements OnInit {

    private itemsCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;

    constructor(private afs: AngularFirestore) {

        // esto se ha probado con las mismas credenciales de fernando
        // herrera y anda bien pero en nuestro proyectos de firebase no.
        // Asi que debe ser una configuracion que hay distinta
        // en el proyecto de firebase, la cual no pudimos resolver
        this.itemsCollection = afs.collection<Item>('img');
        this.items = this.itemsCollection.valueChanges();

        console.log(this.items);
    }

    ngOnInit() {
    }

}
