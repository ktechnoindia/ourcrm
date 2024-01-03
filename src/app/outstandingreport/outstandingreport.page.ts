import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecepitService } from '../services/recepit.service';
import { Observable, forkJoin, of } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { AdditemService } from '../services/additem.service';

@Component({
  selector: 'app-outstandingreport',
  templateUrl: './outstandingreport.page.html',
  styleUrls: ['./outstandingreport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OutstandingreportPage implements OnInit {
  selectedOption: string = '';
  outstanding$: Observable<any>;
  receipt$: Observable<any>;
  combineData$: Observable<any[]>;
  item$: Observable<any>;
  compid = 1;  // Declare compid once
  columnNames: string[] = ['itemCode', 'itemDesc', 'outstanding_amount'];


  constructor(private router: Router, private receiptservice: RecepitService, private itemservice: AdditemService) {
    this.outstanding$ = of(null); // Use an empty Observable initially
this.receipt$ = of(null);
this.combineData$ = of([]);
this.item$ = of(null);
  }

  ngOnInit(): void {
    const compid=1;
    const companyid='1';
    this.combineData$ = forkJoin([
      this.receiptservice.fetchUserOutstanding(1),
      this.receiptservice.fetchAllReceppit('1', '', ''),
      this.itemservice.fetchallItem(companyid, '', ''),
    ]);

    // Subscribe to combineData$ to handle the data
  }

  goBack() {
    this.router.navigate(["/add-customer"])
  }
}
