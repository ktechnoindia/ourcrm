import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { AdditemService } from '../services/additem.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
import 'jspdf-autotable';

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
 

  items$: Observable<any[]>;
  itemTypes$: Observable<any[]>;
  items: any[] = [];

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
    this.itemTypes$ = this.additem.fetchitemtype(encService.encrypt(compid), '', ''); // Add a method in your service to fetch item types
    this.items$ = this.additem.fetchallItem(encService.encrypt(compid), '', '');
    combineLatest([this.items$, this.itemTypes$]).subscribe(([items, itemTypes]) => {
      // Create a mapping of itemtypeid to itemtypename
      const itemTypeMapping = itemTypes.reduce((acc, itemType) => {
        acc[itemType.itemtypeid] = itemType.itemtypename;
        return acc;
      }, {});

      // Add itemtypename to the items data
      this.items = items.map(item => ({
        ...item,
        itemtypename: itemTypeMapping[item.itemtype] || ''
      }));
    })
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
  generatePdf() {
    const table = document.getElementById('itemTable');

    if (!table) {
        console.error('Element with id "itemTable" not found.');
        return;
    }

    const pdf = new jsPDF();

    const header = function (data: any) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFont('curier', 'bold');
        pdf.text('Items List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const footer = function (data: any) {
        const pageCount = pdf.internal.pages.length;
        pdf.setFontSize(14);
        pdf.setTextColor(40);
        pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };

    (pdf as any).autoTable({
        html: '#itemTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('items.pdf');
}


  printThisPage(){
    window.print();
  }
}
