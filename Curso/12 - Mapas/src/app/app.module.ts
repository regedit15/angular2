import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AgmCoreModule} from '@agm/core';
import {MapasService} from './services/mapas.service';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBHh9dWGNYOnnUWr3migGfVqzVWljrwqsU'
        }),
        FormsModule
    ],
    providers: [MapasService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
