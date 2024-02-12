import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PurchasereturnService } from '../services/purchasereturn.service';
import { EncryptionService } from '../services/encryption.service';
import { EMPTY, Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-view-purchasereturn',
  templateUrl: './view-purchasereturn.page.html',
  styleUrls: ['./view-purchasereturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ViewPurchasereturnPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate: string = '';
  toDate: string = '';

 
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
  constructor(private router: Router, private toastCtrl: ToastController, private purchasereturnservice: PurchasereturnService, private encService: EncryptionService) {
    const compid = '1';

    this.purchasereturn$ = this.purchasereturnservice.fetchallPurchasereturn(encService.encrypt(compid), '', '');
    console.log(this.purchasereturn$);
    this.purchasereturn$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });
    this.updateManualHeaders();
    this.formDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
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
    this.filteredBillingData$ = this.purchasereturn$.pipe(
      map(data => {
        // Implement your filtering logic based on the selected time periods
        return data.filter(purchase => {
          // Modify this logic based on your data structure
          const purchaseDate = new Date(purchase.purchaseDate); // Assuming 'quateDate' is the field representing the date
    
          if (this.selectedTimePeriods.includes('today')) {
            // Implement logic for filtering by today
            const today = new Date();
            return purchaseDate.toDateString() === today.toDateString();
          }
    
          if (this.selectedTimePeriods.includes('monthly')) {
            // Implement logic for filtering by monthly
            const currentMonth = new Date().getMonth();
            const purchaseMonth = purchaseDate.getMonth();
            return purchaseMonth === currentMonth;
          }
    
          if (this.selectedTimePeriods.includes('quartly')) {
            // Implement logic for filtering by quarterly
            const currentQuarter = Math.floor(new Date().getMonth() / 3);
            const purchaseQuarter = Math.floor(purchaseDate.getMonth() / 3);
            return purchaseQuarter === currentQuarter;
          }
    
          if (this.selectedTimePeriods.includes('annually')) {
            // Implement logic for filtering by annually
            const currentYear = new Date().getFullYear();
            const purchaseYear = purchaseDate.getFullYear();
            return purchaseYear === currentYear;
          }
    
          // Return true for the rows that should be included
          return true;
        });
      })
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredPurchasereturns$ = this.purchasereturn$.pipe(
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
  goBack() {
    this.router.navigate(["/purchasereturn"])
  }
  generatePdf() {
    const table = document.getElementById('purchasereturnTable');

    if (!table) {
        console.error('Element with id "purchasereturnTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Purchase Return Report', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#purchasereturnTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('purchasereturn.pdf');
}


  printThisPage(){
    window.print();
  }
}
