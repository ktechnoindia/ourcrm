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
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

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

  columnHeaders: { [key: string]: string } = {
    'customer_code': 'Customer Code',
    'name': 'Name',
    'gstin': 'GSTIN',
    'whatsapp_number': 'WhatsApp Number',
    'email': 'Email',
    'countryid': 'Country',
    'stateid': 'State',
    'districtid': 'District',
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

    this.customers$.subscribe(data => {
      this.totalItems = data.length;
    });
    this.updateManualHeaders();
  }
  selectAdditionalColumns(event: CustomEvent) {
    const selected = event.detail.value; // Get the selected columns from the event
    // Check if 'All Columns' is selected
    if (selected.includes('all')) {
      this.selectedColumns = this.availableColumns.slice(); // Select all available columns
    } else {
      // Exclude 'All Columns' from selection and update selected columns
      const index = selected.indexOf('all');
      if (index !== -1) {
        selected.splice(index, 1);
      }
      this.selectedColumns = selected;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedColumns' in changes) {
      this.updateManualHeaders();
    }
  }

  updateManualHeaders() {
    this.manualHeaders = ['Sr. No.', ...this.selectedColumns.map(col => this.columnHeaders[col]), 'Action'];
  }

  // filterCustomers(): Observable<any[]> {
  //   return this.customers$.pipe(
  //     map(customers =>
  //       customers.filter(customer =>
  //         Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
  //       )
  //     )
  //   );
  // }

  onSearchTermChanged(): void {
    // this.filteredCustomers$ = this.filterCustomers();
  }

  ngOnInit() {
    this.filteredCustomers$ = this.customers$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // switchMap(() => this.filterCustomers())
    );
  }

  editcustomer(customer: any) {
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

  generatePdf() {
    const table = document.getElementById('customerTable');

    if (!table) {
        console.error('Element with id "customerTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Customer List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#customerTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('company.pdf');
}


  printThisPage(){
    window.print();
  }
}
