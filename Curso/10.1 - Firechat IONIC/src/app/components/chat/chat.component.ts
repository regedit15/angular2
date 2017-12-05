import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {FCM} from '@ionic-native/fcm';
import {TOPICS_MENSAJES} from '../../../environments/environment';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

    mensaje = '';
    elemento: any;

    constructor(public chatService: ChatService, private fcm: FCM) {
        this.chatService.cargarMensaje().subscribe(
            () => {
                console.log('Mensajes cargados...');

                setTimeout(() => {
                    this.elemento.scrollTop = this.elemento.scrollHeight;
                }, 100);
            }
        );

        let recibirNotificaciones = JSON.parse(localStorage.getItem('recibirNotificaciones'));

        if (recibirNotificaciones == null || recibirNotificaciones) {
            this.fcm.subscribeToTopic(TOPICS_MENSAJES);
        }
    }

    ngOnInit() {
        this.elemento = document.getElementById('app-mensajes');
    }


    enviar() {

        if (this.mensaje.length) {
            console.log(this.mensaje);
        }

        this.chatService.agregarMensaje(this.mensaje).then(() => {
            console.log('Hecho!');
        }, (error) => {
            console.error('Error!: ' + error);
        });

        this.mensaje = '';
    }

}
