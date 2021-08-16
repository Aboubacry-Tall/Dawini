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
  data: User[] = [];
  users: User[] = [];
  constructor(private appservice: AppService){}

  ngOnInit() {
    this.getData();
    this.getUsers();
  }

  getData() {
    this.appservice.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  getUsers() {
    this.appservice.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.data);
    });
  }

}
