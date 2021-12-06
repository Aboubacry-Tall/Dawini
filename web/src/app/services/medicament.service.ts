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
    return this.http.get(`${this.server}medicaments/list?pharmacie=${pharmacie_id}`);
  }

  get_medicaments(name: string): Observable<any> {
    return this.http.get(this.server + 'medicaments/search?name=' + name);
  }
  
  search_medicament(value:string,pk:number): Observable<any>{
    return this.http.get(`${this.server}medicament-search/${pk}?value=${value}`);
  }

  get_all_medicaments(): Observable<any>{
    return this.http.get(this.server + 'medicaments/pharmacie');
  }

  get_medicaments_online(id: number | undefined): Observable<any>{
    return this.http.get(this.server + 'medicaments/online?id=' + id);
  }

  get_medicaments_offline(id: number | undefined): Observable<any>{
    return this.http.get(this.server + 'medicaments/offline?id=' + id);
  }

  set_medicament_etat(medicament_id: number | undefined, pharmacie_id: number): Observable<any> {
    return this.http.get(this.server + 'medicaments/set-etat?medicament=' + medicament_id + '&pharmacie=' + pharmacie_id);
  }
}
