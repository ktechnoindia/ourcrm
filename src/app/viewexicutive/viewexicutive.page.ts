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
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
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

 
  totalItems: number = 0;
  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private executService:ExecutiveService) { 
    const compid='1';

    this.executives$ = this.executService.fetchAllExecutive(compid,'','');
    // console.log(this.executives$);
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
  filterExecutive(): Observable<any[]> {
    return this.executives$.pipe(
      map(executives =>
        executives.filter(executive =>
          Object.values(executive).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.executives$ = this.filterExecutive();
  }
 
  ngOnInit() {
    // this.filteredExecutives$ = this.executives$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(() => this.filterExecutive())
    // );
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

generatePdf() {
  const table = document.getElementById('executiveTable');

  if (!table) {
      console.error('Element with id "executiveTable" not found.');
      return;
  }

  const pdf = new jsPDF();

  const header = function (data: any) {
      pdf.setFontSize(18);
      pdf.setTextColor(40);
      pdf.setFont('curier', 'bold');
      pdf.text('Executive List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
  };

  const footer = function (data: any) {
      const pageCount = pdf.internal.pages.length;
      pdf.setFontSize(14);
      pdf.setTextColor(40);
      pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
  };

  (pdf as any).autoTable({
      html: '#executiveTable',
      styles: {
          lineWidth: 0.1, // set border line width
          lineColor: [0, 0, 0], // set border color (black in this case)
      },
      didDrawPage: function (data: any) {
          header(data);
          footer(data);
      }
  });

  pdf.save('executive.pdf');
}


printThisPage(){
  window.print();
}
}
