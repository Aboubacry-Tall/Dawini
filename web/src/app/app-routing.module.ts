import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapboxComponent } from './modules/composants/mapbox/mapbox.component';
import { MappComponent } from './modules/composants/mapp/mapp.component';
import { ParametresComponent } from './modules/composants/parametres/parametres.component';
import { PharmacieComponent } from './modules/composants/pharmacie/pharmacie.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'search', component: SearchComponent},
  {path: 'map', component: MappComponent},
  {path: 'mapbox', component: MapboxComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pharmacie/:id', component: PharmacieComponent},
  {path: 'parametres/:id', component: ParametresComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
