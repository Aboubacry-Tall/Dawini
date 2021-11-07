import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Search } from 'src/app/models/search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private app:AppComponent, private router: Router) { }
  title: string = "";
  search : Search = new Search();

  ngOnInit(): void {
    this.title = this.app.title;
  }

  go_seach(){
    if(this.search.nom != undefined){
      this.router.navigate(['search/' + this.search.nom]);
    }
  }
  
}
