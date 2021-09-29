import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.scss'],
})
export class PharmacieComponent implements OnInit, OnDestroy {

  constructor() { }
  map: Leaflet.Map;

  ngOnDestroy(): void {
    this.map.remove();
  }

  ngOnInit() {
  }
  ionViewDidEnter() { this.leafletMap(); }
  leafletMap() {
    this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

  }
  
}
