import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Medicament } from '../../medicaments/models/medicament';
import { MedicamentsService } from '../../medicaments/services/medicaments.service';
import { Pharmacie } from '../models/pharmacie';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmacieComponent implements OnInit {

  constructor(private app:AppComponent, private service: MedicamentsService, private router: Router, private route : ActivatedRoute) { }
  title = this.app.title;
  hide = true;
  value ='';
  id_pharmacie: number = -1;
  pharmacie: Pharmacie = new Pharmacie();
  medicament: Medicament = new Medicament();
  medicaments!: Medicament[];
  ngOnInit(): void {
    this.id_pharmacie= this.route.snapshot.params['id'];
    this.get_all_medicaments();
  }

  create_medicament(){
    this.service.create_medicament(this.medicament).subscribe(data =>{
      console.log(data);
    },
    error =>console.log(error));
    location.reload();
  }

  get_all_medicaments(){
    this.service.get_all_medicaments().subscribe(data =>{
      console.log(data);
      this.medicaments = data;
    },
    error =>console.log(error));
  }
}
