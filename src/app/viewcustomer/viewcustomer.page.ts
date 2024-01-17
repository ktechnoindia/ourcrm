import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';

// import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.page.html',
  styleUrls: ['./viewcustomer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewcustomerPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate: string = '';
  toDate: string = '';
  compid: string='';


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
  // generateExcelReport() {
  //   const data: any[] = [
  //     // Your data rows here
  //   ];
  //   const fileName = 'Excel Report';

  //   this.excelService.generateExcel(data, fileName);
  // }
  columnHeaders: { [key: string]: string } = {
    'customer_code': 'Customer Code',
    'name': 'Name',
    'gstin': 'GSTIN',
    'whatsapp_number': 'WhatsApp Number',
    'email': 'Email',
    'countryid': 'Country ID',
    'stateid': 'State ID',
    'districtid': 'District ID',
    'pincode': 'Pincode',
    'address': 'Address',
    'aadhar_no': 'Aadhar Number',
    'pan_no': 'PAN Number',
    'udhyog_aadhar': 'Udhyog Aadhar',
    'account_number': 'Account Number',
    'ifsc_code': 'IFSC Code',
    'bank_name': 'Bank Name',
    'branch_name': 'Branch Name',
    'card_number': 'Card Number',
    'credit_period': 'Credit Period',
    'credit_limit': 'Credit Limit',
  };
  
  manualHeaders: string[] = [];
  availableColumns: string[] = [
    'customer_code',
    'name',
    'gstin',
    'whatsapp_number',
    'email',
    'countryid',
    'stateid',
    'districtid',
    'pincode',
    'address',
    'aadhar_no',
    'pan_no',
    'udhyog_aadhar',
    'account_number',
    'ifsc_code',
    'bank_name',
    'branch_name',
    'card_number',
    'credit_period',
    'credit_limit',
  ];
  selectedColumns: string[] = [
    'customer_code',
    'name',
    'gstin',
    'whatsapp_number',
    'email',
    'countryid',
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
  deleteCustomer(customerid: number, event: any) {
    
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (!confirmDelete) {
      return;
    }
  
    const companyid = 1;
    this.custservice.deleteCustomer(customerid,companyid).subscribe({
      next: (res) => {
        alert('Customer Deleted!');
        console.log('delete',res)

     },
      error: (err) => {
        console.error('Error deleting customer', err);
        // Handle the error as needed
      }
    });
  }
  

}
