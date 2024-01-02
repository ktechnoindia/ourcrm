import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accountdashboard',
  templateUrl: './accountdashboard.page.html',
  styleUrls: ['./accountdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class AccountdashboardPage implements OnInit {
  selectedOptions: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
