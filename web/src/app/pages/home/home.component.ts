import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CoreComponent } from 'src/app/common/core/core.component';
import { Medicament } from 'src/app/models/medicament';
import { Pharmacie } from 'src/app/models/pharmacie';
import { Search } from 'src/app/models/search';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private app:AppComponent, private service: MedicamentService, private core: CoreComponent) { }
  title: string = "";
  Input: string = "";
  s: Search = new Search();
  medicaments!: Medicament[];

  ngOnInit(): void {
    this.title = this.app.title;
  }

  search(){
    this.service.get_medicaments(this.Input).subscribe(data => {
      this.medicaments = data;
    });
  }

  verifier(){
    if(this.medicaments.length < 1)
      this.core.openDialog(270, 'invalide', 'Médicament [' + this.Input + '] introuvable');
  }
}
