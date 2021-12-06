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
  Input: string = '';
  count_alert: number = 0;
  pharmacie: Pharmacie = new Pharmacie();
  pharmacie_id: number = this.route.snapshot.params['id'];
  medicaments_online!: Medicament[];
  medicaments_offline!: Medicament[];

  ngOnInit(): void {
    this.get_pharmacie(this.pharmacie_id);
    this.get_medicaments_online();
    this.get_medicaments_offline();
  }

  get_pharmacie(id:number){
    this.s_pharmacie.get_pharmacie(id).subscribe(data =>{
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  get_medicaments_online(): void{
    this.s_medicament.get_medicaments_online(this.pharmacie_id).subscribe(data =>{
      this.medicaments_online = data;
      for (let medicament of this.medicaments_online){
        medicament.etat = true;
      }
    });
  }

  get_medicaments_offline(): void{
    this.s_medicament.get_medicaments_offline(this.pharmacie_id).subscribe(data =>{
      this.medicaments_offline = data;
      for (let medicament of this.medicaments_offline){
        medicament.etat = false;
      }
      this.count_alert = this.medicaments_offline.length;
    });
  }

  set_etat(medicament_id: number | undefined){
    this.s_medicament.set_medicament_etat(medicament_id, this.pharmacie_id).subscribe(data =>{
      this.get_medicaments_online();
      this.get_medicaments_offline();
      console.log(medicament_id + ' ------- ' + this.pharmacie_id);
    });
  }
}
