import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecepitService } from '../services/recepit.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-receipttransaction-report',
  templateUrl: './receipttransaction-report.page.html',
  styleUrls: ['./receipttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReceipttransactionReportPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  recepits$:  Observable<any[]>;
  searchTerm: string = '';
  filteredRecepits$: Observable<any[]>
  fromDate: string = '';
  toDate: string = '';
  constructor(private session: SessionService,private router:Router,private encService:EncryptionService,private recepitService:RecepitService) { 

    const compid = session.getValue('companyid')?.valueOf() as string;

    this.recepits$ = this.recepitService.fetchAllRecepit(encService.encrypt(compid),'','');
    console.log(this.recepits$);

    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    this.filteredRecepits$=this.recepitService.fetchAllRecepit(encService.encrypt(compid),'','');
  }
  filterRecepit(): Observable<any[]> {
    return this.recepits$.pipe(
      map(recepits =>
        recepits.filter(recepit =>
          Object.values(recepit).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredRecepits$ = this.recepits$.pipe(
      map(quotes => quotes.filter(quote => this.isDateInRange(quote.paymentdate, this.fromDate, this.toDate)))
    );
  }
  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const saleDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return saleDate >= fromDateObj && saleDate <= toDateObj;
  }

  onSearchTermChanged(): void {
    this.filteredRecepits$ = this.filterRecepit();
  }
 
  ngOnInit() {
    this.filteredRecepits$ = this.recepits$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterRecepit())
    );
  }

  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
  generatePdf() {
    const table = document.getElementById('receiptTable');

    if (!table) {
        console.error('Element with id "receiptTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Receipt Transaction Report', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#receiptTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('receipttransaction.pdf');
}


  printThisPage(){
    window.print();
  }
}
