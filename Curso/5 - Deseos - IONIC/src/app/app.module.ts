import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Componentes
import { PendientesComponent } from '../pages/pendientes/pendientes.component';
import { TerminadosComponent } from '../pages/terminados/terminados.component';
import { AgregarComponent } from '../pages/agregar/agregar.component';
import { DetalleComponent } from '../pages/detalle/detalle.component';

// Servicios
import { ListaDeseosService } from './services/lista-deseos.service';

// Pipes
import { PlaceholderPipe } from './pipes/placeholder.pipe';
import { PendientesPipe } from './pipes/pendientes.pipe';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        PendientesComponent,
        TerminadosComponent,
        AgregarComponent,
        PlaceholderPipe,
        PendientesPipe,
        DetalleComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        PendientesComponent,
        TerminadosComponent,
        AgregarComponent,
        DetalleComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ListaDeseosService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
