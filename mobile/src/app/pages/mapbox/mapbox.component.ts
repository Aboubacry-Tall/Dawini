import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { Pharmacie } from 'src/app/modules/models/pharmacie';
import { DataService } from 'src/app/modules/services/data.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit , AfterViewInit {


  value = '';
  map_mode: number = 1;
  map!: mapboxgl.Map
  markers!: [];
  popup!: [];
  map_directions : any;
  start = [];
  longitude : number;
  latitude : number;
  phs_distances = new Array();
  marker = new mapboxgl.Marker({ draggable: true, color: 'black'});
  pharmacie: Pharmacie = new Pharmacie();
  pharmacies!: Pharmacie[];
  private updateSubscription: Subscription;
  
 geolocate = new mapboxgl.GeolocateControl

  @ViewChild('coordinates') coordonnees!: ElementRef;
  
  constructor(private service: DataService,private locationAccuracy: LocationAccuracy, 
    private androidPermissions: AndroidPermissions) {}
  
  ngOnInit(): void {
    this.get_all_pharmacie();
    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.OnStart()});
    this.OnStart()
    }

  ngAfterViewInit(): void {
    this.getMap();
    this.map.on('load', () => {
      this.map.resize();
      this.geolocate.trigger();
    })
    this.testDirections();
  }

  get_all_pharmacie(){
    this.service.getPharmacies().subscribe(data =>{
      this.pharmacies = data;
      this.add_marker();
      this.testDirections()
    },
    error =>console.log(error));
  }

  OnStart(){
    const geo = navigator.geolocation
    geo.getCurrentPosition((position) => {
      this.longitude  = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.start=[this.longitude,this.latitude]
      this.map.flyTo({
        center: [ this.longitude, this.latitude ],
        zoom:12
      });
    });
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
          'circle-radius': 8,
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
            'circle-radius': 9,
            'circle-color': '#C61818'
          }
        });
      }
      this.getRoutes(coords);
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
      this.marker[i] = new mapboxgl.Marker(el);
      this.marker[i].setLngLat([this.pharmacies[i].longitude, this.pharmacies[i].latitude]);
      this.marker[i].setPopup(popup);
      this.marker[i].addTo(this.map);
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
      pitch: 60, // pitch in degrees
      bearing: 10 // bearing in degrees
    });

    // Language
    const language = new MapboxLanguage();
    this.map.addControl(language);
    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') { 
          mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (error: Error) => {});
    }
    // Default locate
    //this.marker.addTo(this.map);

    // controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    this.map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    this.map.addControl(
      this.geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true,
        fitBoundsOptions: {
          zoom: 15  
        }
        
      }),
      'bottom-right'
    );
  }

  set_map_style(mode: number): void{
    this.map_mode = mode;
    if(this.map_mode == 0){
      this.map.setStyle('mapbox://styles/ghostmap/ckvh14f5527ks14pkam2n7rn4');
    }else{
      this.map.setStyle('mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg');
    }
  }
    

}
