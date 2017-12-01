import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatService} from '../../app/services/chat.service';
import {AlertController} from 'ionic-angular';
import {Usuario} from '../../app/interfaces/usuario';
import {FCM} from '@ionic-native/fcm';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    token: string = '';
    titulo: string = '';
    mensaje: string = '';
    para: string = '';

    constructor(public navCtrl: NavController, public chatService: ChatService, public alertCtrl: AlertController, private fcm: FCM) {
        this.token = this.chatService.getToken();
    }

    enviarMensaje() {
        this.chatService.enviarMensaje(this.token, this.titulo, this.mensaje).subscribe(data => {
            console.log('Mensaje push enviado con éxito');
            // console.log(data);
        }, err => {
            console.log('Error al enviar mensaje push!:');
            console.log(err)
        });
    }

    showRadio() {

        this.chatService.getUsuarios().subscribe(usuarios => {

            let listaUsuarios: Usuario[] = usuarios;

            let alert = this.alertCtrl.create();
            alert.setTitle('Contactos');

            for (let usuario of listaUsuarios) {
                alert.addInput({
                    type: 'radio',
                    label: usuario.displayName,
                    value: JSON.stringify(usuario)
                    // checked: true
                });
            }

            alert.addButton('Cancel');
            alert.addButton({
                text: 'OK',
                handler: usuario => {
                    let usuarioParseado: Usuario = JSON.parse(usuario);
                    this.token = usuarioParseado.token;
                    this.para = usuarioParseado.displayName;
                }
            });
            alert.present();
        })
    }

    subscibirse() {
        //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
        //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
        //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
        this.fcm.subscribeToTopic('/topics/mensajes');
    }

    desubscibirse() {
        //FCMPlugin.unsubscribeFromTopic( topic, successCallback(msg), errorCallback(err) );
        this.fcm.unsubscribeFromTopic('/topics/mensajes');
    }
}
