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
  imports: [IonicModule, CommonModule, FormsModule, Ng2GoogleChartsModule,],
 
})
export class LeaddashboardPage implements OnInit {

  menuType = 'push';

 
  public columnChart1: GoogleChartInterface;
  public pieChart: GoogleChartInterface;
  public lineChart: GoogleChartInterface;

  dataTable = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000]
  ]

  trendlines = {
    0: { type: 'exponential', color: '#333', opacity: 1 },
    1: { type: 'linear', color: '#0f0', opacity: .5 }
  }
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
        title: 'Lead Manager',
        height: 150,
        chartArea: { height: '150' },
        hAxis: {
          title: 'Total Lead',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      },
    };


    this.pieChart = {
      chartType: 'PieChart',
      dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ],
      //opt_firstRowIsData: true,
      options: {
        'title': 'Lead ',
        height: 150,
        width: '100%'
      }
    };

     this.lineChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Year', 'Population'],
        ['2010', 8175000],
        ['2011', 8500000],
        ['2012', 8700000],
        ['2013', 9000000],
        ['2014', 9200000],
      ],
      options: {
        title: 'Population Over the Years',
        height: 220,
        chartArea: { height: '50%' },
        hAxis: {
          title: 'Year',
        },
        vAxis: {
          title: 'Population',
        },
      },
    };
  }

ngOnInit() {

}

}




