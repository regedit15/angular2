import {Component, ViewChild} from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {AboutPage} from '../pages/about/about';
import {ConfigPage} from '../pages/config/config';
import {ContactPage} from '../pages/contact/contact';
import {ChatService} from './services/chat.service';
import {LoginComponent} from './components/login/login.component';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    // @ViewChild(Nav) nav: Nav;
    @ViewChild('content') nav: NavController;

    // rootPage: any = HomePage;
    rootPage: any = LoginComponent;

    // pages: Array<{ title: string, component: any }>;

    constructor(public chatService: ChatService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        // this.pages = [
        //     {title: 'Home', component: HomePage},
        //     // {title: 'Mensaje', component: AboutPage},
        //     {title: 'Config', component: ConfigPage},
        //     {title: 'Info', component: ContactPage},
        // ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    // openPage(page) {
    //     // Reset the content nav to have just this page
    //     // we wouldn't want the back button to show in this scenario
    //     // this.nav.setRoot(page.component);
    // }

    // ------------
    // ingresar(tipo: string) {
    //
    //
    //     // console.log(1111111);
    //     // this.chatService.login(tipo);
    //     this.nav.setRoot(HomePage);
    //     // this.navCtrl.setRoot(HomePage);
    //     // this.navCtrl.push('what-ever-page');
    // }
}

