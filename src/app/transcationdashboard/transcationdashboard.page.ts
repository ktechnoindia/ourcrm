import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { QuotationService } from '../services/quotation.service';
import { DcinService } from '../services/dcin.service';
import { DcoutService } from '../services/dcout.service';
import { SalesService } from '../services/sales.service';
import { PurchaseService } from '../services/purchase.service';
import { SalereturnService } from '../services/salereturn.service';
import { PurchasereturnService } from '../services/purchasereturn.service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Colors } from 'chart.js';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-transcationdashboard',
  templateUrl: './transcationdashboard.page.html',
  styleUrls: ['./transcationdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class TranscationdashboardPage implements OnInit {
  ngAfterViewInit() {
    const totalquotationCanvas: any = document.getElementById('totalquotationBarChart');
    const totalsalesCanvas: any = document.getElementById('totalsaleBarChart');
    const totalpurchaseCanvas: any = document.getElementById('totalpurchaseBarChart');
    // const executiveCanvas: any = document.getElementById('executiveBarChart');

    if (totalquotationCanvas) {
      this.createBarChart(totalquotationCanvas, 'Total Quotation', [this.totalQuote]);
    }

    if (totalsalesCanvas) {
      this.createBarChart(totalsalesCanvas, 'Total Sales', [this.totalsales]);
    }

    if (totalpurchaseCanvas) {
      this.createBarChart(totalpurchaseCanvas, 'Total Purchase', [this.totalpurchase]);
    }
  }
  quote$: Observable<any[]>;
  dcin$: Observable<any[]>;
  dcout$: Observable<any>;
  sales$: Observable<any[]>;
  purchase$: Observable<any[]>
  purchasereturn$: Observable<any[]>
  totalQuote: number = 0;
  totaldcin: number = 0;
  totaldcout: number = 0;
  totalsales: number = 0;
  totalpurchase: number = 0;
  salreturn$: Observable<any[]>;
  totalsalesreturn: number = 0;
  totalpurchasereturn: number = 0;
  selectedOptions: string[] = [];
  username: string = 'Abhishek Pareek';
  companyname:string='Neelkanth Technologies';
    searchTerm: string = '';
  filteredQuatation$: Observable<any[]> = new Observable<any[]>(); 
  searchTerms: string = '';
  filteredPurchase$: Observable<any[]> = new Observable<any[]>(); 
  searchSale: string = '';
  filteredSales$: Observable<any[]> = new Observable<any[]>();
  searchDcin: string = '';
  filteredDcin$: Observable<any[]> = new Observable<any[]>();
  searchPurchasereturn: string = '';
  filteredPurchasereturns$: Observable<any[]> = new Observable<any[]>(); 
  searchSalereturn: string = '';
  filteredSalereturns$: Observable<any[]> = new Observable<any[]>(); 
  searchDcout: string = '';
  filteredDcout$: Observable<any[]> = new Observable<any[]>(); 
  notificationCount: number = 5; // Replace this with the actual notification count
  openNotificationsPage() {
    // Implement your logic to open the notifications page or handle notifications
    // You may want to reset the notification count after viewing the notifications
    this.notificationCount = 0;
  }
  constructor(private navCtrl: NavController, private session: SessionService, private encService: EncryptionService, private quoteservice: QuotationService, private venderService: VendorService, private executService: ExecutiveService, private additem: AdditemService, private dcinservice: DcinService, private dcoutservice: DcoutService, private saleService: SalesService, private purchaseService: PurchaseService, private salereturnservice: SalereturnService, private purchasereturnservice: PurchasereturnService,) {
    this.selectedOptions = ['saleslist', 'purchaselist'];
    const compid = '1';
    const userid = '1';
    this.quote$=new Observable();
    this.dcin$=new Observable();
    this.dcout$= new Observable();
    this.sales$=new Observable();
    this.purchase$=new Observable();
    this.purchasereturn$=new Observable();
    this.salreturn$=new Observable();
    // this.quote$ = this.quoteservice.fetchallQuote(encService.encrypt(compid), (userid), '', '');
    // console.log(this.quote$);

    // this.quote$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totalQuote = data.length;
    // });
    // this.dcin$ = this.dcinservice.fetchallDcin(encService.encrypt(compid), '', '');
    // console.log(this.dcin$);

    // this.dcin$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totaldcin = data.length;
    // });

    // this.dcout$ = this.dcoutservice.fetchallDcout(encService.encrypt(compid), '', '');
    // console.log(this.dcout$);

    // this.dcout$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totaldcout = data.length;
    // });

    // this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');
    // console.log(this.sales$);

    // this.sales$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totalsales = data.length;

    // });

    // this.purchase$ = this.purchaseService.fetchallPurchase(encService.encrypt(compid), '', '');
    // console.log(this.purchase$);

    // this.purchase$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totalpurchase = data.length;

    // });

    // this.salreturn$ = this.salereturnservice.fetchallSalesreturn(encService.encrypt(compid), '', '');
    // console.log(this.salreturn$);

    // this.salreturn$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totalsalesreturn = data.length;

    // });
    // this.purchasereturn$ = this.purchasereturnservice.fetchallPurchasereturn(encService.encrypt(compid), '', '');
    // console.log(this.purchasereturn$);

    // this.purchasereturn$.subscribe(data => {
    //   console.log(data); // Log the data to the console to verify if it's being fetched
    //   this.totalpurchasereturn = data.length;
    // });



  } createBarChart(canvas: any, label: string, data: number[]) {
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


  filterQuatation(): Observable<any[]> {
    return this.quote$.pipe(
      map(quotes =>
        quotes.filter(quote =>
          Object.values(quote).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  filterPurchase(): Observable<any[]> {
    return this.purchase$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchTerms.toLowerCase()))
        )
      )
    );
  }

  filterSales(): Observable<any[]> {
    return this.sales$.pipe(
      map(sales =>
        sales.filter(sale =>
          Object.values(sale).some(value => String(value).toLowerCase().includes(this.searchSale.toLowerCase()))
        )
      )
    );
  };

  filterDcin(): Observable<any[]> {
    return this.dcin$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchDcin.toLowerCase()))
        )
      )
    );
  };

  filterPurchasereturn(): Observable<any[]> {
    return this.purchasereturn$.pipe(
      map(purchasereturns =>
        purchasereturns.filter(purchasereturn =>
          Object.values(purchasereturn).some(value => String(value).toLowerCase().includes(this.searchPurchasereturn.toLowerCase()))
        )
      )
    );
  }

  filterSalereturn(): Observable<any[]> {
    return this.salreturn$.pipe(
      map(salereturns =>
        salereturns.filter(salereturn =>
          Object.values(salereturn).some(value => String(value).toLowerCase().includes(this.searchSalereturn.toLowerCase()))
        )
      )
    );
  }

  filterDcout(): Observable<any[]> {
    return this.dcout$.pipe(
      map(dcouts =>
        dcouts.filter((dcout:any) =>
          Object.values(dcout).some(value => String(value).toLowerCase().includes(this.searchDcout.toLowerCase()))
        )
      )
    );
  }

  onSearchTermDcout(): void {
    this.filteredDcout$ = this.filterDcout();
  }

  onSearchTermSalereturn(): void {
    this.filteredSalereturns$ = this.filterSalereturn();
  }

  onSearchTermPurchasereturn(): void {
    this.filteredPurchasereturns$ = this.filterPurchasereturn();
  }

  onSearchTermDcin(): void {
    this.filteredDcin$ = this.filterDcin();
  }

  onSearchTermSale(): void {
    this.filteredSales$ = this.filterSales();
  }

  onSearchTermQuote(): void {
    this.filteredQuatation$ = this.filterQuatation();
  }

  onSearchTermPurchase(): void {
    this.filteredPurchase$ = this.filterPurchase();
  }

  ngOnInit() {
     //this.username=await this.session.getValue('username');
    //this.companyname=await this.session.getValue('companyname');
    const compid = '1';

    // Fetch data for all entities
    this.quote$ = this.quoteservice.fetchallQuote(this.encService.encrypt(compid), '', '', '');
    this.sales$ = this.saleService.fetchallSales(this.encService.encrypt(compid), '', '');
    this.purchase$ = this.purchaseService.fetchallPurchase(this.encService.encrypt(compid), '', '');


    // Subscribe to the observables and update the counts
    this.quote$.subscribe(data => {
      this.totalQuote = data.length;
      this.updateChartData('totalquotationBarChart', 'Total Quotation', [this.totalQuote]);
    });
    this.sales$.subscribe(data => {
      this.totalsales = data.length;
      this.updateChartData('totalsaleBarChart', 'Total Sales', [this.totalsales]);
    });
    this.purchase$.subscribe(data => {
      this.totalpurchase = data.length;
      this.updateChartData('totalpurchaseBarChart', 'Total Purchase', [this.totalpurchase]);
    });

    this.filteredQuatation$ = this.quote$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterQuatation())
    );

    this.filteredPurchase$ = this.purchase$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterPurchase())
    );

    this.filteredSales$ = this.sales$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterSales())
    );

    this.filteredDcin$ = this.dcin$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterDcin())
    );

    this.filteredPurchasereturns$ = this.purchasereturn$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterPurchasereturn())
    );
    this.filteredSalereturns$ = this.salreturn$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterSalereturn())
    );

    this.filteredDcout$ = this.dcout$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterDcout())
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





