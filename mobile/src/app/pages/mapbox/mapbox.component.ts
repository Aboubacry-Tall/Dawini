import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {

  map: mapboxgl.Map;

  constructor() { }

  ngOnInit() {
    this.getMap();
    this.map.on('load', () => {
      this.map.resize();
  });
  }
  getMap(){
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw';
    this.map = new mapboxgl.Map({
    container: 'mapid', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-15.9749,18.0796], // starting position [lng, lat]
    pitch: 50,
    zoom: 9 ,// starting zoom
    
    });
    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());
    
    this.map.addControl(new mapboxgl.FullscreenControl());

    //map.addControl(new mapboxgl.FullscreenControl());
    //map.addControl(new mapboxgl.NavigationControl());


    /*
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
    .setLngLat([12.554729, 55.70651])
    .addTo(map);
    
    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
    .setLngLat([12.65147, 55.608166])
    .addTo(map);
    */
    
  }
}
