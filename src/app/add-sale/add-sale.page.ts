import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.page.html',
  styleUrls: ['./add-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddSalePage implements OnInit {

  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  cName: string = '';
  orderDate: string = '';
  orderNumber: number | null = null;
  gstin: number | null = null;
  salePerson: string = '';

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
    }else if(this.cName===''){
      const toast = await this.toastCtrl.create({
        message: "Customer Name is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.orderDate===''){
      const toast = await this.toastCtrl.create({
        message: "Order Date is required",
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    }else if(this.orderNumber===null){
      const toast = await this.toastCtrl.create({
        message: "Order Number is required",
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
    }else if(this.salePerson===''){
      const toast = await this.toastCtrl.create({
        message: "Sale Person is required",
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
    this.router.navigate(["/sales-manager"])
  }
}
