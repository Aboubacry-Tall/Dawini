import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "http://127.0.0.1:8000/api/mobile/";

  constructor(private http: HttpClient) { }

   
  getMedicaments(): Observable<any>{
    return this.http.get(this.baseUrl+'medicaments')
  }  
  getMedic(nom:string): Observable<any>{
    return this.http.get(`${this.baseUrl+'medicaments'}?nom=${nom}`)
  }
   
  getPharmacies(): Observable<any>{
    return this.http.get(this.baseUrl+'pharmacies')
  }
}
