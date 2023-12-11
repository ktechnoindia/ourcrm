import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { LegderService } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-viewledger',
  templateUrl: './viewledger.page.html',
  styleUrls: ['./viewledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewledgerPage implements OnInit {

  searchTerm: string = '';
  filteredLedgers$: Observable<any[]> = new Observable<any[]>(); 
  ledgers$: Observable<any[]>
  
  constructor(private router:Router,private ledgerService:LegderService , private encService:EncryptionService) { 
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
