import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicament } from 'src/app/modules/models/medicament';
import { DataService } from 'src/app/modules/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  medicament: Medicament = new Medicament();
  medicaments!: Medicament[];
  Input: string = "";
  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
  }

  get_medicaments(ev:any):void {
    this.service.get_medicaments(this.Input).subscribe(data => {
      this.medicaments = data;
    });
  }
  
  redirect(medicament: Medicament): void{
    //medicament.description.trim().replace(/\s/g, "_";
    sessionStorage.setItem('medicament_description',  medicament.description + '');
    this.router.navigate(['medicament/' + medicament.nom]);
  }

}
