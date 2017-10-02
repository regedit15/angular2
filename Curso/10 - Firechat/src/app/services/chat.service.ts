import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Mensaje} from '../interfaces/mensaje.interface';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

    chats: FirebaseListObservable<any[]>;
    usuario: any = {nombre: 'Juan Carlos'};

    constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth) {
        // La documentacion oficial dice
        // this.items = angularFireDb.list('items').valueChanges()
        // pero da un error
        // this.chats = angularFireDb.list('chats');
    }

    cargarMensaje() {
        this.chats = this.angularFireDb.list('chats', {
            query: {
                limitToLast: 20,
                orderByKey: true
            }
        });

        return this.chats;
    }

    agregarMensaje(texto: string) {

        let mensaje: Mensaje = {
            nombre: 'Juan Carlos',
            mensaje: texto
        };


        // esto regresa una promesa
        return this.chats.push(mensaje);
    }

    login(proveedor: string) {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(respuesta => {
                console.log(respuesta);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}
