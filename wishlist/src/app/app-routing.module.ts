import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgregarComponent} from './agregar/agregar.component';
import {DetalleComponent} from './detalle/detalle.component';
import {TerminadosComponent} from './terminados/terminados.component';
import {PendientesComponent} from './pendientes/pendientes.component';

const routes: Routes = [
    {path: 'agregar', component: AgregarComponent},
    // {path: 'detalle/:lista/:index', component: DetalleComponent},
    {path: 'detalle/:index', component: DetalleComponent},
    {path: 'terminados', component: TerminadosComponent},
    {path: 'pendientes', component: PendientesComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'pendientes'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
