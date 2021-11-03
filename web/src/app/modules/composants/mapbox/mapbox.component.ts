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
  start = [-15.9421725293, 18.069114191];

  ngOnInit(): void {
    this.getMap();
    this.testDirections();
  }

  testDirections(): void {
    this.map.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      this.getRoutes(this.start);
    
      // Add starting point to the map
      this.map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: this.start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });
      // this is where the code from the next step will go
    });

    this.map.on('click', (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: 'FeatureCollection' as const,
        features: [
          {
            type: 'Feature' as const,
            properties: {},
            geometry: {
              type: 'Point' as const,
              coordinates: coords
            }
          }
        ]
      };
      const source: mapboxgl.GeoJSONSource = this.map.getSource('end') as mapboxgl.GeoJSONSource;
      if (this.map.getLayer('end')) {
        source.setData(end);
      } else {
        this.map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: coords
                  }
                }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      this.getRoutes(coords);
      console.log(coords);
    });
    
  }

  async getRoutes(end) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${this.start[0]},${this.start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    const geojson = {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: route
      }
    };

    const source: mapboxgl.GeoJSONSource = this.map.getSource('route') as mapboxgl.GeoJSONSource;

    if (this.map.getSource('route')) {
      source.setData(geojson);
    }else {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
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
      interactive: true,
      depart: [1,2],
      alternatives: false,
      language: "fr",
      constrols: {
        inputs: false,
        profileSwitcher: false,
        instructions: false
      }
    });

    //this.map.addControl(this.map_directions);
    
    console.log(`Mapbox GL JS v${mapboxgl.version}`);
    // mapboxgl.clearStorage();
  } 

}
