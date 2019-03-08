import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PendientesComponent} from './components/pendientes/pendientes.component';
import {TerminadosComponent} from './components/terminados/terminados.component';
import {AgregarComponent} from './components/agregar/agregar.component';

const routes: Routes = [
    // {
    //   path: '',
    //   redirectTo: 'home',
    //   pathMatch: 'full'
    // },
    // {
    //   path: 'home',
    //   loadChildren: './home/home.module#HomePageModule'
    // },
    // {
    //   path: 'list',
    //   loadChildren: './list/list.module#ListPageModule'
    // }

    {path: 'pendientes', component: PendientesComponent},
    {path: 'terminados', component: TerminadosComponent},
    {path: 'agregar', component: AgregarComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'pendientes'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
