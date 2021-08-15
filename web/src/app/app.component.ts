import { Component } from '@angular/core';
import { AppService } from './app.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  data: any;
  constructor(private appservice: AppService){}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.appservice.getUsers().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

}
