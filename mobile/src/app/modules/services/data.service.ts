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

  private baseUrl = "http://127.0.0.1:8000/api/apps/";
  
  private database: SQLiteObject;
  medicamentsList = new BehaviorSubject([]);
  medicaments = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  insert=false
  constructor(private httpClient: HttpClient,private platform: Platform,
   private sqlite: SQLite, private sqlitePorter: SQLitePorter ) { 
  }

  DataBase(){
    if(this.insert==true){
      console.log('true')
    }else{
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'medicaments.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
            console.log('false')
            this.getData();
        
      });
    });
  }
  }
    // Render medicaments data
    getData() {
      this.httpClient.get(
        'assets/medicaments.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlitePorter.importSqlToDb(this.database, data)
          .then(_ => {
            this.isDbReady.next(true);
            this.getMedicamentsList()
            this.insert=true
          })
          .catch(error => console.error(error));
      });
    }
    
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchAllMedicaments(): Observable<Medicament[]> {
    return this.medicamentsList.asObservable();
  }

  // Get all medicaments list
  getMedicamentsList(){
    return this.database.executeSql('SELECT DISTINCT * FROM medicament WHERE prix<60', []).then(res => {
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

  fetchMedicament(): Observable<Medicament[]> {
    return this.medicaments.asObservable();
  }

  getMedicament(nom:string){
    if(nom!=''){
      return this.database.executeSql(`SELECT DISTINCT * FROM medicament WHERE UPPER(nom) like '${nom}%' `, []).then(res => {
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
        this.medicaments.next(items);
      });
    }else{
      this.getMedicamentsList()
    }
  }  
  getPharmacies(): Observable<any>{
    return this.httpClient.get(this.baseUrl+'pharmacie/list')
  }
  
  search_pharmacie(name: string): Observable<any>{
    return this.httpClient.get(this.baseUrl + 'pharmacies/search/pharmacie?name=' + name);
  }
}
