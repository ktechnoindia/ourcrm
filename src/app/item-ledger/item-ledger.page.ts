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
  fetchitemledger$: Observable<any>;

  constructor(private router:Router,private itemservice:AdditemService) {

    this.fetchitemledger$= this.itemservice.fetchitemledgerreport(1);
    console.log(this.fetchitemledger$);
   }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/stock-manager"]);
}
}
