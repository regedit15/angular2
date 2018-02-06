import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FotosComponent} from './components/fotos/fotos.component';
import {CargaComponent} from './components/carga/carga.component';
import {APP_ROUTING} from './app.route';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CargaImagenesService} from './services/carga-imagenes.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {DropFilesDirective} from './directives/drop-files.directive';
import {AngularFireDatabase} from 'angularfire2/database';


@NgModule({
    declarations: [
        AppComponent,
        FotosComponent,
        CargaComponent,
        NavbarComponent,
        DropFilesDirective,
    ],
    imports: [
        BrowserModule,
        APP_ROUTING,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [CargaImagenesService, AngularFireDatabase],
    bootstrap: [AppComponent]
})
export class AppModule {
}
