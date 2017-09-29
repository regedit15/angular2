import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

    mensaje: string = '';

    constructor(public chatService: ChatService) {
        this.chatService.cargarMensaje().subscribe(
            () => {
                console.log('Mensajes cargados...');
            }
        );
    }

    ngOnInit() {
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
    }

}
