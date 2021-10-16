import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/modules/models/pharmacie.model';
import { PharmacieService } from 'src/app/modules/services/pharmacie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private app:AppComponent, private s_pharmacie: PharmacieService, private router: Router) { }
  title = this.app.title;
  hide = true;
  pharmacie: Pharmacie = new Pharmacie();
  pharmacies!: Pharmacie[];

  ngOnInit(): void {
  }

  login(){
    this.s_pharmacie.login_pharmacie(this.pharmacie).subscribe(data =>{
      if(Object.keys(data).length != 0){
        this.pharmacies = data;
        this.router.navigate(['pharmacie', this.pharmacies[0].id]);
        const id = this.pharmacies[0].id + '';
        localStorage.setItem('id', id);
      }
    },
    error => console.log(error));
  }

}
