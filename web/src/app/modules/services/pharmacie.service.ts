import { Coordonnee } from './../models/coordonnee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pharmacie } from '../models/pharmacie.model';
import { Telephone } from '../models/telephone.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {

  private server = "http://localhost:8000/api/apps/";
  constructor(private http: HttpClient) { }

  create_pharmacie(pharmacie: Pharmacie): Observable<any> {
    /*
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pharmacie);
    console.log(body)
    */
    return this.http.post(this.server + 'create-pharmacie', pharmacie);
  }

  edit_pharmacie(id: number, pharmacie: Pharmacie): Observable<any> {
    return this.http.post(this.server + 'edit-pharmacie/' + id, pharmacie);
  }

  edit_telephone(id: number, telephone: Telephone): Observable<Telephone> {
    return this.http.post(this.server + 'edit-telephone/' + id, telephone);
  }
  edit_coordonnees(id: number, coordonnee: Coordonnee): Observable<Coordonnee> {
    return this.http.post(this.server + 'edit-coordonnee/' + id, coordonnee);
  }

  login_pharmacie(pharmacie: Pharmacie): Observable<any> {
    return this.http.post(this.server + 'login-pharmacie', pharmacie);
  }

  get_pharmacie(id: number): Observable<any> {
    return this.http.get(this.server + 'pharmacie/' + id);
  }

  get_telephone(id: number): Observable<any> {
    return this.http.get(this.server + 'telephone/' + id);
  }
  get_coordonnees(id: number): Observable<any> {
    return this.http.get(this.server + 'coordonnee/' + id);
  }
  getMarkers1() {
    var geoJson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -15.947924357070178,
              18.082196550700672
            ]
          },
          "properties": {
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
              -15.907924357070178,
              18.092196550700672
            ]
          },
          "properties": {
            "phoneFormatted": "(202) 507-8357",
            "phone": "2025078357",
            "address": "2221 I St NW",
            "city": "Washington DC",
            "country": "United States",
            "crossStreet": "at 22nd St NW",
            "postalCode": "20037",
            "state": "D.C."
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -77.043929,
              38.910525
            ]
          },
          "properties": {
            "phoneFormatted": "(202) 387-9338",
            "phone": "2023879338",
            "address": "1512 Connecticut Ave NW",
            "city": "Washington DC",
            "country": "United States",
            "crossStreet": "at Dupont Circle",
            "postalCode": "20036",
            "state": "D.C."
          }
        },
    ]
  }
    return geoJson;
  }

  getMarkers() {
    const geoJson = [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [-16.00000000000,18.092196550700672 ]
      },
      'properties': {
        'message': 'Pharmacie Tall'
      }
    }, {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [-15.967924357070178,18.12196550700672 ]
      },
      'properties': {
        'message': 'Pharmacie Cheikh'
        
      }
    }];
    return geoJson;
  }

  get_all_pharmacie(): Observable<any>{
    return this.http.get(this.server + 'pharmacie/list');
  }
}


  
