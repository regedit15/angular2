import {Component, ViewChild} from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {ConfigPage} from '../pages/config/config';
import {ContactPage} from '../pages/contact/contact';
import {ChatService} from './services/chat.service';
import {LoginPage} from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    // @ViewChild(Nav) nav: Nav;
    @ViewChild('content') nav: NavController;

    // rootPage: any = HomePage;
    rootPage: any = LoginPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
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

