import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { LegderService } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
import 'jspdf-autotable';

@Component({
  selector: 'app-viewledger',
  templateUrl: './viewledger.page.html',
  styleUrls: ['./viewledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewledgerPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate: string = '';
  toDate: string = '';

 
  searchTerm: string = '';
  filteredLedgers$: Observable<any[]> = new Observable<any[]>(); 
  ledgers$: Observable<any[]>
  // filteredSales: Observable<any[]>;
  availableColumns: string[] = [
    'ledger_code',
    'lname',
    'companyName',
    'lgroup_name',
    'gstin',
    'opening_balance',
    'closing_balance',
    'mobile',
    'whatsapp_number',
    'email',
    'country',
    'state',
    'address',
    'pincode',
    'tdn',
    'aadhar_no',
    'pan_no',
    'udhyog_aadhar',
    'account_number',
    'ifsc_code',
    'bank_name',
    'branch_name',
    'card_number',
    'credit_period',
    'credit_limit',

  ];
  selectedColumns: string[] = [
    'ledger_code',
    'lname',
    'companyName',
    'mobile',
    'state',
    'address',
  ];
  manualHeaders: string[] = [];
  columnHeaders: { [key: string]: string } = {
    'ledger_code': 'Ledger Code',
    'lname': 'Ledger Name',
    'companyName': 'Company Name',
    'lgroup_name': 'Ledger Group Name',
    'gstin': 'GSTIN',
    'opening_balance': 'Opening Balance',
    'closing_balance': 'Closing Balance',
    'mobile': 'Mobile',
    'whatsapp_number': 'WhatsApp Number',
    'email': 'Email',
    'country': 'Country',
    'state': 'State',
    'address': 'Address',
    'pincode': 'Pincode',
    'tdn': 'TDN',
    'aadhar_no': 'Aadhar Number',
    'pan_no': 'PAN Number',
    'udhyog_aadhar': 'Udhyog Aadhar',
    'account_number': 'Account Number',
    'ifsc_code': 'IFSC Code',
    'bank_name': 'Bank Name',
    'branch_name': 'Branch Name',
    'card_number': 'Card Number',
    'credit_period': 'Credit Period',
    'credit_limit': 'Credit Limit',
  };
  
  totalItems: number = 0;

  constructor(private router:Router,private ledgerService:LegderService , private encService:EncryptionService) { 
    const companyid='1';

    this.ledgers$ = this.ledgerService.fetchAllLedger(companyid,'','');
    // console.log(this.ledgers$);
    this.ledgers$.subscribe(data => {
      // console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
        });
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
  deleteLedger(customerid: number, event: any) {
    
    const confirmDelete = confirm('Are you sure you want to delete this ledger?');
    if (!confirmDelete) {
      return;
    }
  
    const companyid = 1;
    this.ledgerService.deleteledger(customerid,companyid).subscribe({
      next: (res) => {
        alert('Legder Deleted!');
        console.log('delete',res)

     },
      error: (err) => {
        console.error('Error deleting ledger', err);
        // Handle the error as needed
      }
    });
  }

  // filterCustomers(): Observable<any[]> {
  //   return this.ledgers$.pipe(
  //     map(ledgers =>
  //       ledgers.filter(ledger =>
  //         Object.values(ledger).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
  //       )
  //     )
  //   );
  // }

  onSearchTermChanged(): void {
    // this.filteredLedgers$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredLedgers$ = this.ledgers$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // switchMap(() => this.filterCustomers())
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.ledgers$ = this.ledgers$.pipe(
      map(ledgers => ledgers.filter(ledger => this.isDateInRange(ledger.billDate, this.formDate, this.toDate)))
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
    this.router.navigate(['/ledger']); // Navigate back to the previous page
  }
  generatePdf() {
    const table = document.getElementById('ledgerTable');

    if (!table) {
        console.error('Element with id "ledgerTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Ledger List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#ledgerTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('ledger.pdf');
}


  printThisPage(){
    window.print();
  }
}
