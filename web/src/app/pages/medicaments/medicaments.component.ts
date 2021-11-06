import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Medicament } from 'src/app/models/medicament';
import { Pharmacie } from 'src/app/models/pharmacie';
import { MedicamentService } from 'src/app/services/medicament.service';
import { PharmacieService } from 'src/app/services/pharmacie.service';

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {

  constructor(private app:AppComponent, private s_medicament: MedicamentService, private s_pharmacie: PharmacieService, private router: Router, private route : ActivatedRoute) { }
  title = this.app.title;
  hide = true;
  value ='';
  pharmacie: Pharmacie = new Pharmacie();
  pharmacie_id!: number;
  medicament: Medicament = new Medicament();
  medicaments!: Medicament[];

  ngOnInit(): void {
    this.pharmacie_id= this.route.snapshot.params['id'];
    this.search();
  }

  create_medicament(){
    this.medicament.pharmacie_id = this.pharmacie_id;
    this.s_medicament.create_medicament(this.medicament).subscribe(data =>{
      console.log(data);
    },
    error =>console.log(error));
    location.reload();
  }

  get_pharmacie(id:number){
    this.s_pharmacie.get_pharmacie(id).subscribe(data =>{
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  get_all_medicaments(pharmacie_id:number){
    this.s_medicament.get_all_medicaments(this.pharmacie_id).subscribe(data =>{
      this.medicaments = data;
    },
    error =>console.log(error));
  }
  
  onSearch(event:any){
    this.s_medicament.search_medicament(this.value,this.pharmacie_id).subscribe(data =>{
      this.medicaments=data;
    });
  }

  search(){
    this.s_medicament.search_medicament(this.value,this.pharmacie_id).subscribe(data =>{
      console.log(data);
      this.medicaments=data;
    });
  }

}
