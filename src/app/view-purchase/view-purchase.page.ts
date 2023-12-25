import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { PurchasereturnService } from '../services/purchasereturn.service';
// import { ExcelService } from '../services/excel.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.page.html',
  styleUrls: ['./view-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewPurchasePage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate: string = '';
  toDate: string = '';

  generatePdf() {
    let pdf = new jsPDF()

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        //save this pdf document
        pdf.save("sample Pdf")
      }
    })
  }
  printThisPage(){
    window.print();
  }
  // generateExcelReport() {
  //   const data: any[] = [
  //     // Your data rows here
  //   ];
  //   const fileName = 'Excel Report';

  //   this.excelService.generateExcel(data, fileName);
  // }
  purchase$: Observable<any[]>
  searchTerm: string = '';
  filteredPurchase$: Observable<any[]> = new Observable<any[]>(); 
  
  constructor( private purchasereturnService:PurchasereturnService,private encService: EncryptionService,private router:Router,private toastCtrl:ToastController) {
    const compid = '1';

    this.purchase$ = this.purchasereturnService.fetchallPurchasereturn(encService.encrypt(compid), '', '');
    console.log(this.purchase$);

    this.purchase$.subscribe(data => {
      console.log(data); // Log the data to the  console to verify if it's being fetched
    });
    this.filteredPurchase$ = this.purchase$;
   }

   filterCustomers(): Observable<any[]> {
    return this.purchase$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredPurchase$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredPurchase$ = this.purchase$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

   filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredPurchase$ = this.purchase$.pipe(
      map(sales => sales.filter(sale => this.isDateInRange(sale.billDate, this.formDate, this.toDate)))
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


goBack(){
  this.router.navigate(["/add-purchase"])
}
}
