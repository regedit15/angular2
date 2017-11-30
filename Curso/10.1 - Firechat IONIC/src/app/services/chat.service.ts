import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Mensaje} from '../interfaces/mensaje.interface';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import {Platform} from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import {TwitterConnect} from '@ionic-native/twitter-connect';
import {Facebook} from '@ionic-native/facebook';

@Injectable()
export class ChatService {

  chats: any;
  usuario: any = null;
  size$: BehaviorSubject<string | null>;

  constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth, private googlePlus: GooglePlus, private platform: Platform, private twitterConnect: TwitterConnect, private fb: Facebook) {

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

    if (this.platform.is('cordova')) {

      switch (proveedor) {
        case 'twitter':

          this.twitterConnect.login()
            .then(res => {

              console.log(res);

              this.usuario = {
                displayName: res.userName,
                uid: res.userId
              };
            })
            .catch(
              err => console.error(err)
            );

          break;

        case 'facebook':

          this.fb.login(['email', 'public_profile']).then(respuesta => {
            this.fb.api(respuesta.authResponse.userID + '/?fields=id,email,first_name', ['public_profile']).then(
              response => {
                this.usuario = {
                  displayName: response.first_name,
                  uid: respuesta.authResponse.userID
                };
              });
          });
          break;

        case 'google':

          this.googlePlus.login({})
            .then(res => {
              this.usuario = {
                displayName: res.displayName,
                uid: res.userId
              };
            })
            .catch(
              err => console.error(err)
            );
          break;
      }
    }
    else {
      let provider;

      switch (proveedor) {
        case 'google':
          provider = new firebase.auth.GoogleAuthProvider();
          break;
        case 'facebook':
          provider = new firebase.auth.FacebookAuthProvider();
          break;
        case 'twitter':
          provider = new firebase.auth.TwitterAuthProvider();
          break;
      }

      this.afAuth.auth.signInWithPopup(provider)
        .then(respuesta => {
          console.log(respuesta);
          this.usuario = respuesta.user;

          // se guarda en el local storage
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
        });
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.afAuth.auth.signOut();
  }
}
