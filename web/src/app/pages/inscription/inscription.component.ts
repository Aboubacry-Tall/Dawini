import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  hide = true;
  constructor(private app:AppComponent) { }
  title = this.app.title;
  
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {
  }

}
