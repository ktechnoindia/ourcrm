import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-wise-report',
  templateUrl: './group-wise-report.page.html',
  styleUrls: ['./group-wise-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GroupWiseReportPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/stock-manager"]);
  }
}
