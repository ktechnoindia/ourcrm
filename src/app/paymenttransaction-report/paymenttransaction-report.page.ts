import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paymenttransaction-report',
  templateUrl: './paymenttransaction-report.page.html',
  styleUrls: ['./paymenttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class PaymenttransactionReportPage implements OnInit {
  payment$: any;
  filteredPayments$: Observable<any[]> = new Observable<any[]>();
  searchTerm: string = '';

  constructor(private payment: PaymentService, private router: Router, private encService: EncryptionService) {
    const compid = '1';
    this.payment$ = this.payment.fetchAllPayment(encService.encrypt(compid), '', '');
    console.log(this.payment$);

  }
  
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
}
