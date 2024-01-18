import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-paymenttransaction-report',
  templateUrl: './paymenttransaction-report.page.html',
  styleUrls: ['./paymenttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class PaymenttransactionReportPage implements OnInit {
  payment$: Observable<any[]>;
  filteredPayments$: Observable<any[]> = new Observable<any[]>();
  searchTerm: string = '';

  constructor(private payment: PaymentService, private router: Router, private encService: EncryptionService) {
    const compid = '1';
    this.payment$ = this.payment.fetchAllPayment(encService.encrypt(compid), '', '');
    console.log(this.payment$);

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
