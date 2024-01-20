import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  totalItems: number = 0;

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
    'frombill',
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
    'attr1',
    'attr2',
    'attr3',
    'attr4',
    'attr5',
    'attr6',
    'attr7',
    'attr8',

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
  columnHeaders: { [key: string]: string } = {
    'billformate': 'Bill Format',
    'billNumber': 'Bill Number',
    'billDate': 'Bill Date',
    'vendcode': 'Vendor Code',
    'supplier': 'Supplier',
    'refrence': 'Reference',
    'refdate': 'Reference Date',
    'orderDate': 'Order Date',
    'orderNumber': 'Order Number',
    'gstin': 'GSTIN',
    'exicutive': 'Executive',
    'frombill': 'From Bill',
    'payment': 'Payment',
    'deliverydate': 'Delivery Date',
    'deliveryplace': 'Delivery Place',
    'barcode': 'Barcode',
    'itemcode': 'Item Code',
    'itemname': 'Item Name',
    'description': 'Description',
    'quantity': 'Quantity',
    'unitname': 'Unit Name',
    'mrp': 'MRP',
    'basicrate': 'Basic Rate',
    'netrate': 'Net Rate',
    'grossrate': 'Gross Rate',
    'taxrate': 'Tax Rate',
    'IGST': 'IGST',
    'CGST': 'CGST',
    'SGST': 'SGST',
    'discount': 'Discount',
    'discountamt': 'Discount Amount',
    'totaltax': 'Total Tax',
    'pretax': 'Pre-tax',
    'posttax': 'Post-tax',
    'total': 'Total',
    'attr1':'Attr1',
    'attr2':'Attr2',
    'attr3':'Attr3',
    'attr4':'Attr4',
    'attr5':'Attr5',
    'attr6':'Attr6',
    'attr7':'Attr7',
    'attr8':'Attr8',
  };
  
  manualHeaders: string[] = [];

  purchase$: Observable<any[]>
  searchTerm: string = '';
  filteredPurchase$: Observable<any[]> = new Observable<any[]>(); 
  
  constructor( private purchaseservice:PurchaseService,private encService: EncryptionService,private router:Router,private toastCtrl:ToastController) {
    const compid = '1';

    this.purchase$ = this.purchaseservice.fetchallPurchase(encService.encrypt(compid), '', '');
    console.log(this.purchase$);

    this.purchase$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
        });
    this.filteredPurchase$ = this.purchase$;
    this.updateManualHeaders();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedColumns' in changes) {
      this.updateManualHeaders();
    }
  }

  updateManualHeaders() {
    // Use the mapping to get the headers for the selected columns
    this.manualHeaders = ['Sr. No.', ...this.selectedColumns.map(col => this.columnHeaders[col]), 'Action'];
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
