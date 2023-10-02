import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.page.html',
  styleUrls: ['./item-ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemLedgerPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/stock-manager"]);
}
}
