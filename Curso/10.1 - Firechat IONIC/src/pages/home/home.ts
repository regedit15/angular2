import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MensajePage} from '../mensaje/mensaje';
import {ConfigPage} from '../config/config';
import {ChatPage} from '../chat/chat';
import {LoginPage} from '../login/login';
import {InfoPage} from '../info/info';
import {ChatService} from '../../app/services/chat.service';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild(Nav) nav: Nav;
    rootPage: any = ChatPage;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public chatService: ChatService) {

        this.pages = [
            {title: 'Chat', component: ChatPage},
            {title: 'Mensajes', component: MensajePage},
            {title: 'Configuracion', component: ConfigPage},
            {title: 'Info', component: InfoPage}];
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    salir() {
        this.chatService.logout();
        this.nav.setRoot(LoginPage);
    }
}
