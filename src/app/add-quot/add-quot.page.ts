import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { QuotationService, quotestore } from '../services/quotation.service';
import { NgForm } from '@angular/forms';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { AdditemService } from '../services/additem.service';
import { CustomerService } from '../services/customer.service';
import { EncryptionService } from '../services/encryption.service';
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
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,FormsModule, // Add this line
  ReactiveFormsModule ]
})
export class AddQuotPage implements OnInit {
  billformate: number = 0;
  quoteNumber: number= 0;
  quateDate: string = '';
  custcode: string = '';
  custname: number = 0;
  refrence: string = '';
  refdate: string = '';

    //table data
  barcode: string = '';
  itemcode: string = '';
  itemname: number = 0;
  description: string = '';
  quantity: string = '';
  unitname: number = 0;
  mrp: string = '';
  basicrate: string = '';
  netrate: string = '';
  grossrate: string = '';
  taxrate: string = '';
  CGST: string = '';
  SGST: string = '';
  IGST: string = '';
  discount: string = '';
  discountamt: string = '';
  totaltax: string = '';
  total: string = '';

  totalitemno: string = '';
  totalquantity: string = '';
  totalgrossamt: string = '';
  totaldiscountamt: string = '';
  totaltaxamount: string = '';
  totalnetamount: string = '';

  roundoff: string = '';
  pretax: string = '';
  posttax: string = '';
  deliverydate: string = '';
  deliveryplace: string = '';
  openingbalance: string = '';
  closingbalance: string = '';
  debit: string = '';
  credit: string = '';



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
  taxrate$: any;
  myform: FormGroup;

  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;
  itemnames$: any;
  customer$: any;
  constructor(private formBuilder: FormBuilder,private custname1:CustomerService, private encService: EncryptionService,private itemService:AdditemService,private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private quote: QuotationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');


    this.myform = this.formBuilder.group({
      billformate:[''],
      quoteNumber: [''],
      quateDate:[''],
      custcode:[''],
      custname:[''],
      refrence: [''],
      refdate:[''],
      
      //table
    barcode:[''],
    itemcode:[''],
    itemname:[''],
    description:[''],
    quantity:[''],
    unitname:[''],
    mrp:[''],
    basicrate:[''],
    netrate:[''],
    grossrate:[''],
      taxrate:[''],
     IGST:[''],
      CGST:[''],
      SGST:[''],
      discount:[''],
      discountamt:[''],
      totaltax: [''],
      total: [''],
    
      totalitemno:[''],
      totalquantity:[''],
      totalgrossamt:[''],
      totaldiscountamt:[''],
      totaltaxamount:[''],
      totalnetamount:[''],
      deliverydate: [''],
      deliveryplace: [''],
    
      roundoff:[''],
      pretax: [''],
      posttax: [''],
      openingbalance:[''],
      closingbalance:[''],
      debit: [''],
      credit:[''],
    
      ttotal:[''],

    })
  }
  onSubmit() {
    console.log('Your form data : ', this.myform.value);
    let quotedata: quotestore = {
      billformate:this.myform.value.billformate,
      quoteNumber: this.myform.value.quoteNumber,
      quateDate:this.myform.value.quateDate,
      custcode: this.myform.value.custcode,
      custname:this.myform.value.custname,
      refrence: this.myform.value.refrence,
      refdate:this.myform.value.refdate,
      
      barcode:this.myform.value.barcode,
      itemcode:this.myform.value.itemcode,
      itemname:this.myform.value.itemname,
      description:this.myform.value.description,
      quantity:this.myform.value.quantity,
      unitname:this.myform.value.unitname,
      mrp:this.myform.value.mrp,
      basicrate:this.myform.value.basicrate,
      netrate:this.myform.value.netrate,
      grossrate: this.myform.value.grossrate,
      taxrate:this.myform.value.taxrate,
      CGST:this.myform.value.CGST,
      SGST:this.myform.value.SGST,
      IGST: this.myform.value.IGST,
      discount:this.myform.value.discount,
      discountamt: this.myform.value.discountamt,
      totaltax:this.myform.value.totaltax,
      total: this.myform.value.total,
      totalitemno: this.myform.value.totalitemno,
      totalquantity:this.myform.value.totalquantity,
      totalgrossamt:this.myform.value.totalgrossamt,
      totaldiscountamt: this.myform.value.totaldiscountamt,
      totaltaxamount:this.myform.value.totaltaxamount,
      totalnetamount: this.myform.value.totalnetamount,
      roundoff:this.myform.value.roundoff,
      pretax:this.myform.value.pretax,
      posttax:this.myform.value.posttax,
      deliverydate: this.myform.value.deliverydate,
      deliveryplace: this.myform.value.deliveryplace,
      openingbalance:this.myform.value.openingbalance,
      closingbalance: this.myform.value.closingbalance,
      debit:this.myform.value.debit,
      credit: this.myform.value.credit,

      ttotal: this.myform.value.ttotal,



    };

    this.quote.createquote(quotedata, '', '').subscribe(
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
    console.log('addrowwww' + this.quoteData.length);
    // You can initialize the new row data here
    const newRow: Quote = {
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
      // Add more properties as needed
    };
    this.quoteData.push(newRow);
  }
  calculateTotal(quote: Quote) {
    quote.total = quote.totaltax + quote.grossrate;
    this.calculateTotals();
  }

  removeQuote(index: number, quote: Quote) {
    this.ttotal = this.ttotal - quote.total;
    this.quoteData.splice(index, 1);
  }
  calculateTotals(): void {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.quoteData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.quoteData.reduce((total, quote) => total + quote.quantity, 0);
    this.totalGrossAmt = this.quoteData.reduce((total, quote) => total + quote.grossrate, 0);

    // Add similar calculations for other totals
  }
  // calculateTotalSum() {
  //   let sum = 0;
  //   for (const row of this.quoteData) {
  //     sum += this.quote.total;
  //   }
  //   this.ttotal = sum;
  // }
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
  //   
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
    this.router.navigate(['/transactiondashboard']); // Navigate back to the previous page
  }
}