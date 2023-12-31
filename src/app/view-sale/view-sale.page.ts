import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SalesService } from '../services/sales.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.page.html',
  styleUrls: ['./view-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ViewSalePage implements OnInit {
  @ViewChild('content',{static:false})el!:ElementRef

  fromDate: string = '';
  toDate: string = '';
  sales$: Observable<any[]>
  generatePdf(){
    let pdf = new jsPDF()
  
    pdf.html(this.el.nativeElement,{
      callback : (pdf)=>{
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
  total: number = 0;
  searchTerm: string = '';
  filteredSales$: Observable<any[]> = new Observable<any[]>();

  constructor(private encService: EncryptionService, private saleService: SalesService, private router: Router, private toastCtrl: ToastController) {
    const compid = '1';

    this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');
    console.log(this.sales$);

    this.sales$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;
    });

    // Initialize the filteredSales with the original sales data
    this.filteredSales$ = this.sales$;

  }

  filterCustomers(): Observable<any[]> {
    return this.sales$.pipe(
      map(sales =>
        sales.filter(sale =>
          Object.values(sale).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredSales$ = this.filterCustomers();
  }

  ngOnInit() {
    this.filteredSales$ = this.sales$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredSales$ = this.sales$.pipe(
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

  goBack() {
    this.router.navigate(["/add-sale"])
  }
}
