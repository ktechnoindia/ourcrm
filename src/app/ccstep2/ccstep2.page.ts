import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ccstep2',
  templateUrl: './ccstep2.page.html',
  styleUrls: ['./ccstep2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule]
})
export class Ccstep2Page implements OnInit {

  constructor(private router:Router) { }


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/createcompany']); 
  }

}