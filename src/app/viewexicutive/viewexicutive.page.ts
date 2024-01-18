import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ExecutiveService } from '../services/executive.service';
import { EncryptionService } from '../services/encryption.service';
import { RouterModule,RouterLink } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-viewexicutive',
  templateUrl: './viewexicutive.page.html',
  styleUrls: ['./viewexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,RouterLink]
})
export class ViewexicutivePage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate:string='';
  toDate:string='';
  executives$: Observable<any[]>
  searchTerm: string = '';
  filteredExecutives$: Observable<any[]> = new Observable<any[]>(); 
  columnHeaders: { [key: string]: string } = {
    'companyid': 'Company ID',
    'roleid': 'Role ID',
    'excode': 'Executive Code',
    'executivename': 'Executive Name',
    'emanager': 'Manager',
    'emobile': 'Mobile',
    'eemail': 'Email',
    'ewhatsapp': 'WhatsApp',
    'epan': 'PAN',
    'ecommision': 'Commission',
    'ledger': 'Ledger',
  };
  
  availableColumns: string[] = [
    'companyid',
    'roleid',
    'excode',
    'executivename',
    'emanager',
    'emobile',
    'eemail',
    'ewhatsapp',
    'epan',
    'ecommision',
    'ledger',
  ];
  selectedColumns: string[] = [
    'companyid',
    'roleid',
    'excode',
    'executivename',
    'emanager',
    'emobile',
    'eemail',
  ];
  manualHeaders: string[] = [];

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
  totalItems: number = 0;
  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private executService:ExecutiveService) { 
    const compid='1';

    this.executives$ = this.executService.fetchAllExecutive(compid,'','');
    console.log(this.executives$);
    this.executives$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
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
  filterCustomers(): Observable<any[]> {
    return this.executives$.pipe(
      map(executives =>
        executives.filter(executive =>
          Object.values(executive).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredExecutives$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredExecutives$ = this.executives$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }


  deleteExecutive(customerid: number, event: any) {
    
    const confirmDelete = confirm('Are you sure you want to delete this executive?');
    if (!confirmDelete) {
      return;
    }
  
    const companyid = 1;
    this.executService.deleteexecutive(customerid,companyid).subscribe({
      next: (res) => {
        alert('Executive Deleted!');
        console.log('delete',res)

     },
      error: (err) => {
        console.error('Error deleting executive', err);
        // Handle the error as needed
      }
    });
  }
  
  ///edit customer start  


goBack(){
  this.router.navigate(["/add-executive"])
}
}
