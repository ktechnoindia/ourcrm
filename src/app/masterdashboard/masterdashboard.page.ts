import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { CustomerService } from '../services/customer.service';
import { Observable } from 'rxjs';
import { VendorService } from '../services/vendor.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'chart.js';

Chart.register(Colors);

@Component({
  selector: 'app-masterdashboard',
  templateUrl: './masterdashboard.page.html',
  styleUrls: ['./masterdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,]
})

export class MasterdashboardPage implements OnInit {
  customers$: Observable<any[]>;
  vendors$: Observable<any[]>;
  executives$: Observable<any[]>
  items$: Observable<any[]>
  totalCustomer: number = 0;
  totalSupplier:number=0;
  totalItems:number=0;
  totalExecitve:number=0;
  sharedService: any;
  selectedOptions: string[] = [];

  

  ngAfterViewInit() {
    const customerCanvas: any = document.getElementById('customerBarChart');
    const supplierCanvas: any = document.getElementById('supplierBarChart');
    const itemCanvas: any = document.getElementById('itemBarChart');
    const executiveCanvas: any = document.getElementById('executiveBarChart');

    if (customerCanvas) {
      this.createBarChart(customerCanvas, 'Active Customer', [this.totalCustomer]);
    }

    if (supplierCanvas) {
      this.createBarChart(supplierCanvas, 'Active Supplier', [this.totalSupplier]);
    }

    if (itemCanvas) {
      this.createBarChart(itemCanvas, 'Total Items', [this.totalItems]);
    }

    if (executiveCanvas) {
      this.createBarChart(executiveCanvas, 'Total Executive', [this.totalExecitve]);
    }
    
  }
 
  constructor(private encService: EncryptionService, private custservice: CustomerService,private venderService:VendorService,private executService:ExecutiveService,private additem : AdditemService) { 
    this.selectedOptions = ['customerlist', 'vendorlist'];

    const compid = '1';

    this.customers$ = this.custservice.fetchallCustomer(encService.encrypt(compid), '', '');
    console.log(this.customers$);

    this.customers$.subscribe(data => {
      console.log(data);
      this.totalCustomer=data.length // Log the data to the console to verify if it's being fetched
    });

    this.vendors$ = this.venderService.fetchallVendor(encService.encrypt(compid),'','');
    console.log(this.vendors$);
    this.vendors$.subscribe(data => {
      console.log(data);
      this.totalSupplier=data.length // Log the data to the console to verify if it's being fetched
    });

    this.executives$ = this.executService.fetchAllExecutive(compid,'','');
    console.log(this.executives$);
    this.executives$.subscribe(data => {
      console.log(data);
      this.totalExecitve=data.length // Log the data to the console to verify if it's being fetched
    });

    this.items$ = this.additem.fetchallItem(encService.encrypt(compid),'','');
    console.log(this.items$);
    this.items$.subscribe(data => {
      console.log(data);
      this.totalItems=data.length // Log the data to the console to verify if it's being fetched
    });

    this.items$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
  }
  createBarChart(canvas: any, label: string, data: number[]) {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [label],
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor:  'rgb(255, 99, 132)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
          },
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: 'red',
            font: {
              weight: 'bold',
            },
            formatter: (value: any, context: any) => {
              return value;
            },
          },
        },
      },
    });
  }
  
  
  
  
  ngOnInit() {
    const compid = '1';

    // Fetch data for all entities
    this.customers$ = this.custservice.fetchallCustomer(this.encService.encrypt(compid), '', '');
    this.vendors$ = this.venderService.fetchallVendor(this.encService.encrypt(compid), '', '');
    this.executives$ = this.executService.fetchAllExecutive(compid, '', '');
    this.items$ = this.additem.fetchallItem(this.encService.encrypt(compid), '', '');

    // Subscribe to the observables and update the counts
    this.customers$.subscribe(data => {
      this.totalCustomer = data.length;
      this.updateChartData('customerBarChart', 'Active Customer', [this.totalCustomer]);
    });

    this.vendors$.subscribe(data => {
      this.totalSupplier = data.length;
      this.updateChartData('supplierBarChart', 'Active Supplier', [this.totalSupplier]);
    });

    this.executives$.subscribe(data => {
      this.totalExecitve = data.length;
      this.updateChartData('executiveBarChart', 'Total Executive', [this.totalExecitve]);
    });

    this.items$.subscribe(data => {
      this.totalItems = data.length;
      this.updateChartData('itemBarChart', 'Total Items', [this.totalItems]);
    });
  }

  updateChartData(chartId: string, label: string, data: number[]) {
    const chart = Chart.getChart(chartId);
    if (chart) {
      chart.data.labels = [label];
      chart.data.datasets[0].data = data;
      chart.update();
    }
  }
}