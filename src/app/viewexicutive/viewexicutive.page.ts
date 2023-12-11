import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ExecutiveService } from '../services/executive.service';
import { EncryptionService } from '../services/encryption.service';
import { RouterModule,RouterLink } from '@angular/router';

@Component({
  selector: 'app-viewexicutive',
  templateUrl: './viewexicutive.page.html',
  styleUrls: ['./viewexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,RouterLink]
})
export class ViewexicutivePage implements OnInit {
  formDate:string='';
  toDate:string='';
  executives$: Observable<any[]>
  searchTerm: string = '';
  filteredExecutives$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private executService:ExecutiveService) { 
    const compid='1';

    this.executives$ = this.executService.fetchAllExecutive(compid,'','');
    console.log(this.executives$);
  }

  filterCustomers(): Observable<any[]> {
    return this.executives$.pipe(
      map(executives =>
        executives.filter(executive =>
          Object.values(executive).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredExecutives$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredExecutives$ = this.executives$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  ///edit customer start  


goBack(){
  this.router.navigate(["/add-executive"])
}
}
