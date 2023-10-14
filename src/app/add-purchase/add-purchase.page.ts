import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPurchasePage implements OnInit {

  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  supplier: string = '';
  voucherNumber: number | null = null;
  gstin: number | null = null;
  exicutive:string='';

  constructor(private router: Router, private toastCtrl: ToastController) { }

  async onSubmit() {
    if (this.billNumber == null) {
      const toast = await this.toastCtrl.create({
        message: "Bill Number is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.billDate===''){
      const toast = await this.toastCtrl.create({
        message: "Bill Date is required",
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
    }else if(this.supplier===''){
      const toast = await this.toastCtrl.create({
        message: "Supplier is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.voucherNumber===null){
      const toast = await this.toastCtrl.create({
        message: "Voucher Number is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.gstin===null){
      const toast = await this.toastCtrl.create({
        message: "GSTIN is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.exicutive===''){
      const toast = await this.toastCtrl.create({
        message: "Exicutive is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message: "Successfully !",
        duration: 3000,
        color: 'success'
      });
      toast.present();
    }
  }


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/sales-manager']); // Navigate back to the previous page
  }

}
