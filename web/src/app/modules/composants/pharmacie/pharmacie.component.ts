import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Medicament } from '../../models/medicament.model';
import { Pharmacie } from '../../models/pharmacie.model';
import { Telephone } from '../../models/telephone.model';
import { MedicamentService } from '../../services/medicament.service';
import { PharmacieService } from '../../services/pharmacie.service';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmacieComponent implements OnInit {

  constructor(private app:AppComponent, private s_medicament: MedicamentService, private s_pharmacie: PharmacieService, private router: Router, private route : ActivatedRoute) { }
  title = this.app.title;
  hide = true;
  value ='';
  pharmacie: Pharmacie = new Pharmacie();
  telephone: Telephone = new Telephone();
  pharmacie_id!: number;
  medicament: Medicament = new Medicament();
  medicaments!: Medicament[];

  ngOnInit(): void {
    this.pharmacie_id= this.route.snapshot.params['id'];
    this.get_pharmacie(this.pharmacie_id);
    this.get_telephone(this.pharmacie_id);
    this.get_all_medicaments(this.pharmacie_id);
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
      console.log(data);
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  get_telephone(id:number){
    this.s_pharmacie.get_telephone(id).subscribe(data =>{
      console.log(data);
      this.telephone = data;
    },
    error =>console.log(error));
  }

  get_all_medicaments(pharmacie_id:number){
    this.s_medicament.get_all_medicaments(this.pharmacie_id).subscribe(data =>{
      console.log(data);
      this.medicaments = data;
    },
    error =>console.log(error));
  }

}
