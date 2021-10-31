import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

@Component({
  selector: 'app-mapp',
  templateUrl: './mapp.component.html',
  styleUrls: ['./mapp.component.css']
})
export class MappComponent implements OnInit, AfterViewInit  {

  constructor() { }

  map!: mapboxgl.Map
  marker = new mapboxgl.Marker({ draggable: true, color: 'green'});
  @ViewChild('coordinates') coordonnees!: ElementRef;

  ngOnInit(): void {
    this.marker.setLngLat([-15.97157689569294, 18.052809477772584]);
  }

  ngAfterViewInit(): void {
    this.getMap();
  }

  getMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg', // style URL
      center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
      pitch: 60,
      zoom: 12, // starting zoom
      attributionControl: true
    });

    // Language
    const language = new MapboxLanguage();
    this.map.addControl(language);
    
    // Default locate
    this.marker.addTo(this.map);

    // Evenements
    this.marker.on('dragend', (e) =>{
      this.onDragEnd();
    });
  }

  testclick(){
    const lngLat = this.marker.getLngLat();
    this.coordonnees.nativeElement.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    console.log(lngLat);
  }

  onDragEnd(){
    const lngLat = this.marker.getLngLat();
    this.coordonnees.nativeElement.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    console.log(lngLat);
  }

}
