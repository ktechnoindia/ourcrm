import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { QuotationService, quotestore } from '../services/quotation.service';
import { NgForm } from '@angular/forms';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
interface Quote {
  barcode: string;
  itemcode: number;
  itemname: number,
  description: string;
  quantity: number;
  unitname: number;
  mrp: number;
  basicrate: number;
  netrate: number;
  grossrate: number;
  taxrate: number;
  CGST: number;
  SGST: number;
  IGST: number;
  discount: number;
  discountamt: number;
  totaltax: number;
  total: number;
}

@Component({
  selector: 'app-add-quot',
  templateUrl: './add-quot.page.html',
  styleUrls: ['./add-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class AddQuotPage implements OnInit {

  quoteNumber: number | null = null;
  quateDate: string = '';
  custname: string = '';
  quateTax: string = '';
  taxrate: string = '';
  totaltax: string = '';
  total: string = '';
  refrence: string = '';
  refdate: string = '';
  unitname: string = '';
  item: string = '';
  quotation: any;
  quoteGroup: string = '';
  description: string = '';
  quantity: string = '';
  basicrate: string = '';
  grossrate: string = '';
  CGST: string = '';
  SGST: string = '';
  payment?: any;
  orderNumber: any;
  gstin: any;
  salePerson: any;
  taxrate$: any;
  custcode: string = '';
  itemcode: string = '';
  barcode: string = '';
  mrp: string = '';
  netrate: string = '';
  IGST: string = '';
  discount: string = '';
  discountamt: string = '';
  quoteData: Quote[] = [{
    barcode: '',
    itemcode: 0,
    itemname: 0,
    description: '',
    quantity: 0,
    unitname: 0,
    mrp: 0,
    basicrate: 0,
    netrate: 0,
    grossrate: 0,
    taxrate: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
    discount: 0,
    discountamt: 0,
    totaltax: 0,
    total: 0,
  }];
  ttotal!: number;
  unitname$: any;
  constructor(private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private quote: QuotationService) {
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
  }
  onSubmit(myform: NgForm, quoteData: any) {
    console.log('Your form data : ', myform.value);
    let quotedata: quotestore = {
      quoteNumber: myform.value.quoteNumber, quateDate: myform.value.quateDate, quoteGroup: myform.value.quoteGroup, quateTax: myform.value.quateTax, item: myform.value.item, taxrate: myform.value.taxrate, description: myform.value.description, quantity: myform.value.quantity, basicrate: myform.value.basicrate, grossrate: myform.value.grossrate, CGST: myform.value.CGST, SGST: myform.value.SGST,
      payment: myform.value.payment,
      orderNumber: myform.value.orderNumber,
      gstin: myform.value.gstin,
      salePerson: myform.value.salePerson,
      unit: myform.value.unit,
      total: myform.value.total,
      ttotal: myform.value.ttotal
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
  addQuote() {
    console.log('addrowwww'+this.quoteData.length);
    // You can initialize the new row data here
    const newRow :Quote= {
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description:'',
      quantity:0,
      unitname:0,
      mrp:0,
      basicrate:0,
      netrate:0,
      grossrate:0,
      taxrate:0,
      CGST:0,
      SGST:0,
      IGST:0,
      discount:0,
      discountamt:0,
      totaltax:0,
      total:0,
      // Add more properties as needed
    };
    this.quoteData.push(newRow);
  }
  removeQuote(index: number,row:Quote) {
    this.ttotal=this.ttotal-this.quote.total;
    this.quoteData.splice(index, 1);
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.quoteData) {
      sum += this.quote.total;
    }
    this.ttotal= sum;
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
