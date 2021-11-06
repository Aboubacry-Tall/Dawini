import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/base/base.component';
import { CoreComponent } from 'src/app/common/core/core.component';
import { Pharmacie } from 'src/app/models/pharmacie';
import { PharmacieService } from 'src/app/services/pharmacie.service';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmacieComponent implements OnInit {

  constructor(private s_pharmacie: PharmacieService, public base: BaseComponent, private core: CoreComponent) { }
  pharmacie: Pharmacie = new Pharmacie();
  pharmacie_id: number = parseInt(this.base.get_pharmacie_Id() + '');

  ngOnInit(): void {
    this.get_pharmacie(this.pharmacie_id);
  }

  get_pharmacie(id:number){
    this.s_pharmacie.get_pharmacie(id).subscribe(data =>{
      this.pharmacie = data;
    },
    error =>console.log(error));
  }

  edit_pharmacie(){
    if(this.pharmacie.password1 != undefined && this.pharmacie.password2 != undefined){
      if(this.pharmacie.password1?.length > 2 && this.pharmacie.password2?.length > 2){
        if(this.pharmacie.password == this.pharmacie.password1){
          this.pharmacie.password = this.pharmacie.password2
          this.s_pharmacie.edit_pharmacie(this.pharmacie_id, this.pharmacie).subscribe(data =>{
          this.pharmacie = data;
          },
          error =>console.log(error));
          this.core.openDialog(270, 'valide', 'Mot de passe de reinitialisé');
        }else{
          this.core.openDialog(270, 'invalide', 'Ancien mot de passe incorrect');
        }
      }else{
        this.core.openDialog(270, 'invalide', 'Mot de passe trop court. Minimum trois caractères');
      }
    }else{
      this.s_pharmacie.edit_pharmacie(this.pharmacie_id, this.pharmacie).subscribe(data =>{
        this.pharmacie = data;
        },
        error =>console.log(error));
        this.core.openDialog(270, 'valide', 'Opération réussie');
    }
  }

}
