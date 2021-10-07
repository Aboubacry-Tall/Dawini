import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicament } from './medicament';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "http://127.0.0.1:8000/api/medicament";

  constructor(private http: HttpClient) { }

   
  getMedicaments(): Observable<any>{
    return this.http.get(this.baseUrl)

    }
}
