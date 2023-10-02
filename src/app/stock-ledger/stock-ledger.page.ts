import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock-ledger',
  templateUrl: './stock-ledger.page.html',
  styleUrls: ['./stock-ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockLedgerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/stock-manager"]);
  }

}
