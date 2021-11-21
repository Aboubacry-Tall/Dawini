import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  message!: string;

  ngOnInit(): void {
  }

  openDialog(width: number, form: string, message: string) {
    sessionStorage.setItem('alert', form);
    sessionStorage.setItem('message', message);
    const dialogRef = this.dialog.open(AlertComponent, {
      width: width + 'px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get_user_coordonnees(){
    const geo = navigator.geolocation
    geo.getCurrentPosition((position) => {
      sessionStorage.setItem('user_lng', position.coords.longitude + '');
      sessionStorage.setItem('user_lat', position.coords.latitude + '');
    });
  }
}
