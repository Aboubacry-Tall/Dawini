import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { Pharmacie } from 'src/app/modules/models/pharmacie';
import { DataService } from 'src/app/modules/services/data.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { interval, Subscription } from 'rxjs';
import { SheetState } from 'ion-bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Medicament } from 'src/app/modules/models/medicament';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.scss'],
})
export class MedicamentComponent implements OnInit {
  
  
  mapM!: mapboxgl.Map
  start = [];
  longitude : number;
  latitude : number;
  value = '';
  marker = new mapboxgl.Marker();
  pharmacie: Pharmacie = new Pharmacie();
  pharmacies!: Pharmacie[];
  medicaments!: Medicament[];
  medicament: Medicament = new Medicament();
  geolocate = new mapboxgl.GeolocateControl;
  updateSubscription: Subscription;
  name = this.route.snapshot.params['name'];
  description = sessionStorage.getItem('medicament_description');
  Input: string =  this.name + this.description;
  
  sheetState = SheetState.Docked;
  title = "Liste des pharmacies";
  dockedHeight = 300;
  hideCloseButton = true;
  minHeight = 50;
  enableScrollContent = true;
  hideDragIcon = true;
  titleCentered = true;
  topDistance= 120;
  

  @ViewChild('coordinates') coordonnees!: ElementRef;
  
  constructor(private service: DataService,private route: ActivatedRoute,private locationAccuracy: LocationAccuracy, 
    private androidPermissions: AndroidPermissions) {}
  
  ngOnInit(): void {
     this.OnStart()
    this.seach_pharmacies_online()
    }

  ngAfterViewInit(): void {
    this.getMap();
    this.mapM.on('load', () => {
      this.mapM.resize();
      this.geolocate.trigger()
    })
     this.testDirections();
  }

  OnStart() {
    const geo = navigator.geolocation
    geo.getCurrentPosition((position) => {
      sessionStorage.setItem('user_lng', position.coords.longitude + '');
      sessionStorage.setItem('user_lat', position.coords.latitude + '');
      this.start=[parseFloat(sessionStorage.getItem('user_lng') + ''),parseFloat(sessionStorage.getItem('user_lat') + '')]
    });
}

  get_medicaments():void {
    this.service.get_medicaments(this.Input).subscribe(data => {
      this.medicaments = data;
    });
  }
  
  search(medicament: Medicament):void {
    this.service.get_pharmacies_online(medicament).subscribe(data => {
      this.pharmacies = data;
      this.OnStart()
      this.get_distance()
      this.getMap()
      this.add_marker();
      this.testDirections()
    });
  }


  seach_pharmacies_online():void {
    this.medicament.nom = this.name;
    this.medicament.description = this.description + '';
    this.service.get_pharmacies_online(this.medicament).subscribe(data => {
      this.pharmacies = data;
      this.get_distance()
      this.getMMap()
      this.add_marker();
      this.testDirections()
    });
  }


  OpenSheet(){
    this.sheetState = SheetState.Docked;
  }

  get_distance(): void {
    const [lng, lat] = [ parseFloat(sessionStorage.getItem('user_lng') + ''),parseFloat(sessionStorage.getItem('user_lat') + '') ];
    const from = turf.point([lng, lat]);
    const to = turf.point([0, 0]);
    const phs = [
      {
        "ph_id": "",
        "ph_distance": ""
      }
    ];
    
    for(let i = 0; i < this.pharmacies.length; i++){
      const to = turf.point([parseFloat(this.pharmacies[i].longitude + ''), parseFloat(this.pharmacies[i].latitude + '')]);
      const ph = {
        "ph_id": this.pharmacies[i].id + '',
        "ph_distance": turf.distance(from, to) + ''
      }
      phs.push(ph); 
      this.pharmacies[i].distance = parseFloat(ph.ph_distance).toFixed(2);
    };
    phs.shift();
    const s_phs = phs.sort((a, b) => parseFloat(a.ph_distance) - parseFloat(b.ph_distance));
    this.pharmacies = this.pharmacies.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    
  }

  testDirections(): void {
    this.mapM.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      this.getRoutes(this.start);
    
      // Add starting point to the map
      this.mapM.addLayer({
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

    this.mapM.on('click', (event) => {
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
      const source: mapboxgl.GeoJSONSource = this.mapM.getSource('end') as mapboxgl.GeoJSONSource;
      if (this.mapM.getLayer('end')) {
        source.setData(end);
      } else {
        this.mapM.addLayer({
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
            'circle-radius': 8,
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
    console.log('data'+data)
    const geojson = {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: route
      }
    };

    const source: mapboxgl.GeoJSONSource = this.mapM.getSource('route') as mapboxgl.GeoJSONSource;

    if (this.mapM.getSource('route')) {
      source.setData(geojson);
    }else {
      this.mapM.addLayer({
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
      this.marker[i].addTo(this.mapM);
    }
  }

  flyToPharmacie(pharmacie: Pharmacie){
    this.mapM.flyTo({
      center: [parseFloat(pharmacie.longitude + ''), parseFloat(pharmacie.latitude + '')],
      zoom: 15
    });
  }

  getMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.mapM = new mapboxgl.Map({
      container: 'mapM', // container ID
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg', // style URL
      center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
      zoom: 12.3, 
      pitch: 60, // pitch in degrees
      bearing: 10 // bearing in degrees
    });

    // Language
    const language = new MapboxLanguage();
    this.mapM.addControl(language);
    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') { 
          mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (error: Error) => {});
    }

    // controls
    this.mapM.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    this.mapM.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    this.mapM.addControl(
      this.geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,timeout:3000
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

  getMMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.mapM = new mapboxgl.Map({
      container: 'mapM', // container ID
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg', // style URL
      center: [-15.942172529368463, 18.069114191259317], // starting position [lng, lat]
      zoom: 12.3, 
      pitch: 60, // pitch in degrees
      bearing: 10 // bearing in degrees
    });

    // controls
    this.mapM.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    this.mapM.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    this.mapM.addControl(
      this.geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,timeout:3000
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
    
  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.enableGPS();
        } else {
          this.locationAccPermission();
        }
      },
      error => {
        console.log()
      }
    );
  }

  locationAccPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.enableGPS();
            },
            error => {
              console.log()
            }
          );
      }
    });
  }

  enableGPS() {
        
        const geo = navigator.geolocation
        geo.getCurrentPosition((position) => {
          this.longitude  = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.start=[this.longitude,this.latitude]
        });
  }


}
