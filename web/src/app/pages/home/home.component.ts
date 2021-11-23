import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/models/pharmacie';
import { Search } from 'src/app/models/search';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private app:AppComponent, private service: MedicamentService) { }
  title: string = "";
  Input: string = "";
  s: Search = new Search();
  pharmacies!: Pharmacie[];

  ngOnInit(): void {
    this.title = this.app.title;
  }

  search(event:any){
    this.service.get_medicaments(this.Input).subscribe(data => {
      this.pharmacies = data;
      console.log(data);
    });
  }
}
