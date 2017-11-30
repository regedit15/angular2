import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatService} from '../../app/services/chat.service';

// import {FCM, NotificationData} from '@ionic-native/fcm';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    //, private firebaseCM: FCM
    constructor(public navCtrl: NavController, public chatService: ChatService) {

        // this.initializeApp();
    }

    salir() {
        this.chatService.logout();
    }

    // initializeApp() {
    //     //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
    //     //y procesar las notificaciones
    //     this.firebaseCM.getToken()
    //         .then((token: string) => {
    //             //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar
    // mensajes // a esta  aplicación //o también copiar el token para usarlo con Postman :D console.log('The token to
    // use is: ', token); }) .catch(error => { //ocurrió un error al procesar el token console.error(error); });  /** *
    // No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir procesando las *
    // notificaciones * */ this.firebaseCM.onTokenRefresh().subscribe( (token: string) => console.log('Nuevo token',
    // token), error => console.error(error) );   /** * cuando la configuración este lista, vamos a procesar los
    // mensajes * */ this.firebaseCM.onNotification().subscribe( (data: NotificationData) => { if (data.wasTapped) {
    // //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra // en el
    // dispositivo console.log('Received in background', JSON.stringify(data)) } else { //ocurre cuando nuestra
    // aplicación se encuentra en primer plano, //puedes mostrar una alerta o un modal con los datos del mensaje
    // console.log('Received in foreground', JSON.stringify(data)) } }, error => { console.error('Error in
    // notification', error) } );  }
}
