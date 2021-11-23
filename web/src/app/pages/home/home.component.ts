import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Search } from 'src/app/models/search';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private app:AppComponent, private router: Router, private search: SearchComponent) { }
  title: string = "";
  s: Search = new Search();

  ngOnInit(): void {
    this.title = this.app.title;
  }

  search_name(): void {
    
  }
}
