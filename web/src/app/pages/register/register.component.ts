import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private app:AppComponent) { }
  hide = true;
  title = this.app.title;
  ngOnInit(): void {
  }

}
