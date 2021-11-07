import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreComponent } from 'src/app/common/core/core.component';
import { Pharmacie } from 'src/app/models/pharmacie';
import { PharmacieService } from 'src/app/services/pharmacie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: PharmacieService, private core: CoreComponent) { }
  pharmacies!: Pharmacie[];
  name: string = this.route.snapshot.params['name'];

  ngOnInit(): void {
    this.get_pharmacies();
  }

  get_pharmacies(): void {
    this.service.get_pharmacies(this.name).subscribe(data => {
      this.pharmacies = data;
    },error => {
      this.core.openDialog(270, 'invalide', "Medicament introuvable");
    });
  }

}
