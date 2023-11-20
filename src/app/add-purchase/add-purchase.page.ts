import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,NgForm,ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { PurchaseService,purchasestore } from '../services/purchase.service';
import { ExecutiveService } from '../services/executive.service';

interface Purchase {
  barcode: string;
  itemcode: number;
  itemname: number,
  description: string;
  quantity: number;
  unitname$: number;
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
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})


export class AddPurchasePage implements OnInit {

form:any;
billformate:number=0;
  billNumber: number = 0;
  billDate: string = '';
  vendcode:string='';
  supplier: number = 0;
  refrence:string='';
  refdate:string='';
  orderDate:string='';
  orderNumber:string='';
  ponumber:string='';
  gstin: number = 0;
  payment: number = 0;

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
  totaltax: number = 0;
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

  purchaseData: Purchase[] = [{
    barcode: '',
    itemcode: 0,
    itemname: 0,
    description: '',
    quantity: 0,
    unitname$: 0,
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
  purchase: any;
  executive$: any;
  myform: FormGroup;


  constructor(private formBuilder: FormBuilder,private execut: ExecutiveService,private purchaseService:PurchaseService,private unittype: UnitnameService, private gstsrvs: GsttypeService,private router: Router, private toastCtrl: ToastController) { 
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.executive$ = this.execut.getexecutive();

    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: [''],
      billDate:  [''],
      vendcode: [''],
      supplier: [''],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      ponumber: [''],
      gstin:  [''],
      payment:  [''],
      executive$: ['', Validators.required],

      
       //table
       barcode: [''],
       itemcode: [''],
       itemname: [''],
       description: [''],
       quantity: [''],
       unitname: [''],
       mrp: [''],
       basicrate: [''],
       netrate: [''],
       grossrate: [''],
       taxrate: [''],
       IGST: [''],
       CGST: [''],
       SGST: [''],
       discount: [''],
       discountamt: [''],
       totaltax: [''],
       total: [''],
 
       totalitemno: [''],
       totalquantity: [''],
       totalgrossamt: [''],
       totaldiscountamt: [''],
       totaltaxamount: [''],
       totalnetamount: [''],
       deliverydate: [''],
       deliveryplace: [''],
 
       roundoff: [''],
       pretax: [''],
       posttax: [''],
       openingbalance: [''],
       closingbalance: [''],
       debit: [''],
       credit: [''],
 
       ttotal: [''],
    })
  }

  onSubmit(purchaseData: any) {
    console.log('Your form data : ', this.myform.value);
    let purchasedata: purchasestore = {
      billNumber: this.myform.value.billNumber,
      billDate: this.myform.value.billDate,
      billformate: this.myform.value.billformate,
      payment: this.myform.value.payment,
      supplier: this.myform.value.supplier,
      gstin: this.myform.value.gstin,
      executive$: this.myform.value.executive$,
      unitname$: this.myform.value.unitname$,
      taxrate$: this.myform.value.taxrate$,
      refrence: this.myform.value.refrence,
      refdate: this.myform.value.refdate,
      vendcode: this.myform.value.vendcode,
      orderDate: this.myform.value.orderDate,
      orderNumber: this.myform.value.orderNumber,
      ponumber: this.myform.value.ponumber,


      barcode: this.myform.value.barcode,
      itemcode: this.myform.value.itemcode,
      itemname: this.myform.value.itemname,
      description: this.myform.value.description,
      quantity: this.myform.value.quantity,
      unitname: this.myform.value.unitname,
      mrp: this.myform.value.mrp,
      basicrate: this.myform.value.basicrate,
      netrate: this.myform.value.netrate,
      grossrate: this.myform.value.grossrate,
      taxrate: this.myform.value.taxrate,
      CGST: this.myform.value.CGST,
      SGST: this.myform.value.SGST,
      IGST: this.myform.value.IGST,
      discount: this.myform.value.discount,
      discountamt: this.myform.value.discountamt,
      totaltax: this.myform.value.totaltax,
      total: this.myform.value.total,
      totalitemno: this.myform.value.totalitemno,
      totalquantity: this.myform.value.totalquantity,
      totalgrossamt: this.myform.value.totalgrossamt,
      totaldiscountamt: this.myform.value.totaldiscountamt,
      totaltaxamount: this.myform.value.totaltaxamount,
      totalnetamount: this.myform.value.totalnetamount,
      roundoff: this.myform.value.roundoff,
      pretax: this.myform.value.pretax,
      posttax: this.myform.value.posttax,
      deliverydate: this.myform.value.deliverydate,
      deliveryplace: this.myform.value.deliveryplace,
      openingbalance: this.myform.value.openingbalance,
      closingbalance: this.myform.value.closingbalance,
      debit: this.myform.value.debit,
      credit: this.myform.value.credit,
    };
    this.purchaseService.createpurchase(purchasedata, '', '').subscribe(
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
  addPurchase() {
    console.log('addrowwww'+this.purchaseData.length);
    // You can initialize the new row data here
    const newRow :Purchase= {
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description:'',
      quantity:0,
      unitname$:0,
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
    this.purchaseData.push(newRow);
  }
  removePurchase(index: number,row:Purchase) {
    this.ttotal=this.ttotal-this.purchase.total;
    this.purchaseData.splice(index, 1);
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.purchaseData) {
      sum += this.purchase.total;
    }
    this.ttotal= sum;
  }


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/sales-manager']); // Navigate back to the previous page
  }

}
