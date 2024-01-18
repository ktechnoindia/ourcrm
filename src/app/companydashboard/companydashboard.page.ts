import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { EncryptionService } from '../services/encryption.service';
import { RouterLink } from '@angular/router';
import { RecepitService } from '../services/recepit.service';
import { PaymentService } from '../services/payment.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';
import { SalesService } from '../services/sales.service';
import { PurchaseService } from '../services/purchase.service';
import { LeadService } from '../services/lead.service';

@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.page.html',
  styleUrls: ['./companydashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class CompanydashboardPage implements OnInit {
  username: string = 'Abhishek Pareek';
  companyname:string='Neelkanth Technologies';
  notificationCount: number = 5; // Replace this with the actual notification count
  openNotificationsPage() {
    // Implement your logic to open the notifications page or handle notifications
    // You may want to reset the notification count after viewing the notifications
    this.notificationCount = 0;
  }
  payment$: Observable<any[]>;
  totalpayment: number = 0;
  recepits$: Observable<any[]>;
  totalreceipt: number = 0;
  customers$: Observable<any[]>;
  vendors$: Observable<any[]>;
  executives$: Observable<any[]>
  items$: Observable<any[]>
  totalCustomer: number = 0;
  totalSupplier:number=0;
  totalItems:number=0;
  totalExecitve:number=0;
  sales$: Observable<any[]>;
  purchase$: Observable<any[]>;
  totalsales: number = 0;
  totalpurchase: number = 0;
  selectedOptions: string[] = [];
  lead$: Observable<any[]>;
  totallead: number = 0;
  searchTerms:string='';
  searchTerm:string='';
  filteredCustomers$: Observable<any[]> = new Observable<any[]>();
  filteredSupplers$: Observable<any[]> = new Observable<any[]>();
  filteredExecutive$: Observable<any[]> = new Observable<any[]>();
  filteredItem$: Observable<any[]> = new Observable<any[]>();
  searchExecutive:string='';
  searchItem:string='';
  searchPurchase: string = '';
  filteredPurchase$: Observable<any[]> = new Observable<any[]>(); 
  searchSale: string = '';
  filteredSales$: Observable<any[]> = new Observable<any[]>();
  searchlead: string = '';
  filteredLeads$: Observable<any[]> = new Observable<any[]>(); 
  searchReceipt: string = '';
  filteredRecepits$: Observable<any[]> = new Observable<any[]>();
  searchPayment: string = '';
  filteredPayments$: Observable<any[]> = new Observable<any[]>();
  constructor( private leadser: LeadService,private saleService: SalesService, private purchaseService: PurchaseService,private additem : AdditemService, private custservice: CustomerService,private venderService:VendorService,private executService:ExecutiveService,private recepitService: RecepitService, private paymentservice: PaymentService,private encService: EncryptionService,private navCtrl: NavController,private session:SessionService,) {
    this.selectedOptions = ['customerlist', 'vendorlist'];
    const compid = '1';
    this.payment$ = this.paymentservice.fetchAllPayment(encService.encrypt(compid), '', '');
    console.log(this.payment$);
    this.payment$.subscribe((data: string | any[]) => {
      console.log(data);
      this.totalpayment = data.length // Log the data to the console to verify if it's being fetched
    });
    this.recepits$ = this.recepitService.fetchAllReceppit(encService.encrypt(compid), '', '');
    console.log(this.recepits$);
    this.recepits$.subscribe((data: string | any[]) => {
      console.log(data);
      this.totalreceipt = data.length // Log the data to the console to verify if it's being fetched
    });
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
    this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');
    console.log(this.sales$);

    this.sales$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalsales = data.length;

    });

    this.purchase$ = this.purchaseService.fetchallPurchase(encService.encrypt(compid), '', '');
    console.log(this.purchase$);

    this.purchase$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalpurchase = data.length;

    });
    this.lead$ = this.leadser.fetchallleads(encService.encrypt(compid), '', '');

    this.lead$.subscribe(data => {
      console.log(data);
      this.totallead = data.length // Log the data to the console to verify if it's being fetched
    });
   
   }

  ngOnInit() {
     //this.username=await this.session.getValue('username');
    //this.companyname=await this.session.getValue('companyname');

    const compid = '1';
    this.filteredCustomers$ = this.customers$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );

    this.filteredSupplers$ = this.vendors$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterSuppliers())
    );
    this.filteredExecutive$ = this.executives$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterExecutive())
    );

    this.filteredItem$ = this.items$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterItem())
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
    this.filteredLeads$ = this.lead$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterLead())
    );
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
  logout() {
    // Clear authentication tokens or perform other logout logic
   // this.authService.logout();

    // Navigate to the login page (assuming your login page has a route named 'login')
    this.navCtrl.navigateRoot('/login');
  }
  filterCustomers(): Observable<any[]> {
    return this.customers$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  };

  filterSuppliers(): Observable<any[]> {
    return this.vendors$.pipe(
      map(vendors =>
        vendors.filter(vendor =>
          Object.values(vendor).some(value => String(value).toLowerCase().includes(this.searchTerms.toLowerCase()))
        )
      )
    );
  }
  onSearchTermChanged(): void {
    this.filteredCustomers$ = this.filterCustomers();
  
  }
  onSearchTermSupplier(){
    this.filteredSupplers$ = this.filterSuppliers();
  }
  filterExecutive(): Observable<any[]> {
    return this.executives$.pipe(
      map(executives =>
        executives.filter(executives =>
          Object.values(executives).some(value => String(value).toLowerCase().includes(this.searchExecutive.toLowerCase()))
        )
      )
    );
  };

  filterItem(): Observable<any[]> {
    return this.items$.pipe(
      map(items =>
        items.filter(items =>
          Object.values(items).some(value => String(value).toLowerCase().includes(this.searchItem.toLowerCase()))
        )
      )
    );
  }
  onSearchTermExecutive(): void {
    this.filteredExecutive$ = this.filterExecutive();
  
  }
  onSearchTermItem(){
    this.filteredItem$ = this.filterItem();
  }
  filterPurchase(): Observable<any[]> {
    return this.purchase$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchPurchase.toLowerCase()))
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
  onSearchTermSale(): void {
    this.filteredSales$ = this.filterSales();
  }

  onSearchTermPurchase(): void {
    this.filteredPurchase$ = this.filterPurchase();
  }
  filterLead(): Observable<any[]> {
    return this.lead$.pipe(
      map(leads =>
        leads.filter(lead =>
          Object.values(lead).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }
  onSearchLeadTerm(): void {
    this.filteredLeads$ = this.filterCustomers();
  }
  filterRecepit(): Observable<any[]> {
    return this.recepits$.pipe(
      map(recepits =>
        recepits.filter(recepit =>
          Object.values(recepit).some(value => String(value).toLowerCase().includes(this.searchReceipt.toLowerCase()))
        )
      )
    );
  }

  filterPayement(): Observable<any[]> {
    return this.payment$.pipe(
      map(payments =>
        payments.filter(payemt =>
          Object.values(payemt).some(value => String(value).toLowerCase().includes(this.searchPayment.toLowerCase()))
        )
      )
    );
  }

  onSearchTermPayment(): void {
    this.filteredPayments$ = this.filterPayement();
  }


  onSearchTermReceipt(): void {
    this.filteredRecepits$ = this.filterRecepit();
  }

}
