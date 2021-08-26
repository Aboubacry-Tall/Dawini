import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent implements OnInit {
  title = this.app.title;
  constructor(private app:AppComponent) { }

  zoom = 12
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    //zoomControl: false,
    //scrollwheel: false,
    //disableDoubleClickZoom: true,
    maxZoom: 100,
    minZoom: 10,
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

}
