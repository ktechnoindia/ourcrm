import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { Observable, map } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { PurchasereturnService } from '../services/purchasereturn.service';
@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.page.html',
  styleUrls: ['./view-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewPurchasePage implements OnInit {
  fromDate:string='';
  toDate:string='';
  purchase$: Observable<any[]>
  filteredPurchase: Observable<any[]>;
  constructor( private purchasereturnService:PurchasereturnService,private encService: EncryptionService,private router:Router,private toastCtrl:ToastController) {
    const compid = '1';

    this.purchase$ = this.purchasereturnService.fetchallPurchasereturn(encService.encrypt(compid), '', '');
    console.log(this.purchase$);

    this.purchase$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
    this.filteredPurchase = this.purchase$;
   }

   filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredPurchase = this.purchase$.pipe(
      map(sales => sales.filter(sale => this.isDateInRange(sale.billDate, this.fromDate, this.toDate)))
    );
  }

  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    // Parse the dates into JavaScript Date objects
    const saleDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Check if the saleDate is within the range
    return saleDate >= fromDateObj && saleDate <= toDateObj;
  }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/add-purchase"])
}
}
