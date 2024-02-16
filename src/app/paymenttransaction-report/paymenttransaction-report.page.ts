import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-paymenttransaction-report',
  templateUrl: './paymenttransaction-report.page.html',
  styleUrls: ['./paymenttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,ReactiveFormsModule]
})
export class PaymenttransactionReportPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  payment$: Observable<any[]>;
  // filteredPayments$: Observable<any[]> = new Observable<any[]>();
  searchTerm: string = '';
 
  fromDate: string = '';
  toDate: string = '';
  constructor(private payment: PaymentService, private router: Router, private encService: EncryptionService) {
    const compid = '1';
    this.payment$ = this.payment.fetchAllPayment(encService.encrypt(compid), '', '');
    console.log(this.payment$);
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    // this.filteredPayments$=this.payment$;
  }

  
  filterData() {
    // Update the filteredSales observable based on the date range
    this.payment$ = this.payment$.pipe(
      map(quotes => quotes.filter(quote => this.isDateInRange(quote.paymentdate, this.fromDate, this.toDate)))
    );
  }
  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const saleDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return saleDate >= fromDateObj && saleDate <= toDateObj;
  }
  filterPayement(): Observable<any[]> {
    return this.payment$.pipe(
      map(payments =>
        payments.filter(payemt =>
          Object.values(payemt).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }
  onSearchTermPayment(): void {
    this.payment$ = this.filterPayement();
  }
  
  ngOnInit() {
    this.payment$ = this.payment$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // switchMap(() => this.filterPayement())
    );
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
  generatePdf() {
    const table = document.getElementById('paymentTable');

    if (!table) {
        console.error('Element with id "paymentTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Payment Transactions Report', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#paymentTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('paymnettransactions.pdf');
}


  printThisPage(){
    window.print();
  }
}
