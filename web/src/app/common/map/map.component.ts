import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }
  map!: mapboxgl.Map;

  ngOnInit(): void {
  }

  create_map(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg',
      center: [-15.942172529368463, 18.069114191259317], 
      zoom: 12.3, 
      pitch: 60,
      bearing: 10
    });
  }

}
