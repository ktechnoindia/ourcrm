import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-leaddashboard',
  templateUrl: './leaddashboard.page.html',
  styleUrls: ['./leaddashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, Ng2GoogleChartsModule,RouterLink,],
 
})
export class LeaddashboardPage implements OnInit {

  menuType = 'push';
  public number: number = 1000;
  

  dataTable = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000]
  ]

  constructor() {

  }

ngOnInit() {

}

}




