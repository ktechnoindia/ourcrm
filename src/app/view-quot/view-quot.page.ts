import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { QuotationService } from '../services/quotation.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-view-quot',
  templateUrl: './view-quot.page.html',
  styleUrls: ['./view-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ViewQuotPage implements OnInit {

  formDate: string = '';
  toDate: string = '';
  quote$: Observable<any[]>
  searchTerm: string = '';
  filteredQuatation$: Observable<any[]> = new Observable<any[]>(); 


  constructor(private encService: EncryptionService, private quoteservice: QuotationService, private router: Router, private toastCtrl: ToastController) {
    const compid = '1';
    const userid = '1';
    this.quote$ = this.quoteservice.fetchallQuote(encService.encrypt(compid),(userid), '', '');
    console.log(this.quote$);

    this.quote$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
  }

  filterCustomers(): Observable<any[]> {
    return this.quote$.pipe(
      map(quotes =>
        quotes.filter(quote =>
          Object.values(quote).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredQuatation$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredQuatation$ = this.quote$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }


  async onSubmit() {
    const fromDateObj = new Date(this.formDate);
    const toDateObj = new Date(this.toDate);
  
    // Filter quotes based on date range
    this.quote$ = this.quote$.pipe(
      map(quotes => quotes.filter(quote => {
        const quoteDate = new Date(quote.quateDate);
        return quoteDate >= fromDateObj && quoteDate <= toDateObj;
      }))
    );
  }


  goBack() {
    this.router.navigate(["/add-quote"])
  }


  deleteRow(index: number): void {
    this.quote$.subscribe(data => {
      // Assuming quote$ is an array inside the Observable, remove the item at the specified index
      this.quote$ = new Observable(observer => {
        observer.next(data.filter((_, i) => i !== index));
        observer.complete();
      });
    });
  }
}
