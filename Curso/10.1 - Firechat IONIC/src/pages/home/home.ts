// import {Component} from '@angular/core';
// import {NavController} from 'ionic-angular';
// import {ChatService} from '../../app/services/chat.service';
//
// // import {FCM, NotificationData} from '@ionic-native/fcm';
//
// @Component({
//     selector: 'page-home',
//     templateUrl: 'home.html'
// })
// export class HomePage {
//     //, private firebaseCM: FCM
//     constructor(public navCtrl: NavController, public chatService: ChatService) {
//
//         // this.initializeApp();
//     }
//
//     salir() {
//         this.chatService.logout();
//     }
//
//     // initializeApp() {
//     //     //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
//     //     //y procesar las notificaciones
//     //     this.firebaseCM.getToken()
//     //         .then((token: string) => {
//     //             //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar
//     // mensajes // a esta  aplicación //o también copiar el token para usarlo con Postman :D console.log('The token
// to // use is: ', token); }) .catch(error => { //ocurrió un error al procesar el token console.error(error); });  /**
// * // No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir procesando las * //
// notificaciones * */ this.firebaseCM.onTokenRefresh().subscribe( (token: string) => console.log('Nuevo token', //
// token), error => console.error(error) );   /** * cuando la configuración este lista, vamos a procesar los //
// mensajes * */ this.firebaseCM.onNotification().subscribe( (data: NotificationData) => { if (data.wasTapped) { //
// //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra // en el //
// dispositivo console.log('Received in background', JSON.stringify(data)) } else { //ocurre cuando nuestra //
// aplicación se encuentra en primer plano, //puedes mostrar una alerta o un modal con los datos del mensaje //
// console.log('Received in foreground', JSON.stringify(data)) } }, error => { console.error('Error in //
// notification', error) } );  } }


// ---------------------


import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ListPage} from '../list/list';
import {ChatComponent} from '../../app/components/chat/chat.component';
import {AboutPage} from '../about/about';
import {ConfigPage} from '../config/config';
import {ContactPage} from '../contact/contact';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = ChatComponent;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        // this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Chat', component: ChatComponent},
            {title: 'Mensajes', component: AboutPage},
            {title: 'Configuracion', component: ConfigPage},
            {
                title: 'Info', component: ContactPage
            }];
    }

    // initializeApp() {
    //     this.platform.ready().then(() => {
    //         // Okay, so the platform is ready and our plugins are available.
    //         // Here you can do any higher level native things you might need.
    //         this.statusBar.styleDefault();
    //         this.splashScreen.hide();
    //     });
    // }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
