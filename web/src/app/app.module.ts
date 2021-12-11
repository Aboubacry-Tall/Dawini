import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './common/base/base.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreComponent } from './common/core/core.component';
import { AlertComponent } from './common/alert/alert.component';
import { MedicamentsComponent } from './pages/medicaments/medicaments.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { PharmacieComponent } from './pages/pharmacie/pharmacie.component';
import { MapComponent } from './common/map/map.component';
import { SearchComponent } from './pages/search/search.component';
import { MedicamentsBaseComponent } from './pages/medicaments-base/medicaments-base.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ResetComponent,
    RegisterComponent,
    LogoutComponent,
    CoreComponent,
    AlertComponent,
    MedicamentsComponent,
    MedicamentComponent,
    PharmaciesComponent,
    PharmacieComponent,
    MapComponent,
    SearchComponent,
    MedicamentsBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    GoogleMapsModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatPaginatorModule
  ],
  providers: [CoreComponent, SearchComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
