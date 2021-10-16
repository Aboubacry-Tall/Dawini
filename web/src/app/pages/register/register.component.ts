import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/modules/models/pharmacie.model';
import { PharmacieService } from 'src/app/modules/services/pharmacie.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private app:AppComponent, private s_pharmacie: PharmacieService, private router:Router) { }
  hide = true;
  title = this.app.title;
  pharmacie: Pharmacie = new Pharmacie();

  ngOnInit(): void {
  }

  create_pharmacie(){
    this.s_pharmacie.create_pharmacie(this.pharmacie).subscribe(data =>{
      console.log(data);
      this.router.navigate(['login']);
    },
    error =>console.log(error));
  }
}
