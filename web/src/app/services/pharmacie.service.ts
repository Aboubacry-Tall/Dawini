import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pharmacie } from '../models/pharmacie';

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
    return this.http.post(this.server + 'pharmacie/create', pharmacie);
  }

  login_pharmacie(pharmacie: Pharmacie): Observable<any> {
    return this.http.post(this.server + 'pharmacie/login', pharmacie);
  }

  get_pharmacie(id: number): Observable<any> {
    return this.http.get(this.server + 'pharmacie/' + id);
  }

  edit_pharmacie(id: number, pharmacie: Pharmacie): Observable<any> {
    return this.http.post(this.server + 'pharmacie/edit/' + id, pharmacie);
  }

  get_all_pharmacie(): Observable<any>{
    return this.http.get(this.server + 'pharmacie/list');
  }

  get_pharmacies(name: string): Observable<any>{
    return this.http.get(this.server + 'pharmacie/list?medicament=' + name);
  }
}
