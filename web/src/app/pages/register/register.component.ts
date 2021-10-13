import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/modules/pharmacies/models/pharmacie';
import { PharmaciesService } from 'src/app/modules/pharmacies/services/pharmacies.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private app:AppComponent, private service: PharmaciesService, private router:Router) { }
  hide = true;
  title = this.app.title;
  pharmacie: Pharmacie = new Pharmacie();

  ngOnInit(): void {
  }

  create_pharmacie(){
    this.service.create_pharmacie(this.pharmacie).subscribe(data =>{
      console.log(data);
      this.router.navigate(['login']);
    },
    error =>console.log(error));
  }
}
