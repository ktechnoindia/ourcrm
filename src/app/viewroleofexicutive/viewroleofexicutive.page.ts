import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewroleofexicutive',
  templateUrl: './viewroleofexicutive.page.html',
  styleUrls: ['./viewroleofexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
  ReactiveFormsModule]})
export class ViewroleofexicutivePage implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/viewroleofexicutive']); 
  }
}
