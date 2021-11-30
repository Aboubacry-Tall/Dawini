import { Component, OnInit } from '@angular/core';
import { Pharmacie } from 'src/app/models/pharmacie';
import { ActivatedRoute } from '@angular/router';
import { PharmacieService } from 'src/app/services/pharmacie.service';
import { Medicament } from 'src/app/models/medicament';
import { MedicamentService } from 'src/app/services/medicament.service';
import { CoreComponent } from 'src/app/common/core/core.component';
import { marker } from 'leaflet';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import * as turf from '@turf/turf';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private s_ph: PharmacieService, private m_ph: MedicamentService, private core: CoreComponent) { }
  name: string = '';
  map!: mapboxgl.Map;
  map_mode: number = 1;
  Input: string = this.route.snapshot.params['name'];
  pharmacies!: Pharmacie[];
  medicaments!: Medicament[];
  pharmacie: Pharmacie = new Pharmacie();
  start = [ parseFloat(sessionStorage.getItem('user_lng') + ''), parseFloat(sessionStorage.getItem('user_lat') + '') ];

  ngOnInit(): void {
    this.get_pharmacies();
  }

  search(){
    this.m_ph.get_medicaments(this.Input).subscribe(data => {
      this.medicaments = data;
    });
  }

  get_pharmacies(): void { 
    if(this.route.snapshot.params['name']){
      this.name = this.route.snapshot.params['name'];
      this.s_ph.get_pharmacies(this.name).subscribe(data => {
        this.pharmacies = data;
        this.map_Init();
        this.get_distance();
        this.get_pharmacies_markers();
        this.get_direction();
      });
    }else{
      this.s_ph.get_all_pharmacie().subscribe(data => {
        this.pharmacies = data;
        this.map_Init();
        this.get_distance();
        this.get_pharmacies_markers();
        this.get_direction();
      });
    }
  }

  get_pharmacies_search(name:string | undefined): void {
    this.s_ph.get_pharmacies(this.Input).subscribe(data => {
      this.pharmacies = data;
    });
  }

  verifier(){
    if(this.medicaments.length < 1)
      this.core.openDialog(270, 'invalide', 'Médicament [' + this.Input + '] introuvable');
  }

  map_Init(){
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ghostmap/ckvemallz25uu15nwdw9hs9qg',
      center: [-15.954111486755835, 18.069114191259317], 
      zoom: 12.2, 
      pitch: 60,
      bearing: 9,
    });

    // Language
    const language = new MapboxLanguage();
    this.map.addControl(language);
    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') { 
          mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (error: Error) => {});
    }
    // controls
    this.map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Positions
    this.get_user_marker();
  }

  get_user_marker(): void{
    const [lng, lat] = [ sessionStorage.getItem('user_lng'), sessionStorage.getItem('user_lat') ];
    const el = document.createElement('div');
    el.style.backgroundImage = 'url("../../../../assets/images/l7.png")';
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = 'cover';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';
    el.style.transition = 'width 2s, height 4s';
    el.addEventListener("dblclick", function( event ) {
      el.style.display = 'none',
      false
    });
    const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(
      '<h5 class="mt-3"> Votre position' + '</h5>'
    );
    new mapboxgl.Marker(el)
      .setLngLat([parseFloat(lng+ ''), parseFloat(lat + '')])
      .setPopup(popup)
      .addTo(this.map);
  }

  get_distance(): void {
    const [lng, lat] = [ parseFloat(sessionStorage.getItem('user_lng') + ''), parseFloat(sessionStorage.getItem('user_lat') + '') ];
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
    const pharmacies = this.pharmacies.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  }

  get_img(){
    let img = '';
    let name = this.pharmacie.nom + '';
    console.log(name);

    if(this.pharmacie.nom != undefined){
      if(this.pharmacie.nom.length > 1){
        img = 'url("../../../../assets/images/ph.png")';
      }else{
        img = 'url("../../../../assets/images/ph.png")';
      }
    }else{
      img = 'url("../../../../assets/images/ph.png")';
    }
    console.log(img);
    return img;
  }

  get_pharmacies_markers(){
    const el = document.createElement('div');
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );

    for(let i = 0; i < this.pharmacies.length; i++){
      const el = document.createElement('div');
      el.style.backgroundImage = this.get_img();
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        '<h4 class="pt-3"> Ph. ' + this.pharmacies[i].nom + '</h4>'
      );
      marker[i] = new mapboxgl.Marker(el);
      marker[i].setLngLat([this.pharmacies[i].longitude, this.pharmacies[i].latitude]);
      marker[i].setPopup(popup);
      marker[i].addTo(this.map);
    }
  }

  flyToPharmacie(pharmacie: Pharmacie){
    this.map.flyTo({
      center: [parseFloat(pharmacie.longitude + ''), parseFloat(pharmacie.latitude + '')],
      zoom: 16
    });
  }

  get_direction(): void {
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
          'line-opacity': 0.80
        }
      });
    }
  }

}
