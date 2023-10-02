import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-ledger',
  templateUrl: './service-ledger.page.html',
  styleUrls: ['./service-ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ServiceLedgerPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/stock-manager"]);
  }

}
