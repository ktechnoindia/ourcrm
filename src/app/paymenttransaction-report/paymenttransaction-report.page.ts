import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-paymenttransaction-report',
  templateUrl: './paymenttransaction-report.page.html',
  styleUrls: ['./paymenttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class PaymenttransactionReportPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
}
