import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { LegderService } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-viewledger',
  templateUrl: './viewledger.page.html',
  styleUrls: ['./viewledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewledgerPage implements OnInit {
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
  generateExcelReport() {
    const data: any[] = [
      // Your data rows here
    ];
    const fileName = 'Excel Report';

    this.excelService.generateExcel(data, fileName);
  }
  searchTerm: string = '';
  filteredLedgers$: Observable<any[]> = new Observable<any[]>(); 
  ledgers$: Observable<any[]>
  
  constructor(private excelService: ExcelService,private router:Router,private ledgerService:LegderService , private encService:EncryptionService) { 
    const compid='1';

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid,'','');
    console.log(this.ledgers$);
  }

  filterCustomers(): Observable<any[]> {
    return this.ledgers$.pipe(
      map(ledgers =>
        ledgers.filter(ledger =>
          Object.values(ledger).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredLedgers$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredLedgers$ = this.ledgers$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack() {
    this.router.navigate(['/ledger']); // Navigate back to the previous page
  }

}
