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
import {Http, RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';

@Injectable()
export class ChatService {

    chats: any;
    usuario: any = null;
    size$: BehaviorSubject<string | null>;

    constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth, private googlePlus: GooglePlus, private platform: Platform, private twitterConnect: TwitterConnect, private fb: Facebook, private http: Http) {

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

    enviarMensaje() {
        let headers = new Headers();
        headers.append('Authorization', 'key=AAAAfl5uRa0:APA91bFV4xa0P7wvoYK733a-luqI9QPbdBfbJ9CkEg2F_I7sYXZixEiCt7LxtCRLot38oSSSy5EOGIGkrJnVMFzkWIdZlYkd5E-k4pkQ2LRrGMNoFNYGxmQ5Oesj2OtmdyVkyrQU0dQM');
        headers.append('Content-Type', 'application/json');

        var body = JSON.stringify({

            to: 'ctDCg-qsUjY:APA91bHwWJHjEG_AA86uMgRIHy4iWoNsWAe7s89Bfv_nLc8I9BixuDxZyA34-hzZCl2H8089mt4zDchOlaVtuKrgjekpTHrYHPd4y7zt7Ya3zMFXYUsKyHDNu4RW2ocW1g6pTD_yuWoN',
            notification: {
                title: 'Notification title',
                body: 'Notification body',
                sound: 'default',
                click_action: 'FCM_PLUGIN_ACTIVITY',
                icon: 'fcm_push_icon'
            },
            data: {
                param1: 'value1',
                param2: 'value2'
            }
        });

        var options = new RequestOptions({headers: headers});

        return this.http.post('https://fcm.googleapis.com/fcm/send', body, options).map(res => {
            return res.json();
        });
    }
}
