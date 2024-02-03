import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-paymenttransaction-report',
  templateUrl: './paymenttransaction-report.page.html',
  styleUrls: ['./paymenttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,ReactiveFormsModule]
})
export class PaymenttransactionReportPage implements OnInit {
  payment$: Observable<any[]>;
  filteredPayments$: Observable<any[]> = new Observable<any[]>();
  searchTerm: string = '';
  el: any;
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
  fromDate: string = '';
  toDate: string = '';
  constructor(private payment: PaymentService, private router: Router, private encService: EncryptionService) {
    const compid = '1';
    this.payment$ = this.payment.fetchAllPayment(encService.encrypt(compid), '', '');
    console.log(this.payment$);
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    this.filteredPayments$=this.payment$;
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
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredPayments$ = this.payment$.pipe(
      map(quotes => quotes.filter(quote => this.isDateInRange(quote.paymentdate, this.fromDate, this.toDate)))
    );
  }
  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const saleDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return saleDate >= fromDateObj && saleDate <= toDateObj;
  }

  onSearchTermPayment(): void {
    this.filteredPayments$ = this.filterPayement();
  }
  
  ngOnInit() {
    this.filteredPayments$ = this.payment$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterPayement())
    );
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
}
