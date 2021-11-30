import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './common/map/map.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { PharmacieComponent } from './pages/pharmacie/pharmacie.component';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'map', component: MapComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:name', component: SearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pharmacies', component: PharmaciesComponent},
  {path: 'pharmacie/:id', component: PharmacieComponent},
  {path: 'medicaments/pharmacie/:id', component: MedicamentsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
