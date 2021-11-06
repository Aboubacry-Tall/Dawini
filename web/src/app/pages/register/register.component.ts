import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CoreComponent } from 'src/app/common/core/core.component';
import { Pharmacie } from 'src/app/modules/models/pharmacie.model';
import { PharmacieService } from 'src/app/modules/services/pharmacie.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private app:AppComponent, private s_pharmacie: PharmacieService, private router:Router, public dialog: MatDialog, private core: CoreComponent) { }
  hide = true;
  title = this.app.title;
  pharmacie: Pharmacie = new Pharmacie();

  ngOnInit(): void {
  }

  create_pharmacie(){
    if(this.pharmacie.password != undefined && this.pharmacie.password.length > 2){
      this.s_pharmacie.create_pharmacie(this.pharmacie).subscribe(data =>{
        console.log(data);
        this.router.navigate(['login']);
      },
        error => {
          this.core.openDialog(270, 'inscription', "Echec de l'opération");
        }
      )
    }else{
      this.core.openDialog(270, 'invalide', 'Mot de passe trop court. Minimum trois caractères');
    }
  }

}

