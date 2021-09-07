import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
  constructor(private app:AppComponent) { }
  hide = true;
  title = this.app.title;
  
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {
  }

}
