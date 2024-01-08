import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';

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

  generatePdf() {
    let pdf = new jsPDF()

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        //save this pdf document
        pdf.save("sample Pdf")
      }
    })
  }
  printThisPage() {
    window.print();
  }
  // generateExcelReport() {
  //   const data: any[] = [
  //     // Your data rows here
  //   ];
  //   const fileName = 'Excel Report';

  //   this.excelService.generateExcel(data, fileName);
  // }
  vendors$: Observable<any[]>
  searchTerm: string = '';

  filteredSupplers$: Observable<any[]> = new Observable<any[]>();
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

  constructor(private router: Router, private toastCtrl: ToastController, private encService: EncryptionService, private venderService: VendorService) {
    const compid = '1';

    this.vendors$ = this.venderService.fetchallVendor(encService.encrypt(compid), '', '');
    console.log(this.vendors$);
    this.vendors$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });
  }

  filterCustomers(): Observable<any[]> {
    return this.vendors$.pipe(
      map(vendors =>
        vendors.filter(vendor =>
          Object.values(vendor).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredSupplers$ = this.filterCustomers();
  }

  ngOnInit() {
    this.filteredSupplers$ = this.vendors$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
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
}
