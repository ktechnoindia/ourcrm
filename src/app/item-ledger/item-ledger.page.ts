import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AdditemService } from '../services/additem.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.page.html',
  styleUrls: ['./item-ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class ItemLedgerPage implements OnInit {
  items: any[] = []; // Define this array to hold your ledger items
  fetchitemledger$: Observable<any>;

  constructor(private router:Router,private itemservice:AdditemService,) {

    this.fetchitemledger$= this.itemservice.fetchitemledgerrpt('');
    console.log(this.fetchitemledger$);
   }

  ngOnInit() {
    this.fetchitemledger$ = this.itemservice.fetchitemledgerrpt('');
    this.fetchitemledger$.subscribe(data => {
      this.items = data;
      this.calculateClosingBalance();
    });
  }
  
goBack(){
  this.router.navigate(["/stock-manager"]);
}
calculateClosingBalance(): void {
  for (let item of this.items) {
    const obalance = parseFloat(item.obalance || '0');
    const purchases = parseFloat(item.purchases || '0');
    const sales = parseFloat(item.sales || '0');

    // Calculate the closing balance
    item.closing = (obalance + purchases - sales).toFixed(2);
  }
}
}