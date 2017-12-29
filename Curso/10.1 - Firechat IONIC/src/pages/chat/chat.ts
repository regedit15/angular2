import {Component, OnInit} from '@angular/core';
import {FCM} from '@ionic-native/fcm';
import {TOPICS_MENSAJES} from '../../environments/environment';
import {ChatService} from '../../app/services/chat.service';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase';

declare var window;


@Component({
    selector: 'app-chat',
    templateUrl: './chat.html',
})
export class ChatPage implements OnInit {

    mensaje = '';
    elemento: any;
    largo
    myPicRef;

    public Fbref: any;

    constructor(public chatService: ChatService, private fcm: FCM, private camera: Camera) {
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

        this.Fbref = firebase.storage().ref();

        // BE2.jpg
        // myPicRef
        firebase.storage().ref('/');
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

    getMedia() {

        let opciones = {
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.ALLMEDIA,
            destinationType: this.camera.DestinationType.FILE_URI
        };

        this.camera.getPicture(opciones).then(fileUri => {

            let nombre = fileUri.split('/').pop();

            window.resolveLocalFileSystemURL('file://' + fileUri, FE => {

                FE.file(file => {
                    const FR = new FileReader();
                    FR.onloadend = (res: any) => {
                        let AF = res.target.result;
                        let blob = new Blob([new Uint8Array(AF)], {type: 'image/png'});
                        this.upload(blob, nombre);
                    };
                    FR.readAsArrayBuffer(file);
                })
            });
        });
    }

    upload(blob: Blob, nombreArchivo) {
        this.Fbref.child(nombreArchivo).put(blob).then(imagenGuardada => {

            let urlImagen = imagenGuardada.downloadURL;

            this.chatService.agregarImagen(urlImagen).then(() => {
                console.log('Hecho!');
            }, (error) => {
                console.error('Error!: ' + error);
            });

        });
    }

}
