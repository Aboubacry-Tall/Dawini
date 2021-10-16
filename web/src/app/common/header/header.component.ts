import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private app: AppComponent, private router: Router, private route : ActivatedRoute) { }
  title: string = "";
  id!: string;

  ngOnInit(): void {
    this.title = this.app.title;
    this.id = this.id + localStorage.getItem('id');
    this.get_user_id();
  }

  get_user_id(){
    return localStorage.getItem('id');
  }

  get_pharmacie(){
    this.router.navigate(['pharmacie/' + this.id])
  }

  get_parametres(){
    this.router.navigate(['parametres/' + this.id])
  }
}
 