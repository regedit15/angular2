import {Component, OnInit} from '@angular/core';

import {ChatService} from '../../services/chat.service';
import {FCM, NotificationData} from '@ionic-native/fcm';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    constructor(public chatService: ChatService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM) {
        this.initializeApp();
    }

    ngOnInit() {
    }

    ingresar(tipo: string) {
        this.chatService.login(tipo);
    }

    enviar() {

        this.chatService.enviarMensaje().subscribe(data => {
            console.log('Exito en el login:');
            console.log(data);
        }, err => {
            console.log('Errorrrrrr:');
            console.log(err)
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
            //y procesar las notificaciones
            this.fcm.getToken()
                .then((token: string) => {
                    //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar
                    // mensajes a esta  aplicación o también copiar el token para usarlo con Postman :D
                    console.log('The token to use is: ', token);
                })
                .catch(error => {
                    //ocurrió un error al procesar el token
                    console.error(error);
                });

            /**
             * No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir procesando las
             * notificaciones
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
                        //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se
                        // muestra en el dispositivo
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
