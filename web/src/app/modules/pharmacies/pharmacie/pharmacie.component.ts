import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Medicament } from '../../medicaments/models/medicament';
import { MedicamentsService } from '../../medicaments/services/medicaments.service';
import { Pharmacie } from '../models/pharmacie';
import { PharmaciesService } from '../services/pharmacies.service';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmacieComponent implements OnInit {

  constructor(private app:AppComponent, private serviceMedicament: MedicamentsService, private servicePharmacie: PharmaciesService, private router: Router, private route : ActivatedRoute) { }
  title = this.app.title;
  hide = true;
  value ='';
  pharmacie: Pharmacie = new Pharmacie();
  pharmacie_id!: number;
  medicament: Medicament = new Medicament();
  medicaments!: Medicament[];

  ngOnInit(): void {
    this.pharmacie_id= this.route.snapshot.params['id'];
    this.get_pharmacie(this.pharmacie_id);
    this.get_all_medicaments(this.pharmacie_id);
  }

  create_medicament(){
    this.medicament.pharmacie_id = this.pharmacie_id;
    this.serviceMedicament.create_medicament(this.medicament).subscribe(data =>{
      console.log(data);
    },
    error =>console.log(error));
    location.reload();
  }

  get_pharmacie(id:number){
    this.servicePharmacie.get_pharmacie(id).subscribe(data =>{
      console.log(data);
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  get_all_medicaments(pharmacie_id:number){
    this.serviceMedicament.get_all_medicaments(this.pharmacie_id).subscribe(data =>{
      console.log(data);
      this.medicaments = data;
    },
    error =>console.log(error));
  }
}
