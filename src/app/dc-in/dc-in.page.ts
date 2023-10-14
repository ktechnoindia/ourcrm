import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dc-in',
  templateUrl: './dc-in.page.html',
  styleUrls: ['./dc-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DcInPage implements OnInit {

  voucherNumber: number | null = null;
  date: string = '';
  supplier: string = '';
  referenceNumber: number | null = null;
  payment: string = '';
  remark: string = '';

  constructor(private router: Router, private toastCtrl: ToastController) { }

  async onSubmit() {
    if (this.voucherNumber === null) {
      const toast = await this.toastCtrl.create({
        message: "Voucher Number is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.date===''){
      const toast = await this.toastCtrl.create({
        message: "Date is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.supplier===''){
      const toast = await this.toastCtrl.create({
        message: "Supplier is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.referenceNumber===null){
      const toast = await this.toastCtrl.create({
        message: "Referance Number is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.payment===''){
      const toast = await this.toastCtrl.create({
        message: "Credit/Debit is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.remark===''){
      const toast = await this.toastCtrl.create({
        message: "Remark is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else{
        const toast = await this.toastCtrl.create({
          message: "SuccesFully",
          duration: 3000,
          color: 'success'
        });
        toast.present();
    }
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/challan-manager"])
  }
}
