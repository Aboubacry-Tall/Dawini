import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Medicament } from 'src/app/medicament';

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.scss'],
})
export class MedicamentsComponent implements OnInit {

  medicaments: Medicament[] = [];
  medicament: Medicament = new Medicament();

  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit() {
    this.getMedicament()
  }
  
  private getMedicament() {
    this.dataService.getMedicaments().subscribe(data =>{
      this.medicaments=data;
      console.log(this.medicaments)
    });
  }

}
