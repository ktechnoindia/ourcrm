import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-paymenttransaction-report',
  templateUrl: './paymenttransaction-report.page.html',
  styleUrls: ['./paymenttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymenttransactionReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
