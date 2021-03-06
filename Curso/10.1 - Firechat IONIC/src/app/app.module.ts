import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {MensajePage} from '../pages/mensaje/mensaje';
import {InfoPage} from '../pages/info/info';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
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
import {ConfigPage} from '../pages/config/config';
import {LoginPage} from '../pages/login/login';
import {ChatPage} from '../pages/chat/chat';
import {Camera} from '@ionic-native/camera';

@NgModule({
    declarations: [
        MyApp,
        MensajePage,
        InfoPage,
        ConfigPage,
        HomePage,
        ChatPage,
        LoginPage
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
        MensajePage,
        InfoPage,
        ConfigPage,
        HomePage,
        LoginPage,
        ChatPage
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
        FCM,
        Camera
    ]
})
export class AppModule {
}
