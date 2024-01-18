import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { QuotationService } from '../services/quotation.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-view-quot',
  templateUrl: './view-quot.page.html',
  styleUrls: ['./view-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ViewQuotPage implements OnInit {

  formDate: string = '';
  toDate: string = '';
  quote$: Observable<any[]>
  searchTerm: string = '';
  filteredQuatation$: Observable<any[]> = new Observable<any[]>(); 

  availableColumns: string[] = [
    'billformate',
    'quoteNumber',
    'quateDate',
    'custcode',
    'custname',
    'refrence',
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
    'quoteNumber',
    'quateDate',
    'custcode',
    'custname',
    'itemcode',
    'itemname',
    'basicrate',
    'discountamt',
    'totaltax',
    'total',
    
  ];
  columnHeaders: { [key: string]: string } = {
    'billformate': 'Bill Format',
    'quoteNumber': 'Quote Number',
    'quateDate': 'Quote Date',
    'custcode': 'Customer Code',
    'custname': 'Customer Name',
    'refrence': 'Reference',
    'refdate': 'Reference Date',
    'deliverydate': 'Delivery Date',
    'deliveryplace': 'Delivery Place',
    'barcode': 'Barcode',
    'itemcode': 'Item Code',
    'itemname': 'Item Name',
    'description': 'Description',
    'quantity': 'Quantity',
    'unitname': 'Unit Name',
    'mrp': 'MRP',
    'basicrate': 'Basic Rate',
    'netrate': 'Net Rate',
    'grossrate': 'Gross Rate',
    'taxrate': 'Tax Rate',
    'IGST': 'IGST',
    'CGST': 'CGST',
    'SGST': 'SGST',
    'discount': 'Discount',
    'discountamt': 'Discount Amount',
    'totaltax': 'Total Tax',
    'pretax': 'Pre-tax',
    'posttax': 'Post-tax',
    'total': 'Total',
  };
  
  manualHeaders: string[] = [];

  totalItems: number = 0;
  constructor(private encService: EncryptionService, private quoteservice: QuotationService, private router: Router, private toastCtrl: ToastController) {
    const compid = '1';
    const userid = '1';
    this.quote$ = this.quoteservice.fetchallQuote(encService.encrypt(compid),(userid), '', '');
    console.log(this.quote$);

    this.quote$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
    this.quote$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;

    });
    this.updateManualHeaders();
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
    return this.quote$.pipe(
      map(quotes =>
        quotes.filter(quote =>
          Object.values(quote).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredQuatation$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredQuatation$ = this.quote$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }


  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredQuatation$ = this.quote$.pipe(
      map(quotes => quotes.filter(quote => this.isDateInRange(quote.billDate, this.formDate, this.toDate)))
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
    this.router.navigate(["/add-quote"])
  }


  deleteRow(index: number): void {
    this.quote$.subscribe(data => {
      // Assuming quote$ is an array inside the Observable, remove the item at the specified index
      this.quote$ = new Observable(observer => {
        observer.next(data.filter((_, i) => i !== index));
        observer.complete();
      });
    });
  }
}
