import {Component, ViewChild} from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {MensajePage} from '../pages/mensaje/mensaje';
import {ConfigPage} from '../pages/config/config';
import {ChatService} from './services/chat.service';
import {LoginPage} from '../pages/login/login';
import {ChatPage} from '../pages/chat/chat';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = LoginPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public chatService: ChatService) {
        this.initializeApp();

        if (chatService.usuarioLogeado()) {
            this.rootPage = HomePage;
        }

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}

