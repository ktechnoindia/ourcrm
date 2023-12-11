import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-viewsupplier',
  templateUrl: './viewsupplier.page.html',
  styleUrls: ['./viewsupplier.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    // Ng2SearchPipeModule
  ]
})
export class ViewsupplierPage implements OnInit {
  
  formDate:string='';
  toDate:string='';
  vendors$: Observable<any[]>
  searchTerm: string = '';

  filteredSupplers$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private router:Router,private toastCtrl:ToastController,private encService:EncryptionService,private venderService:VendorService) { 
    const compid='1';

    this.vendors$ = this.venderService.fetchallVendor(encService.encrypt(compid),'','');
    console.log(this.vendors$);
  }

  filterCustomers(): Observable<any[]> {
    return this.vendors$.pipe(
      map(vendors =>
        vendors.filter(vendor =>
          Object.values(vendor).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredSupplers$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredSupplers$ = this.vendors$ .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }
goBack(){
  this.router.navigate(["/add-vendor"])
}
}
