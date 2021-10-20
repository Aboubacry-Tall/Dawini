import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicament } from '../models/medicament.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private server = "http://localhost:8000/api/web/";
  constructor(private http: HttpClient) { }

  create_medicament(medicament: Medicament): Observable<Medicament> {
    return this.http.post(this.server + 'create-medicament', medicament);
  }

  get_all_medicaments(pharmacie_id:number): Observable<any> {
    return this.http.get(this.server + 'medicaments?pharmacie=' + pharmacie_id);
  }
  getMedic(value:string): Observable<any>{
    return this.http.get(`${this.server}medic?value=${value}`)

    }
}
