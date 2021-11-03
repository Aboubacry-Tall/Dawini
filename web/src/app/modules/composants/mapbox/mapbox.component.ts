import { Component, OnInit } from '@angular/core';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

  constructor() { }

  map!: mapboxgl.Map;
  map_directions : any;

  ngOnInit(): void {
    this.getMap();
  }

  getMap(): void{
    mapboxgl.prewarm();
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (error: Error) => {});
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
    
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg', // style URL
      center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
      zoom: 12.3, 
      pitch: 60, // pitch in degrees
      bearing: 10 // bearing in degrees
    });

    const language = new MapboxLanguage();
    this.map.addControl(language);

    this.map_directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: false,
      alternatives: true,
      language: "fr",
      constrols: {
        inputs: false,
        profileSwitcher: false,
        instructions: false
      }
    });

    this.map.addControl(this.map_directions);
    
    console.log(`Mapbox GL JS v${mapboxgl.version}`);
    // mapboxgl.clearStorage();
  } 

}
