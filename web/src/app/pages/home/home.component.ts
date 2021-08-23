import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value = '';
  constructor(private app:AppComponent) { }
  title: string = "";
  ngOnInit(): void {
    this.title = this.app.title;
  }

  focusFunction(){
    
  }

}
