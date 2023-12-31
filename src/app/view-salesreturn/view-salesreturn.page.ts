import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SalereturnService } from '../services/salereturn.service';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-view-salesreturn',
  templateUrl: './view-salesreturn.page.html',
  styleUrls: ['./view-salesreturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewSalesreturnPage implements OnInit {
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
  salreturn$: Observable<any[]>;
  searchTerm: string = '';
  filteredSalereturns$: Observable<any[]> = new Observable<any[]>(); 
   // filteredSales: Observable<any[]>;
   availableColumns: string[] = [
    'billformate',
    'billNumber',
    'billDate',
    'custcode',
    'custname',
    'refrence',
    'refdate',
    'orderDate',
    'orderNumber',
    'gstin',
    'salePerson',
    'frombill',
    'payment',
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
    'billformate',
    'billDate',
    'billNumber',
    'custcode',
    'custname',
    'itemcode',
    'itemname',
    'quantity',
    'unitname',
    'taxrate',
    'totaltax',
    'total',
  ];
  totalItems: number = 0;
  constructor(private router:Router,private toastCtrl:ToastController,private salereturnservice:SalereturnService,private encService:EncryptionService
    ) { 
    const compid='1';

    this.salreturn$ = this.salereturnservice.fetchallSalesreturn(encService.encrypt(compid),'','');
    console.log(this.salreturn$);

    this.salreturn$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });
  }

  filterCustomers(): Observable<any[]> {
    return this.salreturn$.pipe(
      map(salereturns =>
        salereturns.filter(salereturn =>
          Object.values(salereturn).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredSalereturns$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredSalereturns$ = this.salreturn$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  } 

goBack(){
  this.router.navigate(["/salesreturn"])
}
}
