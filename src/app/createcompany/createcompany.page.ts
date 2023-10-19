import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule]
})
export class CreatecompanyPage implements OnInit {

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