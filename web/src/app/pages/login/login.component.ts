import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/modules/pharmacies/models/pharmacie';
import { PharmaciesService } from 'src/app/modules/pharmacies/services/pharmacies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private app:AppComponent, private service: PharmaciesService, private router: Router) { }
  title = this.app.title;
  hide = true;
  pharmacie: Pharmacie = new Pharmacie();
  pharmacies!: Pharmacie[];

  ngOnInit(): void {
  }

  login(){
    this.service.login_pharmacie(this.pharmacie).subscribe(data =>{
      if(Object.keys(data).length != 0){
        this.pharmacies = data;
        this.router.navigate(['pharmacie', this.pharmacies[0].id])
      }
    },
    error => console.log(error));
  }

  get_pharmacie(){
    alert(this.pharmacie.nom);
  }

}
