import {Injectable} from '@angular/core';
import {AngularFireAction, AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Mensaje} from '../interfaces/mensaje.interface';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ChatService {

    chats: any;
    usuario: any = null;
    size$: BehaviorSubject<string | null>;

    constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth) {

        let usuarioGuardado = localStorage.getItem('usuario');

        if (usuarioGuardado) {
            this.usuario = JSON.parse(usuarioGuardado);
        }
    }

    cargarMensaje() {
        this.chats = this.angularFireDb.list('chats').valueChanges();
        return this.chats;
    }

    agregarMensaje(texto: string) {

        let mensaje: Mensaje = {
            nombre: this.usuario.displayName,
            mensaje: texto,
            uid: this.usuario.uid
        };

        return this.angularFireDb.list('chats').push(mensaje)
    }

    login(proveedor: string) {

        let provider;


        switch (proveedor) {
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();


                break;
            case 'google':
                provider = new firebase.auth.TwitterAuthProvider();
                break;
        }


        if (this.platform.is('cordova')) {
            return this.fb.login(['email', 'public_profile']).then(res => {
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                return firebase.auth().signInWithCredential(facebookCredential);
            })
        }
        else {

            this.afAuth.auth.signInWithPopup(provider)
                .then(respuesta => {
                    console.log(respuesta);
                    this.usuario = respuesta.user;

                    // se guarda en el local storage
                    // localStorage.setItem('usuario', JSON.stringify(this.usuario));
                });

        }


    }

    logout() {
        // localStorage.removeItem('usuario');
        this.usuario = null;
        this.afAuth.auth.signOut();
    }
}
