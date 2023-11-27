import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcoutService, dcoutstore } from '../services/dcout.service';
import { NgForm } from '@angular/forms';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { quotestore } from '../services/quotation.service';
import { AdditemService } from '../services/additem.service';
import { EncryptionService } from '../services/encryption.service';
import { VendorService } from '../services/vendor.service';
interface Dcout {
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
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class DcOutPage implements OnInit {
  voucherformat: number = 0;
  voucherNumber: string = '';
  datetype: string = '';
  vendcode: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate: string = '';
  // ponumber: string = '';

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
  pretax: string = '0';
  posttax: string = '0';
  deliverydate: string = '';
  deliveryplace: string = 'Jaipur';
  openingbalance: string = '';
  closingbalance: string = '';
  debit: string = '';
  credit: string = '';
  dcoutData: Dcout[] = [{
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
  myform: FormGroup;
  unitname$: any;
  taxrate$: any;
  ttotal!: number;
  itemnames$: any;
  supplier$: any;

  constructor(private vendname1:VendorService,private encService: EncryptionService,private formBuilder: FormBuilder,private itemService:AdditemService,private unittype: UnitnameService, private gstsrvs: GsttypeService,private router: Router, private toastCtrl: ToastController,private dcout: DcoutService) { 
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    this.datetype= new Date().toLocaleDateString();
    this.refdate=  new Date().toLocaleDateString();
    this.deliverydate= new Date().toLocaleDateString();

    this.myform = this.formBuilder.group({
      voucherformat: [''],
      voucherNumber: [''],
      datetype: [''],
      vendcode: [''],
      suppliertype: [''],
      referenceNumber: [''],
      refdate: [''],
      // ponumber: [''],

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

 
  onSubmit(dcinData: any) {
    console.log('Your form data : ',  this.myform.value);
    let dcoutdata: dcoutstore = {
      voucherformat: this.myform.value.voucherformat,
      voucherNumber: this.myform.value.voucherNumber,
      datetype: this.myform.value.datetype,
      vendcode: this.myform.value.vendcode,
      suppliertype: this.myform.value.suppliertype,
      referenceNumber: this.myform.value.referenceNumber,
      refdate: this.myform.value.refdate,
      // ponumber: this.myform.value.ponumber,

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
    
    this.dcout.createdcout(dcoutdata, '', '').subscribe(
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
    addDcout() {
      console.log('addrowwww'+this.dcoutData.length);
      // You can initialize the new row data here
      const newRow :Dcout= {
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
      this.dcoutData.push(newRow);
    }
    removeDcout(index: number,row:Dcout) {
      this.ttotal=this.ttotal-this.dcout.total;
      this.dcoutData.splice(index, 1);
    }
    calculateTotalSum() {
      let sum = 0;
      for (const row of this.dcoutData) {
        sum += this.dcout.total;
      }
      this.ttotal= sum;
    }
  
    // if (this.form.valid) {
    //   console.log('Selected Value' + this.form.value);
    // } else {
    //   Object.keys(this.form.controls).forEach(controlName => {
    //     const control = this.form.get(controlName);
    //     if (control.invalid) {
    //       control.markAsTouched();
    //     }
    //   })
    // }
  
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/transcationdashboard"])
  }
}
