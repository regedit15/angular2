import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {ChatService} from '../../app/services/chat.service';
import {Usuario} from '../../app/interfaces/usuario.interface';

@Component({
    selector: 'page-about',
    templateUrl: 'mensaje.html'
})
export class MensajePage {

    token: string = '';
    titulo: string = '';
    mensaje: string = '';
    para: string = '';

    constructor(public navCtrl: NavController, public chatService: ChatService, public alertCtrl: AlertController) {
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
}
