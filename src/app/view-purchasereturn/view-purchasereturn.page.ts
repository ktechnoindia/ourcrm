import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PurchasereturnService } from '../services/purchasereturn.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-purchasereturn',
  templateUrl: './view-purchasereturn.page.html',
  styleUrls: ['./view-purchasereturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ViewPurchasereturnPage implements OnInit {
  formDate:string='';
  toDate:string='';
  purchasereturn$: Observable<any[]>

  constructor(private router:Router,private toastCtrl:ToastController,private purchasereturnservice:PurchasereturnService,private encService:EncryptionService ) { 
    const compid='1';

    this.purchasereturn$ = this.purchasereturnservice.fetchallPurchasereturn(encService.encrypt(compid),'','');
    console.log(this.purchasereturn$);
  }

  async onSubmit(){
    if(this.formDate===''){
      const toast = await this.toastCtrl.create({
        message:"Form Date is required",
        duration:3000,
        color:'danger',
      });
      toast.present();
    }else if(this.toDate===''){
      const toast = await this.toastCtrl.create({
        message:"To Date is required",
        duration:3000,
        color:'danger',
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message:"Successfully !",
        duration:3000,
        color:'success',
      });
      toast.present();
    }
  }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/purchasereturn"])
}
}
