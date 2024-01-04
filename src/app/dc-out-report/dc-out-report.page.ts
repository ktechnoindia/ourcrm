import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { DcoutService } from '../services/dcout.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';



@Component({
  selector: 'app-dc-out-report',
  templateUrl: './dc-out-report.page.html',
  styleUrls: ['./dc-out-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class DcOutReportPage implements OnInit {
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
  dcout$: Observable<any[]>;
  searchTerm: string = '';
  filteredDcout$: Observable<any[]> = new Observable<any[]>(); 
  availableColumns: string[] = [
    'voucherformat',
    'voucherNumber',
    'datetype',
    'vendcode',
    'suppliertype',
    'referenceNumber',
    'refdate',
    'deliverydate',
    'deliveryplace',
    'barcode',
    'itemcode',
    'itemname',
    'description',
    'quantity',
    'unitname',
    'mrp',
    'basicrate',
    'netrate',
    'grossrate',
    'taxrate',
    'IGST',
    'CGST',
    'SGST',
    'discount',
    'discountamt',
    'totaltax',
    'pretax',
    'posttax',
    'total',
  ];
  selectedColumns: string[] = [
    'voucherNumber',
    'datetype',
    'vendcode',
    'suppliertype',
    'itemcode',
    'itemname',
    'basicrate',
    'discountamt',
    'totaltax',
    'total',
    
  ];
  totalItems: number = 0;
  constructor(private router:Router,private toastCtrl:ToastController,private dcoutservice:DcoutService,private encService:EncryptionService,) { 
    const compid='1';

    this.dcout$ = this.dcoutservice.fetchallDcout(encService.encrypt(compid),'','');
    console.log(this.dcout$);
    this.dcout$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;

    });
  }

  async onSubmit(){
    const fromDateObj = new Date(this.formDate);
  const toDateObj = new Date(this.toDate);

  // Filter DC-OUT data based on date range
  this.dcout$ = this.dcout$.pipe(
    map(dcouts => dcouts.filter(dcout => {
      const voucherDate = new Date(dcout.datetype);
      return voucherDate >= fromDateObj && voucherDate <= toDateObj;
    }))
  );
  }

  filterCustomers(): Observable<any[]> {
    return this.dcout$.pipe(
      map(dcouts =>
        dcouts.filter(dcout =>
          Object.values(dcout).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredDcout$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredDcout$ = this.dcout$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack(){
    this.router.navigate(["/dc-out"])
  }

}
