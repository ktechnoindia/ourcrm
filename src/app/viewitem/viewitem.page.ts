import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { AdditemService } from '../services/additem.service';
@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.page.html',
  styleUrls: ['./viewitem.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewitemPage implements OnInit {
  formDate: string = '';
  toDate: string = '';
  items$: Observable<any[]>;

  searchTerm: string = '';
  filteredItems$: Observable<any[]> = new Observable<any[]>();

  constructor(private additem: AdditemService, private router: Router, private toastCtrl: ToastController, private encService: EncryptionService) {
    const compid = '1';
    this.items$ = this.additem.fetchallItem(encService.encrypt(compid), '', '');
    console.log(this.items$);


    this.items$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
  }

  filterCustomers(): Observable<any[]> {
    return this.items$.pipe(
      map(items =>
        items.filter(item =>
          Object.values(item).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredItems$ = this.filterCustomers();
  }
 
  ngOnInit() {
    this.filteredItems$ = this.items$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
  }

  goBack() {
    this.router.navigate(["/add-item"])
  }
}
