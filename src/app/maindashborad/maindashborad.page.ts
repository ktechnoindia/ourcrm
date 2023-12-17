import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Check that the type of your data structure includes 'customIcon'

export interface accountPages {
  title: string;
  url: string;
  ionicIcon: string;
  customIcon?: string; // Make sure customIcon is optional if it might not always be present
}


import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-maindashborad',
  templateUrl: './maindashborad.page.html',
  styleUrls: ['./maindashborad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})


export class MaindashboradPage implements OnInit {

 
  accountPages = [
    { title: 'Dashboard', url: '/dashboard', ionicIcon: 'home', customIcon: 'path/to/custom/icon.svg' },
    { title: 'Profile', url: '/profile', ionicIcon: 'person' },
    // Add more pages as needed
  ];
  
  constructor() { 
    // Example of setting default values for 'customIcon'


  }

  ngOnInit() {
  }
  

}
