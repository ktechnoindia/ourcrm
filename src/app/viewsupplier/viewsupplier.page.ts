import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-viewsupplier',
  templateUrl: './viewsupplier.page.html',
  styleUrls: ['./viewsupplier.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    // Ng2SearchPipeModule
  ]
})
export class ViewsupplierPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate: string = '';
  toDate: string = '';

  
  vendors$: Observable<any[]>
  searchTerm: string = '';

  filteredSupplers$: Observable<any[]> = new Observable<any[]>();
  columnHeaders: { [key: string]: string } = {
    'vendor_code': 'Vendor Code',
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
  
  availableColumns: string[] = [
    'vendor_code',
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
    'vendor_code',
    'name',
    'gstin',
    'whatsapp_number',
    'email',
    'countryid',
  ];
  totalItems: number = 0;
  manualHeaders: string[] = [];

  constructor(private router: Router, private toastCtrl: ToastController, private encService: EncryptionService, private venderService: VendorService) {
    const compid = '1';

    this.vendors$ = this.venderService.fetchallVendor(encService.encrypt(compid), '', '');
    // console.log(this.vendors$);
    this.vendors$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });
    this.updateManualHeaders();
  }

  editvendor(vendor:any){
    console.log(vendor);
    let navigationExtras: NavigationExtras = {
      state: {
        vendor: vendor,
        edit:true
      }
    };
    this.router.navigate(['/add-vendor'], navigationExtras);

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
  filterVendor(): Observable<any[]> {
    return this.vendors$.pipe(
      map(vendors =>
        vendors.filter(vendor =>
          Object.values(vendor).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.vendors$ = this.filterVendor();
  }

  ngOnInit() {
    this.filteredSupplers$ = this.vendors$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterVendor())
    );
  }
  goBack() {
    this.router.navigate(["/add-vendor"])
  }

  deleteSuppler(id:number,event:any){

    const confirmDelete = confirm('Are you sure you want to delete this Vendor?');
    if (!confirmDelete) {
      return;
    }
    const companyid=1;
    this.venderService.deleteVendor(id,companyid).subscribe({
       next: (res)=>{
       
          console.log(res);
          alert('Vendor Deleted Successfully')
        },
        error: (error)=>{
          console.log('Error',error)
        }
    })
  }
  generatePdf() {
    const table = document.getElementById('supplierTable');

    if (!table) {
        console.error('Element with id "supplierTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Supplers List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#supplierTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('supplier.pdf');
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
}
