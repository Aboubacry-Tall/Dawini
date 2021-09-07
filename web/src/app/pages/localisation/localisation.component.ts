import { Component, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import * as L from 'leaflet';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent implements AfterViewInit {
  
  constructor(private app:AppComponent) { }
  
  title = this.app.title;
  map:any;
  littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
  denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
  aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
  golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
  cities = L.layerGroup([this.littleton, this.denver, this.aurora, this.golden]);
  
  ngAfterViewInit(): void {
    this.getIcon();
    this.initMap();
  }

  getIcon (){
    const iconRetinaUrl = './assets/marker-icon-2x.png';
    const iconUrl = './assets/marker-icon.png';
    const shadowUrl = './assets/marker-shadow.png';
    const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  initMap(){
    const grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512, 
      zoomOffset: -1, 
      accessToken: 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw'
    });

    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512, 
      zoomOffset: -1, 
      accessToken: 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw',
    });

    this.map = L.map('mapid', {
      center: [39.73, -104.99],
      zoom: 10,
      layers: [grayscale, this.cities]
    });
  
    const baseMaps = {
      "Grayscale": grayscale,
      "Streets": streets
    };
  
    const overlayMaps = {
      "Cities": this.cities
    };

    L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  }

}
