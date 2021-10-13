import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicament } from '../models/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentsService {

  private server = "http://localhost:8000/api/web/";
  constructor(private http: HttpClient) { }

  create_medicament(medicament: Medicament): Observable<Medicament> {
    return this.http.post(this.server + 'create-medicament', medicament);
  }

  get_all_medicaments(): Observable<any> {
    return this.http.get(this.server + 'medicaments');
  }

}
