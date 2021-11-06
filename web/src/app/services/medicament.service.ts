import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicament } from '../models/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private server = "http://localhost:8000/api/apps/";
  constructor(private http: HttpClient) { }

  create_medicament(medicament: Medicament): Observable<Medicament> {
    return this.http.post(this.server + 'medicament/create', medicament);
  }

  get_all_medicament(pharmacie_id:number): Observable<any> {
    return this.http.get(this.server + 'medicaments?pharmacie=' + pharmacie_id);
  }
  
  search_medicament(value:string,pk:number): Observable<any>{
    return this.http.get(`${this.server}medicament-search/${pk}?value=${value}`)
  }
}
