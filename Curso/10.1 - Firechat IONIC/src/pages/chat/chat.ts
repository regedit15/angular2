import {Component, OnInit} from '@angular/core';
import {FCM} from '@ionic-native/fcm';
import {TOPICS_MENSAJES} from '../../environments/environment';
import {ChatService} from '../../app/services/chat.service';
import {Platform} from 'ionic-angular';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.html',
})
export class ChatPage implements OnInit {

    mensaje = '';
    elemento: any;
    largo;

    constructor(public chatService: ChatService, private fcm: FCM, private platform: Platform) {
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

        // this.ancho = window.innerWidth - 50;
        this.largo = window.innerHeight - 175;
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
