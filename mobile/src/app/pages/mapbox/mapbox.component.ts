import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getMap();
  }
  getMap(){
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw';
    const map = new mapboxgl.Map({
    container: 'mapid', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [12.550343, 55.665957], // starting position [lng, lat]
    pitch: 60,
    zoom: 9 // starting zoom
    });

    map.on('load', function () {
      map.resize();
    });
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
