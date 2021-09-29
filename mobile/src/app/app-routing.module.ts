import { ScannerComponent } from './pages/scanner/scanner.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { MapboxComponent } from './pages/mapbox/mapbox.component';

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
    path: 'mapbox',
    component:MapboxComponent
  },
  {
    path: 'scanner',
    component:ScannerComponent
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
