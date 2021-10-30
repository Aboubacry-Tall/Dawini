import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "http://127.0.0.1:8000/api/mobile/medicaments";

  constructor(private http: HttpClient) { }

   
  getAllMedicaments(): Observable<any>{
    return this.http.get(this.baseUrl)

    }  
    getMedic(nom:string): Observable<any>{
      return this.http.get(`${this.baseUrl}?nom=${nom}`)
  
      }
}
