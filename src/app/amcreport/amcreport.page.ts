import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AmcService } from '../services/amc.service';
import { FormValidationService } from '../form-validation.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-amcreport',
  templateUrl: './amcreport.page.html',
  styleUrls: ['./amcreport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AmcreportPage implements OnInit {
  formDate:string='';
  toDate:string='';
  amc$: Observable<any[]>;

  searchTerm: string = '';
  filteredAmcs$: Observable<any[]> = new Observable<any[]>(); 

  constructor(private router: Router,private amcService:AmcService,private formService: FormValidationService,private encService: EncryptionService,) { 
    const compid='1'
    this.amc$ = this.amcService.fetchallAmc(encService.encrypt(compid),'','');
   console.log(this.amc$);
  }

  filterCustomers(): Observable<any[]> {
    return this.amc$.pipe(
      map(amcs =>
        amcs.filter(amc =>
          Object.values(amc).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredAmcs$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredAmcs$ = this.amc$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack() {
    this.router.navigate(['/amc-manager']); // Navigate back to the previous page
  }
}
