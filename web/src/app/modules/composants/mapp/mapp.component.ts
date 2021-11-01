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

  value = '';
  map_mode: number = 1;
  pharmacie: Pharmacie = new Pharmacie();
  pharmacies!: Pharmacie[];

  map!: mapboxgl.Map
  markers!: [];
  popup!: [];
  marker = new mapboxgl.Marker({ draggable: true, color: 'black'});

  @ViewChild('coordinates') coordonnees!: ElementRef;
  
  constructor(private service: PharmacieService) {}
  
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
    const el = document.createElement('div');
    el.style.backgroundImage = 'url("../../../../assets/images/l4.png")';
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = 'cover';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );

    for(let i = 0; i < this.pharmacies.length; i++){
      const el = document.createElement('div');
      el.style.backgroundImage = 'url("../../../../assets/images/l4.png")';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        '<h4 class="mt-3"> Ph. ' + this.pharmacies[i].nom + '</h4>'
      );
      marker[i] = new mapboxgl.Marker(el);
      marker[i].setLngLat([this.pharmacies[i].longitude, this.pharmacies[i].latitude]);
      marker[i].setPopup(popup);
      marker[i].addTo(this.map);
    }
  }

  flyToPharmacie(pharmacie: Pharmacie){
    this.map.flyTo({
      center: [parseFloat(pharmacie.longitude + ''), parseFloat(pharmacie.latitude + '')],
      zoom: 15
    });
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

  modeSatellite(mode: number): void{
    this.map_mode = mode;
    if(this.map_mode == 0){
      this.map.setStyle('mapbox://styles/ghostmap/ckvh14f5527ks14pkam2n7rn4');
    }else{
      this.map.setStyle('mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg');
    }
  }
}
