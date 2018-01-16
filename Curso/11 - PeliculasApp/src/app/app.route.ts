import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BuscadorComponent} from './components/buscador/buscador.component';
import {VerPeliculaComponent} from './components/ver-pelicula/ver-pelicula.component';

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'buscar/:texto', component: BuscadorComponent},
    {path: 'ver/:id/:pagina/:texto', component: VerPeliculaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
