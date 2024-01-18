import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { AdditemService } from '../services/additem.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.page.html',
  styleUrls: ['./viewitem.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewitemPage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef
  formDate: string = '';
  toDate: string = '';
  compid:string='';
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


  items$: Observable<any[]>;
  searchTerm: string = '';
  filteredItems$: Observable<any[]> = new Observable<any[]>();
  columnHeaders: { [key: string]: string } = {
    'itemCode': 'Item Code',
    'itemDesc': 'Item Description',
    'hsnname': 'HSN Name',
    'stocktypename': 'Stock Type',
  'itemtypename': 'Item Type',
  'unitname': 'Unit Name',
  'selectItemGroup': 'Item Group',
  'selectGst': 'Select GST',
  'mrp': 'MRP',
  'basicrate': 'Basic Rate',
  'openingbalance': 'Opening Balance',
  'closingbalance': 'Closing Balance',
  'attr1': 'Attribute 1',
  'attr2': 'Attribute 2',
  'attr3': 'Attribute 3',
  'attr4': 'Attribute 4',
  'attr5': 'Attribute 5',
  'attr6': 'Attribute 6',
  'attr7': 'Attribute 7',
  'attr8': 'Attribute 8',
  'files': 'Files',
  'barcode': 'Barcode',
  'minimum': 'Minimum',
  'maximum': 'Maximum',
  'reorder': 'Reorder',
    // Add more columns as needed
  };
  availableColumns: string[] = [
    'itemCode',
    'itemDesc',
    'hsnname',
    'stocktypename',
    'itemtypename',
    'unitname',
    'selectItemGroup',
    'selectGst',
    'mrp',
    'basicrate',
    'openingbalance',
   'closingbalance',
    'attr1',
    'attr2',
   'attr3',
    'attr4',
   'attr5',
    'attr6',
    'attr7',
    'attr8',
    'files',
    'barcode',
     'minimum',
     'maximum',
     'reorder',
  ];
  selectedColumns: string[] = [
    'itemCode',
    'itemDesc',
    'hsnname',
    'selectGst',
    'mrp',
  ];
  manualHeaders: string[] = [];
  totalItems: number = 0;

  constructor(private additem: AdditemService, private router: Router, private toastCtrl: ToastController, private encService: EncryptionService) {
    const compid = '1';
    this.items$ = this.additem.fetchallItem(encService.encrypt(compid), '', '');
    console.log(this.items$);


    this.items$.subscribe(data => {
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
    return this.items$.pipe(
      map(items =>
        items.filter(item =>
          Object.values(item).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  deleteItem(customerid: number, event: any) {
    
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) {
      return;
    }
  
    const companyid = 1;
    this.additem.deleteItems(customerid,companyid).subscribe({
      next: (res) => {
        alert('Item Deleted!');
        console.log('delete',res)

     },
      error: (err) => {
        console.error('Error deleting item', err);
        // Handle the error as needed
      }
    });
  }

  onSearchTermChanged(): void {
    this.filteredItems$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredItems$ = this.items$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack() {
    this.router.navigate(["/add-item"])
  }
}
