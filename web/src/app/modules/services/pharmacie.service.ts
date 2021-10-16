import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pharmacie } from '../models/pharmacie.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {

  private server = "http://localhost:8000/api/web/";
  constructor(private http: HttpClient) { }

  create_pharmacie(pharmacie: Pharmacie): Observable<Pharmacie> {
    /*
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pharmacie);
    console.log(body)
    */
    return this.http.post(this.server + 'create-pharmacie', pharmacie);
  }

  login_pharmacie(pharmacie: Pharmacie): Observable<any> {
    return this.http.post(this.server + 'login-pharmacie', pharmacie);
  }

  get_pharmacie(id: number): Observable<any> {
    return this.http.get(this.server + 'pharmacie/' + id);
  }
}
