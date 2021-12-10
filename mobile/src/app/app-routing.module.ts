import { ScannerComponent } from './pages/scanner/scanner.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { PharmacieComponent } from './pages/pharmacie/pharmacie.component';

const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'medicament',
    component:MedicamentComponent
  },
  {
    path: 'medicaments',
    component:MedicamentsComponent
  },
  {
    path: 'scanner',
    component:ScannerComponent
  },
  {
    path: 'pharmacie',
    component:PharmacieComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
