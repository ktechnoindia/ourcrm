import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';
import { Observable } from 'rxjs';
import { QuotationService } from '../services/quotation.service';
import { DcinService } from '../services/dcin.service';
import { DcoutService } from '../services/dcout.service';
import { SalesService } from '../services/sales.service';
import { PurchaseService } from '../services/purchase.service';
import { SalereturnService } from '../services/salereturn.service';
import { PurchasereturnService } from '../services/purchasereturn.service';

@Component({
  selector: 'app-transcationdashboard',
  templateUrl: './transcationdashboard.page.html',
  styleUrls: ['./transcationdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class TranscationdashboardPage implements OnInit {
  
  quote$:  Observable<any[]>;
  dcin$: Observable<any[]>;
  dcout$: Observable<any>;
  sales$: Observable<any[]>;
  purchase$: Observable<any[]>
  purchasereturn$: Observable<any[]>
  totalQuote: number=0;
  totaldcin: number=0;
  totaldcout: number=0;
  totalsales: number=0;
  totalpurchase: number=0;
  salreturn$: Observable<any[]>;
  totalsalesreturn: number=0;
  totalpurchasereturn: number=0;
  selectedOptions: string[] = [];

  constructor(private encService: EncryptionService,private quoteservice: QuotationService,private venderService:VendorService,private executService:ExecutiveService,private additem : AdditemService,private dcinservice: DcinService,private dcoutservice:DcoutService,private saleService: SalesService, private purchaseService:PurchaseService,private salereturnservice:SalereturnService,private purchasereturnservice:PurchasereturnService, ) { 
    this.selectedOptions = ['saleslist', 'purchaselist'];
    const compid = '1';
    const userid = '1';
    this.quote$ = this.quoteservice.fetchallQuote(encService.encrypt(compid),(userid), '', '');
    console.log(this.quote$);

    this.quote$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalQuote=data.length;
    });
    this.dcin$ = this.dcinservice.fetchallDcin(encService.encrypt(compid), '', '');
    console.log(this.dcin$);

    this.dcin$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totaldcin=data.length;
    });

    this.dcout$ = this.dcoutservice.fetchallDcout(encService.encrypt(compid),'','');
    console.log(this.dcout$);

    this.dcout$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totaldcout=data.length;
    });
    
    this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');
    console.log(this.sales$);

    this.sales$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalsales=data.length;

    });

    this.purchase$ = this.purchaseService.fetchallPurchase(encService.encrypt(compid), '', '');
    console.log(this.purchase$);

    this.purchase$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalpurchase=data.length;

    });

    this.salreturn$ = this.salereturnservice.fetchallSalesreturn(encService.encrypt(compid),'','');
    console.log(this.salreturn$);

    this.salreturn$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalsalesreturn=data.length;

    });
    this.purchasereturn$ = this.purchasereturnservice.fetchallPurchasereturn(encService.encrypt(compid),'','');
    console.log(this.purchasereturn$);

    this.  purchasereturn$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalpurchasereturn=data.length;
    });

    

}
  ngOnInit() {
  }
 
}

