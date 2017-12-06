import {Component} from '@angular/core';

import {FCM, NotificationData} from '@ionic-native/fcm';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ChatService} from '../../app/services/chat.service';
import {HomePage} from '../home/home';


@Component({
    selector: 'page-login',
    templateUrl: './login.html',
    styles: []
})
export class LoginPage {

    constructor(public chatService: ChatService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM, public navCtrl: NavController) {
        this.initializeApp();
    }

    ingresar(tipo: string) {

        this.chatService.login(tipo).then(() => {
            this.navCtrl.setRoot(HomePage);
        }, () => {
            console.error('Loguin fallido');
        });
    }


    initializeApp() {

        if (this.platform.is('cordova')) {

            let token = localStorage.getItem('token');

            if (token == null) {

                this.platform.ready().then(() => {
                    this.statusBar.styleDefault();
                    this.splashScreen.hide();

                    //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
                    //y procesar las notificaciones
                    this.fcm.getToken()
                        .then((token: string) => {
                            //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder
                            // enviar mensajes a esta  aplicación o también copiar el token para usarlo con Postman :D
                            console.log('The token to use is: ', token);

                            // this.chatService.setToken(token);
                            localStorage.setItem('token', token);
                        })
                        .catch(error => {
                            //ocurrió un error al procesar el token
                            // console.error(error);
                        });

                    /**
                     * No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir
                     * procesando las notificaciones
                     * */
                    this.fcm.onTokenRefresh().subscribe(
                        (token: string) => console.log('Nuevo token', token),
                        error => console.error(error)
                    );

                    /**
                     * cuando la configuración este lista, vamos a procesar los mensajes
                     * */
                    this.fcm.onNotification().subscribe(
                        (data: NotificationData) => {

                            console.log('Mensaje recivido!!!!!');

                            if (data.wasTapped) {
                                //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que
                                // se muestra en el dispositivo
                                console.log('Received in background', JSON.stringify(data))
                            } else {
                                //ocurre cuando nuestra aplicación se encuentra en primer plano,
                                //puedes mostrar una alerta o un modal con los datos del mensaje
                                console.log('Received in foreground', JSON.stringify(data))
                            }
                        }, error => {
                            console.error('Error in notification', error)
                        }
                    );

                });
            }
        }
    }

}
