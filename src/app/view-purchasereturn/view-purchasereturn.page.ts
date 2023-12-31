import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PurchasereturnService } from '../services/purchasereturn.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-view-purchasereturn',
  templateUrl: './view-purchasereturn.page.html',
  styleUrls: ['./view-purchasereturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewPurchasereturnPage implements OnInit {
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
  purchasereturn$: Observable<any[]>;
  searchTerm: string = '';
  filteredPurchasereturns$: Observable<any[]> = new Observable<any[]>(); 
// filteredSales: Observable<any[]>;
availableColumns: string[] = [
  'billformate',
  'billNumber',
  'billDate',
  'vendcode',
  'supplier',
  'refrence',
  'refdate',
  'orderDate',
  'orderNumber',
  'gstin',
  'exicutive',
  'payment',
  'deliverydate',
  'deliveryplace',
  'barcode',
  'itemcode',
  'itemname',
  'description',
  'quantity',
  'unitname',
  'mrp',
  'basicrate',
  'netrate',
  'grossrate',
  'taxrate',
  'IGST',
  'CGST',
  'SGST',
  'discount',
  'discountamt',
  'totaltax',
  'pretax',
  'posttax',
  'total',

];
selectedColumns: string[] = [
  'billformate',
  'billDate',
  'billNumber',
  'vendcode',
  'supplier',
  'itemcode',
  'itemname',
  'quantity',
  'unitname',
  'taxrate',
  'totaltax',
    'total',
];
totalItems: number = 0;

  constructor(private router:Router,private toastCtrl:ToastController,private purchasereturnservice:PurchasereturnService,private encService:EncryptionService ) { 
    const compid='1';

    this.purchasereturn$ = this.purchasereturnservice.fetchallPurchasereturn(encService.encrypt(compid),'','');
    console.log(this.purchasereturn$);
    this.purchasereturn$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
        });
  }

  filterCustomers(): Observable<any[]> {
    return this.purchasereturn$.pipe(
      map(purchasereturns =>
        purchasereturns.filter(purchasereturn =>
          Object.values(purchasereturn).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredPurchasereturns$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredPurchasereturns$ = this.purchasereturn$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

goBack(){
  this.router.navigate(["/purchasereturn"])
}
}
