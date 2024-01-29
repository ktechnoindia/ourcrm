import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecepitService } from '../services/recepit.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receipttransaction-report',
  templateUrl: './receipttransaction-report.page.html',
  styleUrls: ['./receipttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReceipttransactionReportPage implements OnInit {
  recepits$:  Observable<any[]>;
  searchTerm: string = '';
  filteredRecepits$: Observable<any[]> = new Observable<any[]>(); 
  el: any;
  isDateInRange: any;
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
  formDate: string = '';
  toDate: string = '';
  constructor(private router:Router,private encService:EncryptionService,private recepitService:RecepitService) { 

    const compid='1';

    this.recepits$ = this.recepitService.fetchAllReceppit(encService.encrypt(compid),'','');
    console.log(this.recepits$);
    this.formDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
  }
  filterRecepit(): Observable<any[]> {
    return this.recepits$.pipe(
      map(recepits =>
        recepits.filter(recepit =>
          Object.values(recepit).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }
  filterData() {
    // Update the filteredSales observable based on the date range
    this.filteredRecepits$ = this.recepits$.pipe(
      map(quotes => quotes.filter(quote => this.isDateInRange(quote.billDate, this.formDate, this.toDate)))
    );
  }
  onSearchTermChanged(): void {
    this.filteredRecepits$ = this.filterRecepit();
  }
 
  ngOnInit() {
    this.filteredRecepits$ = this.recepits$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterRecepit())
    );
  }

  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
}
