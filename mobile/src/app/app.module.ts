
import { FooterComponent } from './common/footer/footer.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './common/base/base.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { PharmacieComponent } from './pages/pharmacie/pharmacie.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { HeaderComponent } from './common/header/header.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import {IonBottomSheetModule} from 'ion-bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



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
    AproposComponent,
    
    
  ],
  entryComponents: [],
  imports: [MatFormFieldModule,MatIconModule,MatAutocompleteModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,FormsModule,IonBottomSheetModule, BrowserAnimationsModule],
  providers: [Geolocation,AndroidPermissions,LocationAccuracy,BarcodeScanner,SQLite,SQLitePorter,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
