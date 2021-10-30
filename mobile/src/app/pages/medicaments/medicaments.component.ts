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
  nom='';
  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit() {
   this.getMedic();
  }
  
   getAllMedicament() {
    this.dataService.getAllMedicaments().subscribe(data =>{
      this.medicaments=data;
      console.log(this.medicaments)
    });
  }
   getMedic(){
    this.dataService.getMedic(this.nom).subscribe(data =>{
      this.medicaments=data;
    });
    }
    
  onSearch(event:any){
    this.dataService.getMedic(this.nom).subscribe(data =>{
      console.log(this.nom)
      this.medicaments=data;
    });

  }

}

