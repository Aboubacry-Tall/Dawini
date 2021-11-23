import { Component, OnInit } from '@angular/core';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor() { }
  a = '';
  ngOnInit(): void {

  }

  projectContentChanged(){
    this.a = this.a + ' a';
  }
}
