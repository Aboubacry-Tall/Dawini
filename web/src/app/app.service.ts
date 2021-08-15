import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  api: string = 'http://localhost:5000/users';

  constructor(private http: HttpClient){}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.api);
  }
}
