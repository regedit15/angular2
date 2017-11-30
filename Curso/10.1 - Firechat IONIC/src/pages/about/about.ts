import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatService} from '../../app/services/chat.service';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    uuid: string = '';
    titulo: string = '';
    mensaje: string = '';

    constructor(public navCtrl: NavController, public chatService: ChatService) {
        this.uuid = this.chatService.getToken();
    }

    enviarMensaje() {
        this.chatService.enviarMensaje(this.uuid, this.titulo, this.mensaje).subscribe(data => {
            console.log('Mensaje push enviado con éxito');
            // console.log(data);
        }, err => {
            console.log('Error al enviar mensaje push!:');
            console.log(err)
        });
    }

}
