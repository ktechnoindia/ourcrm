import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transcationdashboard',
  templateUrl: './transcationdashboard.page.html',
  styleUrls: ['./transcationdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class TranscationdashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
