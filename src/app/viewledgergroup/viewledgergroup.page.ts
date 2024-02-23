import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { LedgergroupService } from '../services/ledgergroup.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import jsPDF from 'jspdf';
// import { ExcelService } from '../services/excel.service';
import 'jspdf-autotable';
@Component({
  selector: 'app-viewledgergroup',
  templateUrl: './viewledgergroup.page.html',
  styleUrls: ['./viewledgergroup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewledgergroupPage implements OnInit {
  ledgergroup$: Observable<any[]>;
  searchTerm: string = '';
  totalItems: number = 0;

  constructor(private ledgrpservice:LedgergroupService,private router: Router, private toastCtrl: ToastController, private encService: EncryptionService) {
    const compid =1;
    this.ledgergroup$ = this.ledgrpservice.getledgerGroups(1);
    this.ledgergroup$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
      this.totalItems = data.length;

    });
   }
   filteritem(): Observable<any[]> {
    return this.ledgergroup$.pipe(
      map(ledgergrp =>
        ledgergrp.filter(ledgergrp =>
          Object.values(ledgergrp).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }
  onSearchTermChanged(): void {
    this.ledgergroup$ = this.filteritem();
  }
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/add-item"])
  }
  generatePdf() {
    const table = document.getElementById('ledgergroupTable');

    if (!table) {
        console.error('Element with id "ledgergroupTable" not found.');
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
        html: '#ledgergroupTable',
        styles: {
            lineWidth: 0.1, // set border line width
            lineColor: [0, 0, 0], // set border color (black in this case)
        },
        didDrawPage: function (data: any) {
            header(data);
            footer(data);
        }
    });

    pdf.save('ledgergroup.pdf');
}


  printThisPage(){
    window.print();
  }
}
