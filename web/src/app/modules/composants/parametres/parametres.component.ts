import { Component, OnInit } from '@angular/core';
import { Pharmacie } from '../../models/pharmacie.model';
import * as mapboxgl from 'mapbox-gl';
import { Coordonnee } from '../../models/coordonnee.model';
import { Telephone } from '../../models/telephone.model';
import { PharmacieService } from '../../services/pharmacie.service';
import { BaseComponent } from 'src/app/common/base/base.component';
import { marker } from 'leaflet';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  constructor(private s_pharmacie: PharmacieService, public base: BaseComponent){}

  pharmacie: Pharmacie = new Pharmacie();
  telephone: Telephone = new Telephone();
  coordonnee: Coordonnee = new Coordonnee();
  pharmacie_id: number = parseInt(this.base.get_pharmacie_Id() + '');

  ngOnInit(): void {
    this.getMap();
    this.getLngLat();
    this.get_pharmacie(this.pharmacie_id);
    this.get_telephone(this.pharmacie_id);
  }

  get_pharmacie(id:number){
    this.s_pharmacie.get_pharmacie(id).subscribe(data =>{
      console.log(data);
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  edit_pharmacie(){
    this.s_pharmacie.edit_pharmacie(this.pharmacie_id, this.pharmacie).subscribe(data =>{
      console.log(data);
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  get_telephone(id:number){
    this.s_pharmacie.get_telephone(id).subscribe(data =>{
      console.log(data);
      this.telephone = data;
    },
    error =>console.log(error));
  }

  edit_telephone(){
    this.s_pharmacie.edit_telephone(this.pharmacie_id, this.telephone).subscribe(data =>{
      console.log(data);
      this.telephone = data;
    },
    error =>console.log(error));
  }

  getMap(){
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
    pitch: 60,
    zoom: 12, // starting zoom
    attributionControl: true
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    
    var longitude = sessionStorage.getItem('lng') + '';
    var latitude = sessionStorage.getItem('lat') + '';
    const log = Number(longitude);
    const lat = Number(latitude);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });

    // Add the control to the map.
    map.addControl(geolocate);
      geolocate.on('geolocate', () => {
      console.log('A geolocate event has occurred.');
    });

    map.on('style.load', function() {
      map.on('click', function(e) {
        const coordinates = e.lngLat;
        const x = e.lngLat.lng;
        const y = e.lngLat.lat;
        sessionStorage.setItem('lng', x + '');
        sessionStorage.setItem('lat', y + '');
        
        var lg  = Number(sessionStorage.getItem('lng') + '');
        var lt  = Number(sessionStorage.getItem('lat') + '');
            
        const marker2 = new mapboxgl.Marker({ color: 'green', rotation: 45 })
        .setLngLat([lg, lt])
        marker2.addTo(map)
        
      map.on('click', function(e) {
        marker2.remove()
      })
    });
  });
}

  getLngLat() {
    this.coordonnee.longitude = sessionStorage.getItem('lng') + '';
    this.coordonnee.latitude = sessionStorage.getItem('lat') + '';
  }
}
