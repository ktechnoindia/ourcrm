import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

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
  constructor(private router:Router,private toastCtrl:ToastController) { }

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