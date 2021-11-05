import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }
  alert: string = '';

  ngOnInit(): void {
    this.alert = sessionStorage.getItem('alert') + '';
  }

}
