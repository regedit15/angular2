import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePage} from './home/home.page';
import {ListPage} from './list/list.page';
import {AgregarComponent} from './agregar/agregar.component';
import {PendientesComponent} from './pendientes/pendientes.component';
import {PendientesPipe} from './pipes/pendientes.pipe';
import {PlaceholderPipe} from './pipes/placeholder.pipe';
import {FormsModule} from '@angular/forms';
import {DetalleComponent} from './detalle/detalle.component';
import {TerminadosComponent} from './terminados/terminados.component';
import {ListaDeseosService} from './services/lista-deseos.service';

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        ListPage,
        AgregarComponent,
        PendientesComponent,
        PendientesPipe,
        PlaceholderPipe,
        DetalleComponent,
        TerminadosComponent
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
        ListaDeseosService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
