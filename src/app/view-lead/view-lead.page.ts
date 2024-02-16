import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExecutiveService } from '../services/executive.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Lead {
  catPerson: string,
  companyname: string,
  leaddate: string,
  phone: string,
  emails: string,
  pncode: string,
  fulladdress: string,
  lscore: number,
  selectpd: number,
  executivename: number,
  selectedCountry: number,
  selectedState: number,
  selectedDistrict: number,
  rmark: string,
  c: number,
  u: number,
  r: number,
  leadtype: number,
  leadassign?: number,
}
@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.page.html',
  styleUrls: ['./view-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, RouterLink, ReactiveFormsModule]
})
export class ViewLeadPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  viewLeadForm: FormGroup;
  executive$: any;
  executive: string = '';
  select_sales_person: number = 0;
  fromDate: string = '';
  toDate: string = '';
  lead$: Observable<any[]>;
  searchTerm: string = '';
  filteredLeads$: Observable<any[]> = new Observable<any[]>();

  // filteredSales: Observable<any[]>;
  availableColumns: string[] = [
    'companyname',
    'crdate',
    'catPerson',
    'phone',
    'selectedCountry',
    'selectedState',
    'selectedDistrict',
    'fulladdress',
    'pncode',
    'emails',
    'selectpd',
    'leadstatus',
    'lscore',
    'leadassign',
    'executivename',
    'rmark',
  ];
  selectedColumns: string[] = [
    'companyname',
    'crdate',
    'catPerson',
    'phone',
    'selectedState',
    'fulladdress',
    'emails',
    'selectpd',
    'executivename',
  ];
  columnHeaders: { [key: string]: string } = {
    'companyname': 'Company Name',
    'crdate': 'Creation Date',
    'catPerson': 'Contact Person',
    'phone': 'Phone',
    'selectedCountry': 'Selected Country',
    'selectedState': 'Selected State',
    'selectedDistrict': 'Selected District',
    'fulladdress': 'Full Address',
    'pncode': 'Pincode',
    'emails': 'Email',
    'selectpd': 'Selected Product',
    'leadstatus': 'Lead Status',
    'lscore': 'Lead Score',
    'leadassign': 'Lead Assign',
    'executivename': 'Executive Name',
    'rmark': 'Remarks',
  };

  manualHeaders: string[] = [];
  totalItems: number = 0;

  constructor(private encService: EncryptionService, private navCtrl: NavController, private leadser: LeadService, private execut: ExecutiveService, private router: Router, private toastCtrl: ToastController, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads(encService.encrypt(compid), '', '');
    this.executive$ = this.execut.getexecutive();
    this.lead$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });
    this.viewLeadForm = this.formBuilder.group({
      select_sales_person: [''],
      fromDate: [''],
      toDate: [''],
      searchTerm: [''],
      totalItems: [''],
      selectedColumns: [],
    })
    this.filteredLeads$ = this.lead$;
    this.updateManualHeaders();
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
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

  deleteRow(index: number): void {
    this.lead$.subscribe(data => {

      this.lead$ = new Observable(observer => {
        observer.next(data.filter((_, i) => i !== index));
        observer.complete();
      });
    });
  }

  editRow(index: number): void {

    this.lead$.pipe(take(1)).subscribe((leads: Lead[]) => {

      const selectedLead = leads[index];
      this.router.navigate(['/leadedit', { data: JSON.stringify(selectedLead) }]);
    });
  }

  filterLead(): Observable<any[]> {
    return this.lead$.pipe(
      map(leads =>
        leads.filter(lead =>
          Object.values(lead).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.lead$ = this.filterLead();
  }

  ngOnInit() {
    // this.filteredLeads$ = this.lead$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(() => this.filterCustomers())
    // );
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const selectedLead = JSON.parse(params['data']) as Lead;
        // Now you have access to the selectedLead data
        console.log(selectedLead);
      }
    });
  }
  filterData() {
    this.filteredLeads$ = this.lead$.pipe(
      map(leadscore => leadscore.filter(leadscore => this.isDateInRange(leadscore.crdate, this.fromDate, this.toDate)))
    );
    // const filters = this.viewLeadForm.value;

    // // Check if the selectedColumns array is empty, if so, use all available columns
    // const columnsToDisplay = filters.selectedColumns.length > 0 ? filters.selectedColumns : this.availableColumns;

    // // Update the filteredLeads$ observable based on the selected criteria
    // this.filteredLeads$ = this.lead$.pipe(
    //   map(leads => {
    //     return leads.filter(lead => {
    //       return (
    //         (filters.select_sales_person === 0 || lead.executivename === filters.select_sales_person) &&
    //         this.isDateInRange(lead.leaddate, filters.fromDate, filters.toDate) &&
    //         filters.selectedColumns.every((col: string | number) => lead[col] !== undefined) // Check if all selected columns exist in lead
    //       );
    //     });
    //   })
    // );
  }
  private isDateInRange(date: string, fromDate: string, toDate: string): boolean {
    const leadDate = new Date(date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return leadDate >= fromDateObj && leadDate <= toDateObj;
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }
  generatePdf() {
    const table = document.getElementById('leadTable');

    if (!table) {
      console.error('Element with id "leadTable" not found.');
      return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
      pdf.setFontSize(18);
      pdf.setTextColor(40);
      pdf.setFont('curier', 'bold');
      pdf.text('Lead List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
      const pageCount = pdf.internal.pages.length;
      pdf.setFontSize(14);
      pdf.setTextColor(40);
      pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
      html: '#leadTable',
      styles: {
        lineWidth: 0.1, // set border line width
        lineColor: [0, 0, 0], // set border color (black in this case)
      },
      didDrawPage: function (data: any) {
        header(data);
        footer(data);
      }
    });

    pdf.save('leads.pdf');
  }


  printThisPage() {
    window.print();
  }
}
