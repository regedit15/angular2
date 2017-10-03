import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Mensaje} from '../interfaces/mensaje.interface';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

    chats: FirebaseListObservable<any[]>;
    usuario: any = null;

    constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth) {
        // La documentacion oficial dice
        // this.items = angularFireDb.list('items').valueChanges()
        // pero da un error
        // this.chats = angularFireDb.list('chats');
        let usuarioGuardado = localStorage.getItem('usuario');

        if (usuarioGuardado) {
            this.usuario = JSON.parse(usuarioGuardado);
        }
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
            nombre: this.usuario.displayName,
            mensaje: texto,
            uid: this.usuario.uid
        };


        // esto regresa una promesa
        return this.chats.push(mensaje);
    }

    login(proveedor: string) {

        let provider;

        if (proveedor === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
        } else {
            provider = new firebase.auth.TwitterAuthProvider();
        }

        this.afAuth.auth.signInWithPopup(provider)
            .then(respuesta => {
                console.log(respuesta);
                this.usuario = respuesta.user;

                // se guarda en el local storage
                localStorage.setItem('usuario', JSON.stringify(this.usuario));
            });
    }

    logout() {
        localStorage.removeItem('usuario');
        this.usuario = null;
        this.afAuth.auth.signOut();
    }
}
