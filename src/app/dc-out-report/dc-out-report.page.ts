import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { DcoutService } from '../services/dcout.service';
import { Observable, map } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';



@Component({
  selector: 'app-dc-out-report',
  templateUrl: './dc-out-report.page.html',
  styleUrls: ['./dc-out-report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class DcOutReportPage implements OnInit {
  formDate:string='';
  toDate:string='';
  dcout$: Observable<any[]>

  constructor(private router:Router,private toastCtrl:ToastController,private dcoutservice:DcoutService,private encService:EncryptionService,) { 
    const compid='1';

    this.dcout$ = this.dcoutservice.fetchallDcout(encService.encrypt(compid),'','');
    console.log(this.dcout$);
  }

  async onSubmit(){
    const fromDateObj = new Date(this.formDate);
  const toDateObj = new Date(this.toDate);

  // Filter DC-OUT data based on date range
  this.dcout$ = this.dcout$.pipe(
    map(dcouts => dcouts.filter(dcout => {
      const voucherDate = new Date(dcout.datetype);
      return voucherDate >= fromDateObj && voucherDate <= toDateObj;
    }))
  );
  }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(["/dc-out"])
  }

}
