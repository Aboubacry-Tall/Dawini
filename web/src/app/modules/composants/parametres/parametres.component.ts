import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Medicament } from '../../models/medicament.model';
import { Pharmacie } from '../../models/pharmacie.model';
import { MedicamentService } from '../../services/medicament.service';
import { PharmacieService } from '../../services/pharmacie.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
