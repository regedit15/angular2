import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AboutPage} from '../about/about';
import {ConfigPage} from '../config/config';
import {ContactPage} from '../contact/contact';
import {ChatPage} from '../chat/chat';
import {LoginPage} from '../login/login';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = ChatPage;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

        this.pages = [
            {title: 'Chat', component: ChatPage},
            {title: 'Mensajes', component: AboutPage},
            {title: 'Configuracion', component: ConfigPage},
            {title: 'Info', component: ContactPage}];
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    salir() {
        this.nav.setRoot(LoginPage);
    }
}
