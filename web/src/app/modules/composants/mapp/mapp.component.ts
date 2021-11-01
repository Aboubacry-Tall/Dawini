import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { PharmacieService } from '../../services/pharmacie.service';
import { Pharmacie } from '../../models/pharmacie.model';
import { marker } from 'leaflet';

@Component({
  selector: 'app-mapp',
  templateUrl: './mapp.component.html',
  styleUrls: ['./mapp.component.css']
})
export class MappComponent implements OnInit, AfterViewInit  {

  constructor(private service: PharmacieService, private elementRef:ElementRef) { }

  value = '';
  pharmacie: Pharmacie = new Pharmacie();
  pharmacies!: Pharmacie[];
  map!: mapboxgl.Map
  markers!: [];
  marker = new mapboxgl.Marker({ draggable: true, color: 'black'});
  @ViewChild('coordinates') coordonnees!: ElementRef;
  //@ViewChild('ph') ph!: ElementRef;
  

  ngOnInit(): void {
    this.marker.setLngLat([-15.942172529368463, 18.069114191259317]);
    this.get_all_pharmacie();
  }

  ngAfterViewInit(): void {
    this.getMap();
  }

  get_all_pharmacie(){
    this.service.get_all_pharmacie().subscribe(data =>{
      this.pharmacies = data;
      this.add_marker();
    },
    error =>console.log(error));
  }

  add_marker(){
    for(let i = 0; i < this.pharmacies.length; i++){
      marker[i] = new mapboxgl.Marker({ draggable: false, color: 'green'});
      marker[i].setLngLat([this.pharmacies[i].longitude, this.pharmacies[i].latitude]);
      marker[i].addTo(this.map);
    }
  }

  flyToPharmacie(pharmacie: Pharmacie){
    this.map.flyTo({
      center: [parseFloat(pharmacie.longitude + ''), parseFloat(pharmacie.latitude + '')],
      zoom: 15
    });
    console.log(parseFloat(pharmacie.longitude + '') + ' ' + parseFloat(pharmacie.latitude + ''))
  }

  getMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg', // style URL
      center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
      zoom: 12.3, 
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

  onDragEnd(){
    const lngLat = this.marker.getLngLat();
    this.coordonnees.nativeElement.style.display = 'block';
    this.coordonnees.nativeElement.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    console.log(lngLat);
  }

  getLocate(){
    return this.marker.getLngLat();
  }

}
