import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-roleofexicutive',
  templateUrl: './roleofexicutive.page.html',
  styleUrls: ['./roleofexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RoleofexicutivePage implements OnInit {

 
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