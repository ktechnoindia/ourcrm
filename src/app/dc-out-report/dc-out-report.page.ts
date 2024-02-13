import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { DcoutService } from '../services/dcout.service';
import { EMPTY, Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
import 'jspdf-autotable';



@Component({
  selector: 'app-dc-out-report',
  templateUrl: './dc-out-report.page.html',
  styleUrls: ['./dc-out-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class DcOutReportPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
 


  availableColumns: string[] = [
    'voucherformat',
    'voucherNumber',
    'datetype',
    'vendcode',
    'suppliertype',
    'referenceNumber',
    'refdate',
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
    'voucherNumber',
    'datetype',
    'vendcode',
    'suppliertype',
    'itemcode',
    'itemname',
    'basicrate',
    'discountamt',
    'totaltax',
    'total',
    
  ];
  columnHeaders: { [key: string]: string } = {
    'voucherformat': 'Voucher Format',
    'voucherNumber': 'Voucher Number',
    'datetype': 'Date Type',
    'vendcode': 'Vendor Code',
    'suppliertype': 'Supplier Type',
    'referenceNumber': 'Reference Number',
    'refdate': 'Reference Date',
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
  dcout$: Observable<any[]>;
  searchTerm: string = '';
  filteredDcout$: Observable<any[]> = new Observable<any[]>(); 
  fromDate: string = '';
  toDate: string = '';
  constructor(private router:Router,private toastCtrl:ToastController,private dcoutservice:DcoutService,private encService:EncryptionService,) { 
    const compid='1';

    this.dcout$ = this.dcoutservice.fetchallDcout(encService.encrypt(compid),'','');
    console.log(this.dcout$);
    this.dcout$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;

    });
    this.updateManualHeaders();
    this.fromDate = new Date().toISOString().split('T')[0];
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
  async onSubmit(){
    const fromDateObj = new Date(this.fromDate);
  const toDateObj = new Date(this.toDate);

  // Filter DC-OUT data based on date range
  this.dcout$ = this.dcout$.pipe(
    map(dcouts => dcouts.filter(dcout => {
      const voucherDate = new Date(dcout.datetype);
      return voucherDate >= fromDateObj && voucherDate <= toDateObj;
    }))
  );
  }

  filterCustomers(): Observable<any[]> {
    return this.dcout$.pipe(
      map(dcouts =>
        dcouts.filter(dcout =>
          Object.values(dcout).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredDcout$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredDcout$ = this.dcout$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
    this.filteredBillingData$ = this.dcout$.pipe(
      map(data => {
        // Implement your filtering logic based on the selected time periods
        return data.filter(dcout => {
          // Modify this logic based on your data structure
          const dcoutDate = new Date(dcout.dcoutDate); // Assuming 'quateDate' is the field representing the date
    
          if (this.selectedTimePeriods.includes('today')) {
            // Implement logic for filtering by today
            const today = new Date();
            return dcoutDate.toDateString() === today.toDateString();
          }
    
          if (this.selectedTimePeriods.includes('monthly')) {
            // Implement logic for filtering by monthly
            const currentMonth = new Date().getMonth();
            const dcoutMonth = dcoutDate.getMonth();
            return dcoutMonth === currentMonth;
          }
    
          if (this.selectedTimePeriods.includes('quartly')) {
            // Implement logic for filtering by quarterly
            const currentQuarter = Math.floor(new Date().getMonth() / 3);
            const dcoutQuarter = Math.floor(dcoutDate.getMonth() / 3);
            return dcoutQuarter === currentQuarter;
          }
    
          if (this.selectedTimePeriods.includes('annually')) {
            // Implement logic for filtering by annually
            const currentYear = new Date().getFullYear();
            const dcoutYear = dcoutDate.getFullYear();
            return dcoutYear === currentYear;
          }
    
          // Return true for the rows that should be included
          return true;
        });
      })
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredDcout$ = this.dcout$.pipe(
      map(dcout => dcout.filter(dcout => this.isDateInRange(dcout.datetype, this.fromDate, this.toDate)))
    );
  }

  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const dcinDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return dcinDate >= fromDateObj && dcinDate <= toDateObj;
  }
  goBack(){
    this.router.navigate(["/dc-out"])
  }
  generatePdf() {
    const table = document.getElementById('dcoutTable');

    if (!table) {
        console.error('Element with id "dcoutTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('DC-OUT Report', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#dcoutTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('dcoutreport.pdf');
}


  printThisPage(){
    window.print();
  }
}
