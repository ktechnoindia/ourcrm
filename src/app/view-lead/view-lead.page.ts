import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExecutiveService } from '../services/executive.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
interface Lead{
  catPerson:string,
  companyname:string,
  leaddate:string,
  phone:string,
  emails:string,
  pncode:string,
  fulladdress:string,
  lscore:number,
  selectpd:number,
  executivename:number,
  selectedCountry:number,
  selectedState: number,
  selectedDistrict: number,
  rmark:string,
  c:number,
  u:number,
  r:number,
  leadtype:number,
  leadassign?:number,
}
@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.page.html',
  styleUrls: ['./view-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,RouterLink,ReactiveFormsModule]
})
export class ViewLeadPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  viewLeadForm: FormGroup;
  executive$: any;
  executive: string='';
  select_sales_person:number=0;
  formdate: string = '';
  toDate: string = '';
  lead$:Observable<any[]>;
  searchTerm: string = '';
  filteredLeads$: Observable<any[]> = new Observable<any[]>(); 
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
  totalItems: number = 0;

  constructor(private encService: EncryptionService,private navCtrl:NavController,private leadser:LeadService, private execut: ExecutiveService,private router: Router, private toastCtrl: ToastController,private formBuilder:FormBuilder,private route: ActivatedRoute) {
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads (encService.encrypt(compid), '', '');
    this.executive$ = this.execut.getexecutive();
    this.lead$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
        });
    this.viewLeadForm = this.formBuilder.group({
      select_sales_person:[''],
      formdate:[''],
      toDate:[''],
      searchTerm:[''],
    totalItems:[''],
    selectedColumns:[],
    })
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

  filterCustomers(): Observable<any[]> {
    return this.lead$.pipe(
      map(leads =>
        leads.filter(lead =>
          Object.values(lead).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredLeads$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredLeads$ = this.lead$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const selectedLead = JSON.parse(params['data']) as Lead;
        // Now you have access to the selectedLead data
        console.log(selectedLead);
      }
    });
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.lead$ = this.lead$.pipe(
      map(sales => sales.filter(sale => this.isDateInRange(sale.billDate, this.formdate, this.toDate)))
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
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }

}
