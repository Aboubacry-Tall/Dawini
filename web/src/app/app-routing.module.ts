import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path: 'register', component: RegisterComponent},
  {path: 'pharmacie/:id', component: PharmacieComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
