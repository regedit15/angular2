import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buscar', component: SearchComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const app_routing = RouterModule.forRoot(app_routes);
