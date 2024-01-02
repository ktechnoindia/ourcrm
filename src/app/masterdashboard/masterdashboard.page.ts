import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { CustomerService } from '../services/customer.service';
import { Observable } from 'rxjs';
import { VendorService } from '../services/vendor.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';

@Component({
  selector: 'app-masterdashboard',
  templateUrl: './masterdashboard.page.html',
  styleUrls: ['./masterdashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})

export class MasterdashboardPage implements OnInit {
  customers$: Observable<any[]>;
  vendors$: Observable<any[]>;
  executives$: Observable<any[]>
  items$: Observable<any[]>
  totalCustomer: number = 0;
  totalSupplier:number=0;
  totalItems:number=0;
  sharedService: any;
  selectedOptions: string[] = [];

  constructor(private encService: EncryptionService, private custservice: CustomerService,private venderService:VendorService,private executService:ExecutiveService,private additem : AdditemService) { 
    const compid = '1';

    this.customers$ = this.custservice.fetchallCustomer(encService.encrypt(compid), '', '');
    console.log(this.customers$);

    this.customers$.subscribe(data => {
      console.log(data);
      this.totalCustomer=data.length // Log the data to the console to verify if it's being fetched
    });

    this.vendors$ = this.venderService.fetchallVendor(encService.encrypt(compid),'','');
    console.log(this.vendors$);
    this.vendors$.subscribe(data => {
      console.log(data);
      this.totalSupplier=data.length // Log the data to the console to verify if it's being fetched
    });

    this.executives$ = this.executService.fetchAllExecutive(compid,'','');
    console.log(this.executives$);
    
    this.items$ = this.additem.fetchallItem(encService.encrypt(compid),'','');
    console.log(this.items$);
    this.items$.subscribe(data => {
      console.log(data);
      this.totalItems=data.length // Log the data to the console to verify if it's being fetched
    });

    this.items$.subscribe(data => {
      console.log(data); // Log the data to the console to verify if it's being fetched
    });
  }

  ngOnInit() {
    
  }
  get showHeader(): boolean {
    return this.sharedService.showHeader;
  }
}
