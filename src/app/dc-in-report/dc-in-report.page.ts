import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { DcinService } from '../services/dcin.service';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';


@Component({
  selector: 'app-dc-in-report',
  templateUrl: './dc-in-report.page.html',
  styleUrls: ['./dc-in-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class DcInReportPage implements OnInit {

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
  dcin$: Observable<any[]>;
  searchTerm: string = '';
  filteredDcin$: Observable<any[]> = new Observable<any[]>();

  constructor(private encService: EncryptionService, private dcinservice: DcinService, private router: Router, private toastCtrl: ToastController) {
    const compid = '1';

    this.dcin$ = this.dcinservice.fetchallDcin(encService.encrypt(compid), '', '');
    console.log(this.dcin$);

    this.dcin$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
  }

  filterData() {
    if (this.formDate && this.toDate) {
      // Assuming your date format is 'yyyy-MM-dd'
      const fromDate = new Date(this.formDate);
      const toDate = new Date(this.toDate);

      // Filter the data based on date range
      this.dcin$ = this.dcin$.pipe(
        map(data => data.filter(dcin => {
          const voucherDate = new Date(dcin.datetype); // Assuming datetype is the date property
          return voucherDate >= fromDate && voucherDate <= toDate;
        }))
      );
    } else {
      // If no date range is provided, show all data
      this.dcin$ = this.dcin$;
    }
  }

  filterCustomers(): Observable<any[]> {
    return this.dcin$.pipe(
      map(customers =>
        customers.filter(customer =>
          Object.values(customer).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredDcin$ = this.filterCustomers();
  }

  ngOnInit() {
    this.filteredDcin$ = this.dcin$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack() {
    this.router.navigate(["/dc-in"])
  }

}
