import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import {APP_ROUTING} from './app.route';

// Servicios
import { HeroesService } from './services/heroes.service';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroesBuscadosComponent } from './components/heroes-buscados/heroes-buscados.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        AboutComponent,
        HeroesComponent,
        HeroeComponent,
        HeroesBuscadosComponent
    ],
    imports: [
        BrowserModule, APP_ROUTING
    ],
    providers: [HeroesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
