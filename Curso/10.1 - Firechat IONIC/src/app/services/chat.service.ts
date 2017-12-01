import {Injectable} from '@angular/core';
import {AngularFireAction, AngularFireDatabase} from 'angularfire2/database';
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
import {Usuario} from '../interfaces/usuario';
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChatService {

    chats: any;
    usuario: Usuario = {};
    // size$: BehaviorSubject<string | null>;
    baseUrl = 'https://firechat-841dd.firebaseio.com/';
    usuariosUrl = this.baseUrl + 'usuarios.json';
    // heroeUrl = this.baseUrl + 'usuarios';
    // token: string;

    constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth, private googlePlus: GooglePlus, private platform: Platform, private twitterConnect: TwitterConnect, private fb: Facebook, private http: Http) {

        let usuarioGuardado = localStorage.getItem('usuario');

        if (usuarioGuardado) {
            this.usuario = JSON.parse(usuarioGuardado);
        }
    }


    items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
    size$: BehaviorSubject<string | null>;

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
                            // console.log(res);
                            this.procesarUsuario(res.userName, res.userId);
                        })
                        .catch(err => console.error(err));
                    break;

                case 'facebook':

                    this.fb.login(['email', 'public_profile']).then(respuesta => {
                        this.fb.api(respuesta.authResponse.userID + '/?fields=id,email,first_name', ['public_profile']).then(
                            response => {
                                // console.log(res);
                                this.procesarUsuario(response.first_name, respuesta.authResponse.userID);
                            });
                    });
                    break;

                case 'google':

                    this.googlePlus.login({})
                        .then(res => {
                            // console.log(res);
                            this.procesarUsuario(res.displayName, res.userId);
                        }).catch(err => console.error(err));
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
                    // console.log(res);
                    this.procesarUsuario(respuesta.user.displayName, respuesta.user.uid);

                    // se guarda en el local storage
                    localStorage.setItem('usuario', JSON.stringify(this.usuario));
                });
        }
    }

    logout() {
        localStorage.removeItem('usuario');
        this.usuario = null;
        localStorage.setItem('usuario', null);
        this.afAuth.auth.signOut();
    }

    enviarMensaje(uuid, titulo, mensaje) {
        let headers = new Headers();
        headers.append('Authorization', 'key=AAAAfl5uRa0:APA91bFV4xa0P7wvoYK733a-luqI9QPbdBfbJ9CkEg2F_I7sYXZixEiCt7LxtCRLot38oSSSy5EOGIGkrJnVMFzkWIdZlYkd5E-k4pkQ2LRrGMNoFNYGxmQ5Oesj2OtmdyVkyrQU0dQM');
        headers.append('Content-Type', 'application/json');

        var body = JSON.stringify({
            to: uuid,
            notification: {
                title: titulo,
                body: mensaje,
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

    setToken(token: string) {
        this.usuario.token = token;
    }

    getToken() {
        return this.usuario.token;
    }

    procesarUsuario(displayName: string, uid: string) {
        if (this.usuario == null) {
            this.usuario = {};
        }
        this.usuario.displayName = displayName;
        this.usuario.uid = uid;
        this.usuario.token = localStorage.getItem('token');
        this.registrarUsuarioSiEsNecesario();
    }

    registrarUsuarioSiEsNecesario() {

        this.angularFireDb.list('usuarios', ref => ref.orderByChild('token').equalTo(this.usuario.token)).valueChanges().subscribe(usuarios => {

            if (usuarios.length == 0) {
                this.registrarUsuario(this.usuario).subscribe(data => {
                    console.log('Usuario registrado en la bd!');
                }, error => {
                    console.error(error);
                });
            }
        });
    }

    registrarUsuario(usuario: Usuario) {
        let body = JSON.stringify(usuario);
        let headers = new Headers({
            'Constent-Type': 'application/json'
        });

        return this.http.post(this.usuariosUrl, body, {headers}).map(res => {
                return res.json();
            }
        );
    }

    getUsuarios() {
        return this.angularFireDb.list('usuarios', ref => ref.orderByChild('displayName')).valueChanges();
    }
}
