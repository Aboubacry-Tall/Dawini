import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/common/base/base.component';
import { CoreComponent } from 'src/app/common/core/core.component';
import { Pharmacie } from 'src/app/models/pharmacie';
import { PharmacieService } from 'src/app/services/pharmacie.service';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmacieComponent implements OnInit {

  constructor(private s_pharmacie: PharmacieService, public base: BaseComponent, private core: CoreComponent) { }
  map!: mapboxgl.Map;
  pharmacie: Pharmacie = new Pharmacie();
  pharmacie_id: number = parseInt(this.base.get_pharmacie_Id() + '');
  marker = new mapboxgl.Marker({ draggable: true, color: 'green'});

  @ViewChild('coordinates') coordonnees!: ElementRef;

  ngOnInit(): void {
    this.get_pharmacie(this.pharmacie_id);
    this.get_user_coordonnees();
  }

  ngAfterViewInit(): void {
    this.create_map();
    this.get_user_marker();
  }

  get_pharmacie(id:number){
    this.s_pharmacie.get_pharmacie(id).subscribe(data =>{
      this.pharmacie = data;
      
      this.get_user_marker();
    },
    error =>console.log(error));
  }

  edit_pharmacie(){
    if(this.pharmacie.password1 != undefined && this.pharmacie.password2 != undefined){
      if(this.pharmacie.password1?.length > 2 && this.pharmacie.password2?.length > 2){
        if(this.pharmacie.password == this.pharmacie.password1){
          this.pharmacie.password = this.pharmacie.password2
          this.s_pharmacie.edit_pharmacie(this.pharmacie_id, this.pharmacie).subscribe(data =>{
          this.pharmacie = data;
          },
          error =>console.log(error));
          this.core.openDialog(270, 'valide', 'Mot de passe de reinitialisé');
        }else{
          this.core.openDialog(270, 'invalide', 'Ancien mot de passe incorrect');
        }
      }else{
        this.core.openDialog(270, 'invalide', 'Mot de passe trop court. Minimum trois caractères');
      }
    }else{
      this.s_pharmacie.edit_pharmacie(this.pharmacie_id, this.pharmacie).subscribe(data =>{
        this.pharmacie = data;
        },
        error =>console.log(error));
        this.core.openDialog(270, 'valide', 'Opération réussie');
    }
  }

  create_map() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg',
      center: [-15.954111486755835, 18.069114191259317], 
      zoom: 12.3, 
      pitch: 60,
      bearing: 10,
    });

    // Language
    const language = new MapboxLanguage();
    this.map.addControl(language);
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (error: Error) => {});
    
    // controls
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

    // Loading
    this.map.on('load', (e) =>{
      
    });

    // Marker
    //this.marker.addTo(this.map)

    // Events
    this.marker.on('dragend', (e) =>{
      this.onDragEnd();
    });
  }

  onDragEnd(){
    const lngLat = this.marker.getLngLat();
    //this.coordonnees.nativeElement.style.display = 'block';
    //this.coordonnees.nativeElement.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    this.pharmacie.longitude = lngLat.lng + '';
    this.pharmacie.latitude = lngLat.lat + '';
  }

  get_user_coordonnees(){
    const geo = navigator.geolocation
    geo.getCurrentPosition((position) => {
      sessionStorage.setItem('user_lng', position.coords.longitude + '');
      sessionStorage.setItem('user_lat', position.coords.latitude + '');
    });
  }

  get_user_lng(){
    return parseFloat(sessionStorage.getItem('user_lng') + '');
  }

  get_user_lat(){
    return parseFloat(sessionStorage.getItem('user_lat') + '');
  }

  get_user_marker(){
    if(parseFloat(this.pharmacie.latitude) != 0){
      this.marker.setLngLat([parseFloat(this.pharmacie.longitude), parseFloat(this.pharmacie.latitude)]);
      this.marker.addTo(this.map);
    }
    else{
      this.marker.setLngLat([-15.954111486755835, 18.069114191259317]);
      this.marker.addTo(this.map)
    }
  }
}
