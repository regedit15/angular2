import {Component} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    usuario;

    constructor(private fb: Facebook) {
    }

    loginFacebook() {

        this.fb.login(['email', 'public_profile']).then((respuesta: FacebookLoginResponse) => {
            console.log('Logged into Facebook! (respuesta 1:)', respuesta);

            this.fb.api(respuesta.authResponse.userID + '/?fields=id,email,first_name', ['public_profile']).then(
                response => {

                    console.log('Logged into Facebook! (respuesta 2:)', response);

                    this.usuario = {
                        displayName: response.first_name,
                        uid: respuesta.authResponse.userID
                    };
                });
        }).catch((e) => {
            console.log('Error logging into Facebook:', e);
        });
    }

}
