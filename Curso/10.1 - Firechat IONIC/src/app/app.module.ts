import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ChatComponent} from './components/chat/chat.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {ChatService} from './services/chat.service';

import {GooglePlus} from '@ionic-native/google-plus';
import {TwitterConnect} from '@ionic-native/twitter-connect';
import {Facebook} from '@ionic-native/facebook';

import {FCM} from '@ionic-native/fcm';
import {HttpModule} from '@angular/http';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        ChatComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FormsModule,
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ChatService,
        AngularFireDatabase,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GooglePlus,
        TwitterConnect,
        Facebook,
        FCM
    ]
})
export class AppModule {
}
