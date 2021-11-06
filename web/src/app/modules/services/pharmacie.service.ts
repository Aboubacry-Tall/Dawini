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

  edit_telephone(id: number, telephone: Telephone): Observable<Telephone> {
    return this.http.post(this.server + 'edit-telephone/' + id, telephone);
  }
  edit_coordonnees(id: number, coordonnee: Coordonnee): Observable<Coordonnee> {
    return this.http.post(this.server + 'edit-coordonnee/' + id, coordonnee);
  }

  

  

  get_telephone(id: number): Observable<any> {
    return this.http.get(this.server + 'telephone/' + id);
  }
  get_coordonnees(id: number): Observable<any> {
    return this.http.get(this.server + 'coordonnee/' + id);
  }

  get_all_pharmacie(): Observable<any>{
    return this.http.get(this.server + 'pharmacie/list');
  }
}


  
