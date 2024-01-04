import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { LegderService } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
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
  searchTerm: string = '';
  filteredLedgers$: Observable<any[]> = new Observable<any[]>(); 
  ledgers$: Observable<any[]>
  // filteredSales: Observable<any[]>;
  availableColumns: string[] = [
    'ledger_code',
    'lname',
    'companyid',
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
  totalItems: number = 0;

  constructor(private router:Router,private ledgerService:LegderService , private encService:EncryptionService) { 
    const compid='1';

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid,'','');
    console.log(this.ledgers$);
    this.ledgers$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
        });
  }

  filterCustomers(): Observable<any[]> {
    return this.ledgers$.pipe(
      map(ledgers =>
        ledgers.filter(ledger =>
          Object.values(ledger).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredLedgers$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredLedgers$ = this.ledgers$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredLedgers$ = this.ledgers$.pipe(
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

}
