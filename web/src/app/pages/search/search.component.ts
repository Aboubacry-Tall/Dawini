import { PharmacieService } from 'src/app/modules/services/pharmacie.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as GeoJSON from 'geojson';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  
  source: any;
  markers: any;
  constructor(private s_pharmacie: PharmacieService,) { }

  ngOnInit(): void {
    this.getMap()
    
    this.markers = this.s_pharmacie.getMarkers()
  }
  
  getMap(){
    
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
    pitch: 60,
    zoom: 13, // starting zoom
    });


    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
        map.flyTo({
          center: [lng, lat]
        })
        

    
    const marker1 = new mapboxgl.Marker({ color: 'blue', rotation: 45 })
    .setLngLat([lng, lat])
    marker1.addTo(map)
  });
}

    /// Add map controls
    map.addControl(new mapboxgl.NavigationControl());


    map.on('load', (event) => {
      
      map.addSource('customMarker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
  });
    
    /// get source
    const markers = this.markers;
    const data = {
      type: 'FeatureCollection',
      features: markers
    };
    this.source = map.getSource('customMarker')
    
    this.source.setData(data)
      
    // Add markers to the map.
    for (const marker of markers) {
      
      // Add markers to the map.
      new mapboxgl.Marker({ color: 'green', rotation: 45 })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
      
      console.log(marker.properties.message)
      }
      
      map.on('click', function(e) {
        const coordinates = e.lngLat;
        const x = e.lngLat.lng;
        const y = e.lngLat.lat;
        
        map.flyTo({
          center: [x, y]
        })

      })
  
    map.addLayer({
      id: 'customMarketid',
      source: 'customMarker',
      type: 'symbol',
      layout: {
        'text-field': '{message}',
      'text-size': 14,
      'text-transform': 'uppercase',
      'text-offset': [0, -2.5]
    },
    paint: {
      'text-color': '#c47a0e',
      'text-halo-color': '#fff',
      'text-halo-width': 2
    }
  }); 

    });
  }
}
