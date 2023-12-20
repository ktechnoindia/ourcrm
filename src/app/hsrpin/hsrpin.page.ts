import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hsrpin',
  templateUrl: './hsrpin.page.html',
  styleUrls: ['./hsrpin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HsrpinPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }
}