import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outstandingreport',
  templateUrl: './outstandingreport.page.html',
  styleUrls: ['./outstandingreport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OutstandingreportPage implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/add-customer"])
  }
}
