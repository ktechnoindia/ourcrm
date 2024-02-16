import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { AddserviceService } from '../services/addservice.service';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-viewservice',
  templateUrl: './viewservice.page.html',
  styleUrls: ['./viewservice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewservicePage implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef

  formDate:string='';
  toDate:string='';
  services$: Observable<any[]> 
  searchTerm: string = '';
  filteredServices$: Observable<any[]> = new Observable<any[]>(); 
  totalservice: number=0;
  selectedColumns: string[] = [];

  constructor(private addService : AddserviceService ,private router:Router,private toastCtrl:ToastController,private encService:EncryptionService) { 
    const compid='1';
    this.services$ = this.addService.fetchallservice(compid,'','');
    this.services$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalservice = data.length;
    });
    // console.log(this.services$);
  }

  async onSubmit(){
    if(this.formDate===''){
      const toast = await this.toastCtrl.create({
        message:"Form Date is required",
        duration:3000,
        color:'danger',
      });
      toast.present();
    }else if(this.toDate===''){
      const toast = await this.toastCtrl.create({
        message:"To Date is required",
        duration:3000,
        color:'danger',
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message:"Successfully !",
        duration:3000,
        color:'success',
      });
      toast.present();
    }
  }

  filterItem(): Observable<any[]> {
    return this.services$.pipe(
      map(serviecs =>
        serviecs.filter(service =>
          Object.values(service).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.services$ = this.filterItem();
  }
 
  ngOnInit() {
    // this.filteredServices$ = this.services$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(() => this.filterCustomers())
    // );
  }


goBack(){
  this.router.navigate(["/add-service"])
}

generatePdf() {
  const table = document.getElementById('serviceTable');

  if (!table) {
      console.error('Element with id "serviceTable" not found.');
      return;
  }

  const pdf = new jsPDF();

  const header = function (data: any) {
      pdf.setFontSize(18);
      pdf.setTextColor(40);
      pdf.setFont('curier', 'bold');
      pdf.text('Services List', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
  };

  const footer = function (data: any) {
      const pageCount = pdf.internal.pages.length;
      pdf.setFontSize(14);
      pdf.setTextColor(40);
      pdf.text('Page ' + data.pageNumber + ' of ' + pageCount, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
  };

  (pdf as any).autoTable({
      html: '#serviceTable',
      styles: {
          lineWidth: 0.1, // set border line width
          lineColor: [0, 0, 0], // set border color (black in this case)
      },
      didDrawPage: function (data: any) {
          header(data);
          footer(data);
      }
  });

  pdf.save('service.pdf');
}


printThisPage(){
  window.print();
}
}

