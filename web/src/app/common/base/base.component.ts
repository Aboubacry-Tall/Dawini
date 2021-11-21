import { Component, OnInit } from '@angular/core';
import { CoreComponent } from '../core/core.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(public core: CoreComponent) { }

  ngOnInit(): void {
    this.core.get_user_coordonnees();
  }

  public get_pharmacie_Id(){
    return localStorage.getItem('id');
  }

}
