import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/modules/pharmacies/models/pharmacie';
import { PharmaciesService } from 'src/app/modules/pharmacies/services/pharmacies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private app:AppComponent, private service: PharmaciesService) { }
  title = this.app.title;
  hide = true;
  pharmacie: Pharmacie = new Pharmacie();
  ngOnInit(): void {
  }

  login(){
    alert(this.pharmacie.email + "  " + this.pharmacie.password);
    this.service.login_pharmacie(this.pharmacie).subscribe(data =>{
      console.log(data);
    },
    error =>console.log(error));
  }

}
