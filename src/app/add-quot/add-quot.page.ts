import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { QuotationService, quotestore } from '../services/quotation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-quot',
  templateUrl: './add-quot.page.html',
  styleUrls: ['./add-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class AddQuotPage implements OnInit {

  quoteNumber: number | null = null;
  quateDate: string = '';
  custname: string = '';
  quateTax:string='';
  taxrate: string = '';
  totaltax:string='';
  total:string='';
  refrence: string = '';
  refdate: string = '';
  unit: string = '';
  item: string = '';
  quotation: any;
  quoteGroup: string = '';
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
  constructor(private router: Router, private toastCtrl: ToastController, private quote: QuotationService) { }

  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let quotedata: quotestore = {
      quoteNumber: myform.value.quoteNumber, quateDate: myform.value.quateDate, quoteGroup: myform.value.quoteGroup, quateTax: myform.value.quateTax, item: myform.value.item, taxrate: myform.value.taxrate, description: myform.value.description, quantity: myform.value.quantity, basicrate: myform.value.basicrate, grossrate: myform.value.grossrate, CGST: myform.value.CGST, SGST: myform.value.SGST,
      payment: myform.value.payment,
      orderNumber: myform.value.orderNumber,
      gstin: myform.value.gstin,
      salePerson: myform.value.salePerson,
      unit: myform.value.unit,
    };

    this.quotation.createquote(quotedata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  }
  // async onSubmit() {
  //   if (this.quoteNumber === null) {
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Number is required",
  //       duration: 3000,
  //       color: 'danger',
        
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
  //       color: 'success',
  //       position:'top'
  //     });
  //     toast.present();
  //   }
  // }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/quote-manager']); // Navigate back to the previous page
  }
}
