import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PendientesComponent} from './components/pendientes/pendientes.component';
import {ListaService} from './services/lista.service';
import {TerminadosComponent} from './components/terminados/terminados.component';
import {AgregarComponent} from './components/agregar/agregar.component';
import {FormsModule} from '@angular/forms';
import {PendientePipe} from './pipes/pendiente.pipe';

@NgModule({
    declarations: [
        AppComponent,
        PendientesComponent,
        TerminadosComponent,
        AgregarComponent,
        PendientePipe
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ListaService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
