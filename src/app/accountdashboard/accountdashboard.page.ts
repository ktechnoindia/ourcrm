import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { SessionService } from '../services/session.service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'chart.js';
import { PaymentService } from '../services/payment.service';
import { EncryptionService } from '../services/encryption.service';
import { RecepitService } from '../services/recepit.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
Chart.register(Colors);

@Component({
  selector: 'app-accountdashboard',
  templateUrl: './accountdashboard.page.html',
  styleUrls: ['./accountdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class AccountdashboardPage implements OnInit {
  selectedOptions: string[] = [];
  username: string = 'Abhishek Pareek';
  companyname:string='Neelkanth Technologies';
    notificationCount: number = 5; // Replace this with the actual notification count
  openNotificationsPage() {
    // Implement your logic to open the notifications page or handle notifications
    // You may want to reset the notification count after viewing the notifications
    this.notificationCount = 0;
  }
  ngAfterViewInit() {
    const PaymentCanvas: any = document.getElementById('paymentBarChart');
    const ReceiptCanvas: any = document.getElementById('receiptBarChart');


    if (PaymentCanvas) {
      this.createBarChart(PaymentCanvas, 'Total Payment Transaction', [this.totalpayment]);
    }

    if (ReceiptCanvas) {
      this.createBarChart(ReceiptCanvas, 'Total Receipt Transaction', [this.totalreceipt]);
    }
  }
  payment$: Observable<any[]>;
  totalpayment: number = 0;
  recepits$: Observable<any[]>;
  totalreceipt: number = 0;

  searchTerm: string = '';
  filteredRecepits$: Observable<any[]> = new Observable<any[]>();
  searchPayment: string = '';
  filteredPayments$: Observable<any[]> = new Observable<any[]>();
  constructor(private recepitService: RecepitService, private paymentservice: PaymentService, private navCtrl: NavController, private session: SessionService, private encService: EncryptionService) {
    this.selectedOptions = ['paymenttransactionlist', 'receipttransactionlist'];
    const compid = '1';
    this.payment$ = this.paymentservice.fetchAllPayment(encService.encrypt(compid), '', '');
    console.log(this.payment$);
    this.payment$.subscribe((data: string | any[]) => {
      console.log(data);
      this.totalpayment = data.length // Log the data to the console to verify if it's being fetched
    });
    this.recepits$ = this.recepitService.fetchAllRecepit(encService.encrypt(compid), '', '');
    console.log(this.recepits$);
    this.recepits$.subscribe((data: string | any[]) => {
      console.log(data);
      this.totalreceipt = data.length // Log the data to the console to verify if it's being fetched
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
  };

  filterRecepit(): Observable<any[]> {
    return this.recepits$.pipe(
      map(recepits =>
        recepits.filter(recepit =>
          Object.values(recepit).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  filterPayement(): Observable<any[]> {
    return this.payment$.pipe(
      map(payments =>
        payments.filter(payemt =>
          Object.values(payemt).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermPayment(): void {
    this.filteredPayments$ = this.filterPayement();
  }


  onSearchTermChanged(): void {
    this.filteredRecepits$ = this.filterRecepit();
  }

  async ngOnInit() {
    //this.username=await this.session.getValue('username');
    //this.companyname=await this.session.getValue('companyname');
    const compid = '1';

    //Fetch data for all entities
    this.payment$ = this.paymentservice.fetchAllPayment(this.encService.encrypt(compid), '', '');
    this.recepits$ = this.recepitService.fetchAllRecepit(this.encService.encrypt(compid), '', '');


    // Subscribe to the observables and update the counts
    this.payment$.subscribe((data: string | any[]) => {
      this.totalpayment = data.length;
      this.updateChartData('paymentBarChart', 'Payment Transaction', [this.totalpayment]);
    });

    this.recepits$.subscribe((data: string | any[]) => {
      this.totalreceipt = data.length;
      this.updateChartData('receiptBarChart', 'Receipt Transaction', [this.totalreceipt]);
    });

    this.filteredRecepits$ = this.recepits$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterRecepit())
    );
    this.filteredPayments$ = this.payment$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterPayement())
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
