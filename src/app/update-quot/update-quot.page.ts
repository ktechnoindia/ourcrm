import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UpdatequoteService, upquotestore } from '../services/updatequote.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-quot',
  templateUrl: './update-quot.page.html',
  styleUrls: ['./update-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdateQuotPage implements OnInit {
  quoteNumber: number | null = null;
  quateDate: string = '';
  quoteGroup: string = '';
  quateTax: number | null = null;
  taxrate: string = '';
  unit: string = '';
  item: string = '';
  quotation: any;
  description : string='';
  quantity : string ='';
  basicrate : string ='';
  grossrate : string ='';
    CGST : string ='';
    SGST : string ='';
    payment?: any;
    orderNumber: any;
    gstin: any;
    salePerson: any;

  constructor(private router:Router,private toastCtrl:ToastController,private updatequote:UpdatequoteService) { }


  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let quotedata: upquotestore = {
      quoteNumber: myform.value.quoteNumber, quateDate: myform.value.quateDate, quoteGroup: myform.value.quoteGroup, quateTax: myform.value.quateTax, item: myform.value.item, taxrate: myform.value.taxrate, description: myform.value.description, quantity: myform.value.quantity, basicrate: myform.value.basicrate, grossrate: myform.value.grossrate, CGST: myform.value.CGST, SGST: myform.value.SGST,
      payment: myform.value.payment,
      orderNumber: myform.value.orderNumber,
      gstin: myform.value.gstin,
      salePerson: myform.value.salePerson,
      unit: myform.value.unit,
    };
  }
  // async onSubmit() {
  //   if (this.quoteNumber === null) {
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Number is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.quateDate===''){
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Date is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.quoteGroup===''){
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Group is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.quateTax===null){
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Tax is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else{
  //     const toast = await this.toastCtrl.create({
  //       message: "Successfully !",
  //       duration: 3000,
  //       color: 'success'
  //     });
  //     toast.present();
  //   }
  // }

  ngOnInit() {
  }
goBack(){
  this.router.navigate(["/quote-manager"])
}
}
