import { FooterComponent } from './common/footer/footer.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { OnstartComponent } from './pages/onstart/onstart.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './common/base/base.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { PharmacieComponent } from './pages/pharmacie/pharmacie.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MedicamentComponent,
    MedicamentsComponent,
    PharmacieComponent,
    ScannerComponent,
    OnstartComponent,
    AproposComponent,
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
