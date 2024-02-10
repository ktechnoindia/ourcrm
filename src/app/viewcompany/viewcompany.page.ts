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
import html2canvas from 'html2canvas';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import 'jspdf-autotable';

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
    const compid = this.session.getValue('userid')?.valueOf() as number;
    this.companys$ = this.companyService.fetchallcompany(compid, '', '');
    console.log(compid);
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
  generatePdf() {
    const table = document.getElementById('companyTable');

    if (!table) {
      console.error('Element with id "companyTable" not found.');
      return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
      pdf.setFontSize(18);
      pdf.setTextColor(40);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Company List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
      const pageCount = pdf.internal.pages.length;
      pdf.setFontSize(14);
      pdf.setTextColor(40);
      pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    const adjustFontSize = function () {
      const tableElement = document.getElementById('companyTable');
      if (!tableElement) return;

      let maxWidth = pdf.internal.pageSize.getWidth() - 20; // subtracting padding
      let maxCellWidth = 0;

      // Iterate through each cell in the table, excluding the last column
      tableElement.querySelectorAll('td:not(:last-child), th:not(:last-child)').forEach(cell => {
        const cellWidth = cell.getBoundingClientRect().width;
        maxCellWidth = Math.max(maxCellWidth, cellWidth);
      });

      // Adjust font size based on the widest cell
      const fontSize = Math.min(maxWidth / maxCellWidth * 10, 18); // adjust multiplier as needed

      pdf.setFontSize(fontSize);
    };

    (pdf as any).autoTable({
      html: '#companyTable',
      styles: {
        lineWidth: 0.1, // set border line width
        lineColor: [0, 0, 0], // set border color (black in this case)
        borederradious: 4,
      },
      didDrawPage: function (data: any) {
        header(data);
        footer(data);
      }
    });

    adjustFontSize(); // Call the function to adjust font size

    pdf.save('company.pdf');
  }



  printThisPage() {
    // Trigger the print functionality
    window.print();
}

}
