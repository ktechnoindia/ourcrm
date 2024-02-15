import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatecompanyService } from '../services/createcompany.service';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { CustomerService } from '../services/customer.service';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InvoicePage implements OnInit {
  @Input() invoiceData: any; // Define input property to receive invoice data
  

  company$: Observable<any[]>
  customers$: Observable<any[]>
  compid: number = 0;
  sales$: Observable<any[]>
  totalAmount: number = 0;
  discountAmount: number = 0;
  grandTotal: number = 0;
  taxAmount: number = 0;
  cgstamt: number = 0;
  sgstamt: number = 0;
  igstamt: number = 0;
  pretaxAmount: number = 0;
  posttaxAmount: number = 0;
  totalitem:number=0;
  
  constructor(private saleService: SalesService, private encService: EncryptionService, private custservice: CustomerService, public session: SessionService, private companyService: CreatecompanyService,) {
    const compid = this.session.getValue('userid')?.valueOf() as number;
    const companyid = '1';
    this.company$ = this.companyService.fetchallcompany(compid, '', '');
    this.customers$ = this.custservice.fetchallCustomer(encService.encrypt(companyid), '', '');
    this.sales$ = this.saleService.fetchallSales(encService.encrypt(companyid), '', '');
    this.sales$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalitem = data.length;
    });
  }

  ngOnInit(): void {
    // Calculate totals when component initializes
    this.calculateTotals();
  }
  calculateTotals() {
    // Logic to calculate totals from sales$ observable
    // Assuming sales$ is an Observable of sales objects
    // You need to subscribe to it and perform calculations
    // Here's a sample logic, replace it with your actual calculation logic
    this.sales$.subscribe(sales => {
      sales.forEach(sale => {
        // Calculate totalAmount, discountAmount, and other totals
        this.totalAmount += sale.total;
        this.discountAmount += sale.discountamt;
        this.grandTotal += sale.total;
        this.taxAmount += sale.totaltax;
        this.discountAmount += sale.discountamt;
        this.cgstamt += sale.CGST;
        this.sgstamt += sale.SGST;
        this.igstamt += sale.IGST;
        this.pretaxAmount += sale.pretax;
        this.posttaxAmount += sale.posttax;


        // Calculate other totals similarly
      });
    });
  }
}
