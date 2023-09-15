import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dc-in-report',
  templateUrl: './dc-in-report.page.html',
  styleUrls: ['./dc-in-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DcInReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
