import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements AfterViewInit {

  constructor() { }
  
  @ViewChild("menu") mymenu!: ElementRef;

  ngAfterViewInit(): void {
    //mapboxgl.accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
    const map = new mapboxgl.Map({
      container: 'mapid', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-2.81361, 36.77271], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });

    alert('oki2');
    const parentElement = this.mymenu.nativeElement;
    const inputs = parentElement.children[3];
    alert('oki2');
    for (const input of inputs) {
      alert('oki2');
      input.onclick = (layer:any) => {
        const layerId = layer.target.id;
        alert(layerId);
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      };
    }

    //map.addControl(new mapboxgl.NavigationControl());
  }

  setStyle(){
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw';
      
    const map = L.mapbox.map('map').setView([38.912753, -77.032194], 15).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));;
    const gl = L.mapboxGL({
        accessToken: 'pk.eyJ1IjoiZ2hvc3RtYXAiLCJhIjoiY2tzeXNxajBhMGFsODJ3bW9kYWg2eXJuZSJ9.EvLTJYcyz4JZ1y41sqF8nw',
        style: 'mapbox://styles/mapbox/bright-v8'
    }).addTo(map)
  }

}

interface SelectProtected {
  readonly wrapperElement: HTMLDivElement;
  readonly inputElement: HTMLInputElement;
}
