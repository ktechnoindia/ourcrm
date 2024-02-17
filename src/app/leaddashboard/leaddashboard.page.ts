import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'chart.js';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-leaddashboard',
  templateUrl: './leaddashboard.page.html',
  styleUrls: ['./leaddashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink,],

})
export class LeaddashboardPage implements OnInit {
  ngAfterViewInit() {
    const totalleadCanvas: any = document.getElementById('totalleadBarChart');
    const activeleadCanvas: any = document.getElementById('activeleadBarChart');
    const orderclosedCanvas: any = document.getElementById('orderclosedBarChart');
    // const executiveCanvas: any = document.getElementById('executiveBarChart');

    if (totalleadCanvas) {
      this.createBarChart(totalleadCanvas, 'Total Lead', [this.totallead]);
    }

    if (activeleadCanvas) {
      this.createBarChart(activeleadCanvas, 'Active Lead', [this.totallead]);
    }

    if (orderclosedCanvas) {
      this.createBarChart(orderclosedCanvas, 'Order Closed', [this.totallead]);
    }
  }
  menuType = 'push';
  public number: number = 1000;
  selectedOptions: string[] = [];

  searchTerm: string = '';
  filteredLeads$: Observable<any[]> = new Observable<any[]>(); 

  lead$: Observable<any[]>;
  totallead: number = 0;
  username: string = '';
  companyname:string='';
  notificationCount: number = 5; // Replace this with the actual notification count
  openNotificationsPage() {
    // Implement your logic to open the notifications page or handle notifications
    // You may want to reset the notification count after viewing the notifications
    this.notificationCount = 0;
  }
  constructor(private navCtrl: NavController,private session:SessionService,private encService: EncryptionService, private leadser: LeadService,) {
    this.selectedOptions = ['topnewlead', 'productwiselead',];

    const compid = '1';
    this.username=session.getValue('fname')?.valueOf() as string;
    this.companyname=session.getValue('companyname')?.valueOf() as string;
    this.lead$ = this.leadser.fetchallleads(encService.encrypt(compid), '', '');

    this.lead$.subscribe(data => {
      console.log(data);
      this.totallead = data.length // Log the data to the console to verify if it's being fetched
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
          borderColor: 'rgb(255, 99, 132)',
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


  filterLead(): Observable<any[]> {
    return this.lead$.pipe(
      map(leads =>
        leads.filter(lead =>
          Object.values(lead).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
    return this.lead$;
  }

  onSearchTermChanged(): void {
    this.lead$ = this.filterLead();
  }

  ngOnInit() {
      //this.username=await this.session.getValue('username');
    //this.companyname=await this.session.getValue('companyname');
    const compid = '1';

    // Fetch data for all entities
    // this.lead$ = this.leadser.fetchallleads(this.encService.encrypt(compid), '', '');
    // this.lead$ = this.leadser.fetchallleads(this.encService.encrypt(compid), '', '');
    // this.lead$ = this.leadser.fetchallleads(this.encService.encrypt(compid), '', '');


    // Subscribe to the observables and update the counts
    this.lead$.subscribe(data => {
      this.totallead = data.length;
      this.updateChartData('totalleadBarChart', 'Total Lead', [this.totallead]);
    });
     

    this.filteredLeads$ = this.lead$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterLead())
    );

  }

  updateChartData(chartId: string, label: string, data: number[]) {
    const chart = Chart.getChart(chartId);
    if (chart) {
      chart.data.labels = [label];
      chart.data.datasets[0].data = data;
      chart.update();
    }
  }
  logout() {
    // Clear authentication tokens or perform other logout logic
    // this.authService.logout();

    // Navigate to the login page (assuming your login page has a route named 'login')
    this.navCtrl.navigateRoot('/login');
  }
}



