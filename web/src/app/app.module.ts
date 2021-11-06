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
import { PharmacieComponent } from './modules/composants/pharmacie/pharmacie.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ParametresComponent } from './modules/composants/parametres/parametres.component';
import { MapboxComponent } from './modules/composants/mapbox/mapbox.component';
import { MapComponent } from './modules/composants/mapbox/map/map.component';
import { MappComponent } from './modules/composants/mapp/mapp.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageComponent } from './pages/message/message.component';
import { CoreComponent } from './common/core/core.component';
import { AlertComponent } from './common/alert/alert.component';

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
    PharmacieComponent,
    ParametresComponent,
    LogoutComponent,
    MapboxComponent,
    MapComponent,
    MappComponent,
    MessageComponent,
    CoreComponent,
    AlertComponent
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
    MatDialogModule
  ],
  providers: [CoreComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
