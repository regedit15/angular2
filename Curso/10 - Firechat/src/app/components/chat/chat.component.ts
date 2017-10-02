import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

    mensaje = '';
    elemento: any;

    constructor(public chatService: ChatService) {
        this.chatService.cargarMensaje().subscribe(
            () => {
                console.log('Mensajes cargados...');

                setTimeout(() => {
                    this.elemento.scrollTop = this.elemento.scrollHeight;
                }, 100);
            }
        );
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
            }
        ).catch((error) => {
            console.error('Error!: ' + error);
        });

        this.mensaje = '';
    }

}
