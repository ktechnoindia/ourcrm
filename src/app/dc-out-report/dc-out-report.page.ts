import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { DcoutService } from '../services/dcout.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';



@Component({
  selector: 'app-dc-out-report',
  templateUrl: './dc-out-report.page.html',
  styleUrls: ['./dc-out-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class DcOutReportPage implements OnInit {
  formDate:string='';
  toDate:string='';
  dcout$: Observable<any[]>;
  searchTerm: string = '';
  filteredDcout$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private router:Router,private toastCtrl:ToastController,private dcoutservice:DcoutService,private encService:EncryptionService,) { 
    const compid='1';

    this.dcout$ = this.dcoutservice.fetchallDcout(encService.encrypt(compid),'','');
    console.log(this.dcout$);
  }

  async onSubmit(){
    const fromDateObj = new Date(this.formDate);
  const toDateObj = new Date(this.toDate);

  // Filter DC-OUT data based on date range
  this.dcout$ = this.dcout$.pipe(
    map(dcouts => dcouts.filter(dcout => {
      const voucherDate = new Date(dcout.datetype);
      return voucherDate >= fromDateObj && voucherDate <= toDateObj;
    }))
  );
  }

  filterCustomers(): Observable<any[]> {
    return this.dcout$.pipe(
      map(dcouts =>
        dcouts.filter(dcout =>
          Object.values(dcout).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredDcout$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredDcout$ = this.dcout$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack(){
    this.router.navigate(["/dc-out"])
  }

}
