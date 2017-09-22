import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroeComponent} from './components/heroes/heroe.component';
import {APP_ROUTING} from './app.route';
import {FormsModule} from '@angular/forms';
import {HeroesService} from './services/heroes.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpModule
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
