import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Mensaje} from '../interfaces/mensaje.interface';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';
import {Platform} from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import {TwitterConnect} from '@ionic-native/twitter-connect';
import {Facebook} from '@ionic-native/facebook';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Usuario} from '../interfaces/usuario';
import {
    CLAVE_DE_SERVIDOR,
    TOPICS_MENSAJES,
    URL_CHATS,
    URL_PUSH_NOTIFICATIONS,
    URL_USUARIOS,
    URL_USUARIOS_JSON
} from '../../environments/environment';

@Injectable()
export class ChatService {
    canalDeChat(arg0: any): any {
        throw new Error('Method not implemented.');
    }

    readonly USUARIO = 'usuario';
    chats: any;
    usuario: Usuario = {};

    constructor(private angularFireDb: AngularFireDatabase, public afAuth: AngularFireAuth, private googlePlus: GooglePlus, private platform: Platform, private twitterConnect: TwitterConnect, private fb: Facebook, private http: Http) {

        let usuarioGuardado = localStorage.getItem(this.USUARIO);

        if (usuarioGuardado) {
            this.usuario = JSON.parse(usuarioGuardado);
        }
    }

    cargarMensaje() {
        this.chats = this.angularFireDb.list(URL_CHATS).valueChanges();
        return this.chats;
    }

    agregarMensaje(texto: string) {

        let mensaje: Mensaje = {
            usuario: this.usuario.displayName,
            mensaje: texto,
            uid: this.usuario.uid,
            fecha: new Date().toString(),
        };

        this.enviarMensaje(TOPICS_MENSAJES, this.usuario.displayName, texto).subscribe(data => {
            console.log('Mensaje push enviado con éxito');
            // console.log(data);
        }, err => {
            console.log('Error al enviar mensaje push!:');
            console.log(err)
        });

        return this.angularFireDb.list(URL_CHATS).push(mensaje);
    }

    agregarImagen(urlImagen) {

        let imagen = 'imagen';

        let mensaje: Mensaje = {
            usuario: this.usuario.displayName,
            mensaje: imagen,
            urlImagen: urlImagen,
            uid: this.usuario.uid,
            fecha: new Date().toString(),
        };

        this.enviarMensaje(TOPICS_MENSAJES, this.usuario.displayName, imagen).subscribe(data => {
            console.log('Mensaje push enviado con éxito');
            // console.log(data);
        }, err => {
            console.log('Error al enviar mensaje push!:');
            console.log(err)
        });

        return this.angularFireDb.list(URL_CHATS).push(mensaje);
    }

    setToken(token: string) {
        this.usuario.token = token;
    }

    getToken() {
        return this.usuario.token;
    }

    login(proveedor: string) {

        let promesa = new Promise((resolve, reject) => {

            if (this.platform.is('cordova')) {

                switch (proveedor) {
                    case 'twitter':

                        this.twitterConnect.login()
                            .then(res => {
                                // console.log(res);
                                this.procesarUsuario(res.userName, res.userId);
                                resolve();
                            }).catch(err => console.error(err));
                        break;

                    case 'facebook':

                        this.fb.login(['email', 'public_profile']).then(respuesta => {
                            this.fb.api(respuesta.authResponse.userID + '/?fields=id,email,first_name', ['public_profile']).then(
                                response => {
                                    // console.log(res);
                                    this.procesarUsuario(response.first_name, respuesta.authResponse.userID);
                                    resolve();
                                });
                        });
                        break;

                    case 'google':

                        this.googlePlus.login({})
                            .then(res => {
                                // console.log(res);
                                this.procesarUsuario(res.displayName, res.userId);
                                resolve();
                            }).catch(err => console.error(err));
                        break;
                }
            } else {
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
                        localStorage.setItem(this.USUARIO, JSON.stringify(this.usuario));
                        resolve();
                    });
            }
        });

        return promesa;
    }

    logout() {
        localStorage.removeItem(this.USUARIO);
        this.usuario = null;
        this.afAuth.auth.signOut();
    }

    enviarMensaje(token, titulo, mensaje) {
        let headers = new Headers();
        headers.append('Authorization', 'key=' + CLAVE_DE_SERVIDOR);
        headers.append('Content-Type', 'application/json');

        var body = JSON.stringify({
            // to: TOPICS_MENSAJES,
            to: token,
            notification: {
                title: titulo,
                body: mensaje,
                sound: 'default',
                click_action: 'FCM_PLUGIN_ACTIVITY',
                icon: 'fcm_push_icon'
            },
            // data: {
            //     param1: 'value1',
            //     param2: 'value2'
            // }
        });

        var options = new RequestOptions({headers: headers});

        return this.http.post(URL_PUSH_NOTIFICATIONS, body, options).map(res => {
            return res.json();
        });
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

        this.angularFireDb.list(URL_USUARIOS, ref => ref.orderByChild('token').equalTo(this.usuario.token)).valueChanges().subscribe(usuarios => {

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

        return this.http.post(URL_USUARIOS_JSON, body, {headers}).map(res => {
                return res.json();
            }
        );
    }

    getUsuarios() {
        return this.angularFireDb.list(URL_USUARIOS, ref => ref.orderByChild('displayName')).valueChanges();
    }

    usuarioLogeado() {
        return this.usuario != null;
    }
}
