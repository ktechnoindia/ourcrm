import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, concatMap, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { CreatecompanyService } from '../services/createcompany.service';
import { NavigationExtras } from '@angular/router';
import { SessionService } from '../services/session.service';
import { formatDate } from '@angular/common';
// import { Subscription } from 'rxjs';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.page.html',
  styleUrls: ['./viewcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewcompanyPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  fromDate: string = '';
  toDate: string = '';
  companys$: Observable<any[]>

  filteredCompany$: Observable<any[]> = new Observable<any[]>();
  searchTerm: string = '';
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
  availableColumns: string[] = [
    'cpyname',
    'companyid',
    'gstin',
    'selectedCountry',
    'selectedState',
    'selectedDistrict',
    'pinCode',
    'address',
    'phone',
    'wpnumber',
    'email',
    'website',
    'selectedCountry1',
    'selectedState1',
    'selectedDistrict1',
    'pinCode1',
    'address1',
    'phone1',
    'wpnumber1',
    'email1',
    'website1',
    'logo',
    'rdate',
    'industry',
    'businesstype',
    'segmenttype',
    'companytype',
    'pannumber',
    'tanno',
    'sales',
    'purchase',
    'quotation',
    'challan',
    'lms',
    'amc',
    'alloftheabove',
    'language',
    'currency',
    'accno',
    'ifsc',
    'bname',
    'branchname',
    'upiid',

  ]

  selectedColumns: string[] = [
    'cpyname',
    'companyid',
    'address',
    'phone',
    'wpnumber',
    'email',
    'rdate',
    'industry',
    'businesstype',
    'segmenttype',
    'companytype',
    'pannumber',
    'tanno',
  ]
  columnHeaders: { [key: string]: string } = {
    'cpyname': 'Company Name',
    'companyid': 'Company ID',
    'gstin': 'GSTIN',
    'selectedCountry': 'Country',
    'selectedState': 'State',
    'selectedDistrict': 'District',
    'pinCode': 'PIN Code',
    'address': 'Address',
    'phone': 'Phone',
    'wpnumber': 'WhatsApp Number',
    'email': 'Email',
    'website': 'Website',
    'selectedCountry1': 'Country : 2',
    'selectedState1': 'State : 2',
    'selectedDistrict1': 'District : 2',
    'pinCode1': 'PIN Code : 1',
    'address1': 'Address : 1',
    'phone1': 'Phone : 1',
    'wpnumber1': 'WhatsApp Number : 1',
    'email1': 'Email : 1',
    'website1': 'Website : 1',
    'logo': 'Logo',
    'rdate': 'Registration Date',
    'industry': 'Industry',
    'businesstype': 'Business Type',
    'segmenttype': 'Segment Type',
    'companytype': 'Company Type',
    'pannumber': 'PAN Number',
    'tanno': 'TAN Number',
    'sales': 'Sales',
    'purchase': 'Purchase',
    'quotation': 'Quotation',
    'challan': 'Challan',
    'lms': 'LMS',
    'amc': 'AMC',
    'alloftheabove': 'All of the Above',
    'language': 'Language',
    'currency': 'Currency',
    'accno': 'Account Number',
    'ifsc': 'IFSC',
    'bname': 'Bank Name',
    'branchname': 'Branch Name',
    'upiid': 'UPI ID',
  };

  manualHeaders: string[] = [];
  totalItems: number = 0;

  constructor(private alertController: AlertController, public session: SessionService, private companyService: CreatecompanyService, private router: Router, private toastCtrl: ToastController, private encService: EncryptionService) {
    const compid = '1';
    this.companys$ = this.companyService.fetchallcompany(compid, '', '');
    console.log(this.companys$);
    this.updateManualHeaders();

    this.companys$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });

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
    return this.companys$.pipe(
      map(companies =>
        companies.filter(company =>
          Object.values(company).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredCompany$ = this.filterCustomers();
  }

  ngOnInit() {
    this.filteredCompany$ = this.companys$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredCompany$ = this.companys$.pipe(
      map(sales => sales.filter(sale => this.isDateInRange(sale.billDate, this.fromDate, this.toDate)))
    );
  }
  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    // Parse the dates into JavaScript Date objects
    const saleDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Check if the saleDate is within the range
    return saleDate >= fromDateObj && saleDate <= toDateObj;
  }
  ///edit company start
  editcompany(company: any) {
    console.log(company);
    let navigationExtras: NavigationExtras = {
      state: {
        company: company,
        edit: true
      }
    };
    this.router.navigate(['createcompany'], navigationExtras);

  }
  async openToast(msg: string) {
    this.session.openToast(msg);
  }



  goBack() {
    this.router.navigate(["/createcompany"])
  }
}
