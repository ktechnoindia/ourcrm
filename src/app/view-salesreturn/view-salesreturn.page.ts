import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SalereturnService } from '../services/salereturn.service';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-view-salesreturn',
  templateUrl: './view-salesreturn.page.html',
  styleUrls: ['./view-salesreturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewSalesreturnPage implements OnInit {
  formDate:string='';
  toDate:string='';
  salreturn$: Observable<any[]>;
  searchTerm: string = '';
  filteredSalereturns$: Observable<any[]> = new Observable<any[]>(); 
  constructor(private router:Router,private toastCtrl:ToastController,private salereturnservice:SalereturnService,private encService:EncryptionService
    ) { 
    const compid='1';

    this.salreturn$ = this.salereturnservice.fetchallSalesreturn(encService.encrypt(compid),'','');
    console.log(this.salreturn$);
  }

  filterCustomers(): Observable<any[]> {
    return this.salreturn$.pipe(
      map(salereturns =>
        salereturns.filter(salereturn =>
          Object.values(salereturn).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredSalereturns$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredSalereturns$ = this.salreturn$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  } 

goBack(){
  this.router.navigate(["/salesreturn"])
}
}
