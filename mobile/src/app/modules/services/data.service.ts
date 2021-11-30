import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';


export class Medicament {
  id ?: number;
  nom ?: string ; 
  description ?: string;
  prix ?: number;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = "http://127.0.0.1:8000/api/mobile/";
  
  private database: SQLiteObject;
  medicamentsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient,private platform: Platform,
   private sqlite: SQLite, private sqlitePorter: SQLitePorter ) { 
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'medicaments.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.getData();
      });
    });
  }
  
    // Render medicaments data
    getData() {
      this.httpClient.get(
        'assets/medicaments.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlitePorter.importSqlToDb(this.database, data)
          .then(_ => {
            this.getMedicamentList();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
    
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchMedicaments(): Observable<Medicament[]> {
    return this.medicamentsList.asObservable();
  }

  // Get list
  getMedicamentList(){
    return this.database.executeSql('SELECT * FROM medicament', []).then(res => {
      let items: Medicament[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nom: res.rows.item(i).nom, 
            description: res.rows.item(i).description,
            prix: res.rows.item(i).prix,  
           });
        }
      }
      this.medicamentsList.next(items);
    });
  }



  getMedicaments(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'medicaments')
  }  
  getMedic(nom:string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl+'medicaments'}?nom=${nom}`)
  }
   
  getPharmacies(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'pharmacies')
  }
}
