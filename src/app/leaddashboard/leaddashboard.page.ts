import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
@Component({
  selector: 'app-leaddashboard',
  templateUrl: './leaddashboard.page.html',
  styleUrls: ['./leaddashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,Ng2GoogleChartsModule]
})
export class LeaddashboardPage implements OnInit {
  public columnChart1: GoogleChartInterface;
  
  constructor() { 
    this.columnChart1 = {
      chartType: 'ColumnChart',
      dataTable: [
        ['City', '2010 Population'],
        ['New York City, NY', 8175000],
        ['Los Angeles, CA', 3792000],
        ['Chicago, IL', 2695000],
        ['Houston, TX', 2099000],
        ['Philadelphia, PA', 1526000]
      ],
      //opt_firstRowIsData: true,
      options: {
        title: 'Population of Largest U.S. Cities',
        height: 600,
        chartArea: { height: '400' },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },
    };

    this.columnChart1 = {
      chartType: 'PieChart',
      dataTable: [
        ['City', '2010 Population'],
        ['New York City, NY', 8175000],
        ['Los Angeles, CA', 3792000],
        ['Chicago, IL', 2695000],
        ['Houston, TX', 2099000],
        ['Philadelphia, PA', 1526000]
      ],
      //opt_firstRowIsData: true,
      options: {
        title: 'Population of Largest U.S. Cities',
        height: 600,
        chartArea: { height: '400' },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },
    };

 }
  ngOnInit() {
   
  }

  }




