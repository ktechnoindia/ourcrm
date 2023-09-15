import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dc-out-report',
  templateUrl: './dc-out-report.page.html',
  styleUrls: ['./dc-out-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DcOutReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
