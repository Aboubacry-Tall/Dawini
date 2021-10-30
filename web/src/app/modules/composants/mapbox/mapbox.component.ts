import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  [x: string]: any;

  constructor() { }
  map!: mapboxgl.Map;

  ngOnInit(): void {
    this.getMap();
  }

  getMap(){
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXN4YmxpMGFzajJ1bW9xOXRkeG10ZSJ9.q6yvHK5OCnSVLOKUj48lpw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-77.034084, 38.909671],
      zoom: 13,
      scrollZoom: false
    });

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: 'green', rotation: 45 })
    .setLngLat([-15.948172708169068, 18.04098244539739])
    .addTo(this.map);

    ////////////////////////////////////////////////////////////////////////////////////////////////

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });

    // Add the control to the map.
    this.map.addControl(geolocate);
      geolocate.on('geolocate', () => {
      console.log('A geolocate event has occurred.');
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////

    
    this.stores.features.forEach(function (store, i) {
      store.properties.id = i + "";
    });

    this.map.on('load', () => {
      /* Add the data to your map as a layer */
      this.map.addLayer({
        id: 'locations',
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.034084142948,
                    38.909671288923
                  ]
                },
                "properties": {
                  "id": "",
                  "phoneFormatted": "(202) 234-7336",
                  "phone": "2022347336",
                  "address": "1471 P St NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at 15th St NW",
                  "postalCode": "20005",
                  "state": "D.C."
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    -77.049766,
                    38.900772
                  ]
                },
                "properties": {
                  "id": "",
                  "phoneFormatted": "(202) 507-8357",
                  "phone": "2025078357",
                  "address": "2221 I St NW",
                  "city": "Washington DC",
                  "country": "United States",
                  "crossStreet": "at 22nd St NW",
                  "postalCode": "20037",
                  "state": "D.C."
                }
              }
            ]
          }
        }
      });
    });

    this.map.on('click', (event) => {
      console.log(`A click event has occurred at ${event.lngLat}`);
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: ['locations']
      });
    
      /* If it does not exist, return */
      if (!features.length) return;
    
      const clickedPoint = features[0];
    
      /* Fly to the point */
      this.flyToStore(clickedPoint as any);
    });

    this.buildLocationList(this.stores);
    

  }  

  

  stores = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.034084142948,
            38.909671288923
          ]
        },
        "properties": {
          "id": "",
          "phoneFormatted": "(202) 234-7336",
          "phone": "2022347336",
          "address": "1471 P St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 15th St NW",
          "postalCode": "20005",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.049766,
            38.900772
          ]
        },
        "properties": {
          "id": "",
          "phoneFormatted": "(202) 507-8357",
          "phone": "2025078357",
          "address": "2221 I St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 22nd St NW",
          "postalCode": "20037",
          "state": "D.C."
        }
      }
    ]
  };

  


  buildLocationList(stores: { features: any; }) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById('listings');
      if(listings != null){
        const listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';
    
        /* Add the link to the individual listing created above. */
        const link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = `link-${store.properties.id}`;
        link.innerHTML = `${store.properties.address}`;
    
        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement('div'));
        details.innerHTML = `${store.properties.city}`;

        if (store.properties.phone) {
          details.innerHTML += ` · ${store.properties.phoneFormatted}`;
        }
        if (store.properties.distance) {
          const roundedDistance = Math.round(store.properties.distance * 100) / 100;
          details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
        }

        link.addEventListener('click', function () {
          const mapbox = new MapboxComponent;
          mapbox.getLink();
        });
      }
    }
  }
  getLink() {
      for (const feature of this.stores.features) {
        const listings = document.getElementById('listings');
        if(listings != null){
          const listing = listings.appendChild(document.createElement('div'));
          const link = listing.appendChild(document.createElement('a'));
          if (link.id === `link-${feature.properties.id}`) {
            this.flyToStore(feature);
            this.createPopUp(feature);
          }
        }
        
      }
      const activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    
  }


  flyToStore(currentFeature: { geometry: { coordinates: any; }; }) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
  
  createPopUp(currentFeature: { type?: string; geometry: any; properties: any; }) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
  
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(this.map);
  }

}
