import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicament } from 'src/app/modules/models/medicament';
import { DataService } from 'src/app/modules/services/data.service';
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
  this.dataService.DataBase()
  this.getAllMedicaments()
  }
  
  getAllMedicaments() {  
    this.dataService.dbState().subscribe((res) => {
      if(res){
        this.dataService.fetchAllMedicaments().subscribe(item => {
          this.medicaments = item;
        })
      }
    });
}   
  onSearch(event:any){
    this.dataService.dbState().subscribe((res) => {
      if(res){
        console.log('nom search'+this.nom)
        this.dataService.getMedicament(this.nom)
        this.dataService.fetchMedicament().subscribe(data =>{
        this.medicaments=data;
    });
      }else{
        console.log('search error')
      }
    })  
  }
}

