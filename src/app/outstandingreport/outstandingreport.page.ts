import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RecepitService } from '../services/recepit.service';
import { Observable, forkJoin, map, of } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { AdditemService } from '../services/additem.service';
import { SalesService } from '../services/sales.service';
import { EncryptionService } from '../services/encryption.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-outstandingreport',
  templateUrl: './outstandingreport.page.html',
  styleUrls: ['./outstandingreport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink, ReactiveFormsModule]
})
export class OutstandingreportPage implements OnInit {
  selectedOption: string = '';
  outstanding$: Observable<any>;
  receipt$: Observable<any>;
  combineData$: Observable<any[]>;
  item$: Observable<any>;
  compid = 1;  // Declare compid once
  columnNames: string[] = ['itemCode', 'itemDesc', 'outstanding_amount'];

  // receiptBill$: Observable<any>;
  dataLength: number = 0;
  selectedCustomerId: number = 0;
  userid: number = 0;
  sales$: Observable<any[]>
  outstanding_amount: any;
  outstanding: number = 0;
  searchTerm: string = '';

  constructor( private session: SessionService,private encService: EncryptionService,private saleService: SalesService,private router: Router, private receiptservice: RecepitService, private itemservice: AdditemService) {
    this.outstanding$ = of(null); // Use an empty Observable initially
    this.receipt$ = of(null);
    this.combineData$ = of([]);
    this.item$ = of(null);
    const compid = session.getValue('companyid')?.valueOf() as string;
    const companyid = '1';
    this.combineData$ = forkJoin([
      this.receiptservice.fetchUserOutstanding(1),
      this.receiptservice.fetchAllRecepit('1', '', ''),
      this.itemservice.fetchallItem(companyid, '', ''),
    ]);
    // this.receiptBill$ = this.receiptservice.fetchAllRecepit('', '', '');
    // this.receiptBill$.subscribe(data => {
    //   // Get the length of the array
    //   this.dataLength = data.length;
    //   console.log('Length of the array:', this.dataLength);
    // });

    this.outstanding$ = this.receiptservice.fetchUserOutstanding(this.userid);
    this.outstanding$.subscribe(outstandingData => {
      console.log(outstandingData);
    });
    console.log(this.outstanding$);

    this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');
    this.sales$.subscribe(salesData => {
      console.log(salesData);
    });
    console.log(this.sales$);

    
  }
  filterCustomers(): Observable<any[]> {
    return this.sales$.pipe(
      map(sales =>
        sales.filter(sale =>
          Object.values(sale).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.sales$ = this.filterCustomers();
  }


  ngOnInit(): void {
    const compid = 1;
    const companyid = '1';
    this.combineData$ = forkJoin([
      this.receiptservice.fetchUserOutstanding(1),
      this.receiptservice.fetchAllRecepit('1', '', ''),
      this.itemservice.fetchallItem(companyid, '', ''),
    ]);

    // Subscribe to combineData$ to handle the data
  }

  goBack() {
    this.router.navigate(["/add-customer"])
  }
}
