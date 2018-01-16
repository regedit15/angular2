import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {PeliculasService} from './services/peliculas.service';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BuscadorComponent} from './components/buscador/buscador.component';
import {APP_ROUTING} from './app.route';
import {JsonpModule} from '@angular/http';
import {VerPeliculaComponent} from './components/ver-pelicula/ver-pelicula.component';
import { FormatNroPipe } from './pipes/format-nro.pipe';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        BuscadorComponent,
        VerPeliculaComponent,
        FormatNroPipe
    ],
    imports: [
        BrowserModule,
        APP_ROUTING,
        JsonpModule
    ],
    providers: [PeliculasService,
        // {provide: LOCALE_ID, useValue: 'es-AR'}
        // {
        //     provide: LOCALE_ID,
        //     useValue: 'nl-NL'
        // }
        // {provide: LOCALE_ID, useValue: 'es'}

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
