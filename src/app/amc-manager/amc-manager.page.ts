import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-amc-manager',
  templateUrl: './amc-manager.page.html',
  styleUrls: ['./amc-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class AmcManagerPage implements OnInit {
  myform: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });
  }
  goBack(){
    this.router.navigate([""])
  }
}