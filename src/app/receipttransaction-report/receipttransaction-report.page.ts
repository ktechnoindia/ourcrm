import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecepitService } from '../services/recepit.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-receipttransaction-report',
  templateUrl: './receipttransaction-report.page.html',
  styleUrls: ['./receipttransaction-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReceipttransactionReportPage implements OnInit {
  recepits$:  Observable<any[]>

  constructor(private router:Router,private encService:EncryptionService,private recepitService:RecepitService) { 

    const compid='1';

    this.recepits$ = this.recepitService.fetchAllReceppit(encService.encrypt(compid),'','');
    console.log(this.recepits$);
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
}
