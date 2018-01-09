import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Media} from '@ionic-native/media';
import {SocialSharing} from '@ionic-native/social-sharing';
import {BotonComponent} from '../components/boton/boton.component';
import {FiltroPipe} from '../pipes/filtro.pipe';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        BotonComponent,
        FiltroPipe
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Media,
        SocialSharing,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
