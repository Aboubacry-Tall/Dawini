import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicament } from 'src/app/models/medicament';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-medicaments-base',
  templateUrl: './medicaments-base.component.html',
  styleUrls: ['./medicaments-base.component.css']
})
export class MedicamentsBaseComponent implements OnInit {

  constructor(private service: MedicamentService, private route: ActivatedRoute) { }

  Name: string = '';
  page: number = 1;
  medicament: Medicament = new Medicament();
  medicaments!: Medicament[];

  ngOnInit(): void {
    this.get_medicaments();
  }

  get_medicaments(){
    this.service.get_medicaments_base(this.page).subscribe(data => {
      this.medicaments = data;
    });
  }

  suivant(){
    this.page = this.page + 10; 
    this.get_medicaments();
  }

  precedent(){
    this.page = this.page - 10; 
    this.get_medicaments();
  }

  search(nom: string | undefined){
    if(nom != undefined){
      this.service.get_medicaments(nom).subscribe(data => {
        this.medicaments = data;
      });
    }
  }

}
