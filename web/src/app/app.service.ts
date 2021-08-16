import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  api: string = 'http://localhost:5000';

  constructor(private http: HttpClient){}

  getData(): Observable<User[]>{
    return this.http.get<User[]>(this.api + '/data');
  }

  getUsers(): Observable<any>{
    return this.http.get(this.api + '/users');
  }
}
