import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FCM} from '@ionic-native/fcm';
import {TOPICS_MENSAJES} from '../../environments/environment';

@Component({
    selector: 'page-config',
    templateUrl: 'config.html'
})
export class ConfigPage {

    recibirNotificaciones: boolean;

    constructor(public navCtrl: NavController, private fcm: FCM) {

        this.recibirNotificaciones = JSON.parse(localStorage.getItem('recibirNotificaciones'));

        if (this.recibirNotificaciones == null) {
            this.recibirNotificaciones = true;
        }
    }

    recibirNotificacionesClick() {

        if (this.recibirNotificaciones) {
            //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
            //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
            //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
            this.fcm.subscribeToTopic(TOPICS_MENSAJES);
        } else {
            //FCMPlugin.unsubscribeFromTopic( topic, successCallback(msg), errorCallback(err) );
            this.fcm.unsubscribeFromTopic(TOPICS_MENSAJES);
        }

        localStorage.setItem('recibirNotificaciones', JSON.stringify(this.recibirNotificaciones));
    }

}
