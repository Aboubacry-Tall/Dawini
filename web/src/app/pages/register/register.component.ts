import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pharmacie } from 'src/app/modules/models/pharmacie.model';
import { PharmacieService } from 'src/app/modules/services/pharmacie.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private app:AppComponent, private s_pharmacie: PharmacieService, private router:Router, public dialog: MatDialog) { }
  hide = true;
  title = this.app.title;
  pharmacie: Pharmacie = new Pharmacie();

  ngOnInit(): void {
  }

  create_pharmacie(){
    this.s_pharmacie.create_pharmacie(this.pharmacie).subscribe(data =>{
      console.log(data);
      this.router.navigate(['login']);
    },
      error => {
        this.openDialog();
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(MessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

