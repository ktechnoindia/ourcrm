import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-leadedit',
  templateUrl: './leadedit.page.html',
  styleUrls: ['./leadedit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LeadeditPage implements OnInit {



  constructor(private router:Router,
     ) 
  {

   }


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}
