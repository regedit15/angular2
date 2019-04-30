import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FCM} from '@ionic-native/fcm/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    chats: Observable<any[]>;

    constructor(private fcm: FCM) {

        this.fcm.subscribeToTopic('marketing');

        this.fcm.getToken().then(token => {
            console.log('Token Obtenido : Registrar token en backend: ' + token);
        });

        this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
                console.log('Received in background: ' + JSON.stringify(data));
            } else {
                console.log('Received in foreground: ' + JSON.stringify(data));
            }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
            console.log('Token Refrezcado : registrar token en backend: ' + token);
        });

        // Desuscribirse
        // this.fcm.unsubscribeFromTopic('marketing');
    }


}
