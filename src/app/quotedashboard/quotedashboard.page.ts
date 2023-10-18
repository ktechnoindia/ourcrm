import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';



@Component({
  selector: 'app-quotedashboard',
  templateUrl: './quotedashboard.page.html',
  styleUrls: ['./quotedashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,Ng2GoogleChartsModule,
  ]
})
export class QuotedashboardPage implements OnInit {

  public columnChart1: GoogleChartInterface;
  public pieChart: GoogleChartInterface;

  // circleProgressModule: NgCircleProgressModule ;

  dataTable = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000]
  ]

  constructor() {

  //  this.circleProgressModule= NgCircleProgressModule.forRoot({
  //     // set defaults here
  //     radius: 100,
  //     outerStrokeWidth: 16,
  //     innerStrokeWidth: 8,
  //     outerStrokeColor: "#78C000",
  //     innerStrokeColor: "#C7E596",
  //     animationDuration: 300,
      
  //   })

    this.columnChart1 = {
      chartType: 'ColumnChart',
      dataTable: [
        ['City', '2010 Lead'],
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
        ['Task', 'Lead per Day'],
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

   
   }

  ngOnInit() {
  }

}
