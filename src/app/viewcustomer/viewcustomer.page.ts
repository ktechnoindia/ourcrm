import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { Observable, Subject, map } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { NavigationExtras } from '@angular/router';
import { SessionService } from '../services/session.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.page.html',
  styleUrls: ['./viewcustomer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  ]
})
export class ViewcustomerPage implements OnInit {
  formDate: string = '';
  toDate: string = '';


  availableColumns: string[] = [
    'Code',
    'Name',
    'GSTIN',
    'Mobile No.',
    'WhatsApp No.',
    'Email',
    'Country',
    'State',
    'District',
    'Pincode',
    'Full Address',
    'Aadhar No.',
    'PAN No.',
    'Udhyog Aadhar No.',
    'Account No.',
    'IFSC Code',
    'Bank Name',
    'Branch Name',
    'Card No.',
    'Credit Period',
    'Credit Limit',
  ];
  selectedColumns: string[] = [
    'Code',
    'Name',
    'GSTIN',
    'Mobile No.',
    'WhatsApp No.',
    'Email',
  ];
  searchTerm: string = '';
  filteredCustomers$: Observable<any[]> = new Observable<any[]>(); 
  customers$: Observable<any[]>; // Assuming you have an Observable for your customers

  totalItems: number = 0;

  constructor(public session: SessionService, private router: Router, private toastCtrl: ToastController, private encService: EncryptionService, private custservice: CustomerService) {
    const compid = '1';

    this.customers$ = this.custservice.fetchallCustomer(encService.encrypt(compid), '', '');
    console.log(this.customers$);

    this.customers$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });

  
  }
  filterCustomers(): Observable<any[]> {
    return this.customers$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredCustomers$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredCustomers$ = this.customers$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  ///edit customer start
  editcustomer(customer: any) {
    console.log(customer);
    let navigationExtras: NavigationExtras = {
      state: {
        customer: customer,
        edit: true
      }
    };
    this.router.navigate(['add-customer'], navigationExtras);

  }
  async openToast(msg: string) {
    this.session.openToast(msg);
  }
  

  goBack() {
    this.router.navigate(["/add-customer"])
  }
}
