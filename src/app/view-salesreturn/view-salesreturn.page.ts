import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { EMPTY, Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SalereturnService } from '../services/salereturn.service';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-view-salesreturn',
  templateUrl: './view-salesreturn.page.html',
  styleUrls: ['./view-salesreturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewSalesreturnPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  fromDate: string = '';
  toDate: string = '';

  salesreturns$: Observable<any[]>;
  searchTerm: string = '';
   availableColumns: string[] = [
    'billformate',
    'billNumber',
    'billDate',
    'custcode',
    'custname',
    'refrence',
    'refdate',
    'orderDate',
    'orderNumber',
    'gstin',
    'salePerson',
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

  ];
  selectedColumns: string[] = [
    'billformate',
    'billDate',
    'billNumber',
    'custcode',
    'custname',
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
    'custcode': 'Customer Code',
    'custname': 'Customer Name',
    'refrence': 'Reference',
    'refdate': 'Reference Date',
    'orderDate': 'Order Date',
    'orderNumber': 'Order Number',
    'gstin': 'GSTIN',
    'salePerson': 'Sales Person',
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
  };
  
  manualHeaders: string[] = [];

  totalItems: number = 0;
  selectedTimePeriods: string[] = [];
  filteredBillingData$: Observable<any[]> = EMPTY; // Default to an empty observable
  filteredSalereturns$: Observable<any[]> = new Observable<any[]>();

  constructor(private router:Router,private toastCtrl:ToastController,private salereturnservice:SalereturnService,private encService:EncryptionService
    ) { 
    const compid='1';

    this.salesreturns$ = this.salereturnservice.fetchallSalesreturn(encService.encrypt(compid),'','');
    // console.log(this.salesreturns$);

    this.salesreturns$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });
    this.updateManualHeaders();
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    this.filteredSalereturns$ = this.salesreturns$;

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
    return this.salesreturns$.pipe(
      map(salesreturns =>
        salesreturns.filter(salesreturns =>
          Object.values(salesreturns).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredSalereturns$ = this.salesreturns$.pipe(
      map(sales => sales.filter(sale => this.isDateInRange(sale.billDate, this.fromDate, this.toDate)))
    );
  }
  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const saleDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return saleDate >= fromDateObj && saleDate <= toDateObj;
  }
 
  onSearchTermChanged(): void {
    this.filteredSalereturns$ = this.filterCustomers();
  }
 
  ngOnInit() {
    // this.filteredSalereturns$ = this.salesreturns$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(() => this.filterCustomers())
    // );
    this.filteredBillingData$ = this.salesreturns$.pipe(
      map(data => {
        // Implement your filtering logic based on the selected time periods
        return data.filter(sales => {
          // Modify this logic based on your data structure
          const salesDate = new Date(sales.salesDate); // Assuming 'quateDate' is the field representing the date
    
          if (this.selectedTimePeriods.includes('today')) {
            // Implement logic for filtering by today
            const today = new Date();
            return salesDate.toDateString() === today.toDateString();
          }
    
          if (this.selectedTimePeriods.includes('monthly')) {
            // Implement logic for filtering by monthly
            const currentMonth = new Date().getMonth();
            const salesMonth = salesDate.getMonth();
            return salesMonth === currentMonth;
          }
    
          if (this.selectedTimePeriods.includes('quartly')) {
            // Implement logic for filtering by quarterly
            const currentQuarter = Math.floor(new Date().getMonth() / 3);
            const salesQuarter = Math.floor(salesDate.getMonth() / 3);
            return salesQuarter === currentQuarter;
          }
    
          if (this.selectedTimePeriods.includes('annually')) {
            // Implement logic for filtering by annually
            const currentYear = new Date().getFullYear();
            const salesYear = salesDate.getFullYear();
            return salesYear === currentYear;
          }
    
          // Return true for the rows that should be included
          return true;
        });
      })
    );
  } 

goBack(){
  this.router.navigate(["/salesreturn"])
}

generatePdf() {
  const table = document.getElementById('salesreturnTable');

  if (!table) {
      console.error('Element with id "salesreturnTable" not found.');
      return;
  }

  const pdf = new jsPDF();

  const header = function (data: any) {
      pdf.setFontSize(18);
      pdf.setTextColor(40);
      pdf.setFont('curier', 'bold');
      pdf.text('Sales Return Report', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
  };

  const footer = function (data: any) {
      const pageCount = pdf.internal.pages.length;
      pdf.setFontSize(14);
      pdf.setTextColor(40);
      pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
  };

  (pdf as any).autoTable({
      html: '#salesreturnTable',
      styles: {
          lineWidth: 0.1, // set border line width
          lineColor: [0, 0, 0], // set border color (black in this case)
      },
      didDrawPage: function (data: any) {
          header(data);
          footer(data);
      }
  });

  pdf.save('salesreturn.pdf');
}


printThisPage(){
  window.print();
}
}
