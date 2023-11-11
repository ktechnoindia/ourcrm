import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcoutService, dcoutstore } from '../services/dcout.service';
import { NgForm } from '@angular/forms';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { quotestore } from '../services/quotation.service';
interface Dcout {
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
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class DcOutPage implements OnInit {
  voucherformat:string='';
  voucherNumber: string='';
  datetype: string = '';
  suppliertype: string = '';
  referenceNumber: string='';
  refdate:string='';
  payment: string = '';
  remark: string = '';
  item: string = '';
  vendcode:string='';
  ponumber:string='';
  submitted = false;
  unitname$: any;
  taxrate$:any;
  ttotal!: number;
  dcoutData: Dcout[] = [{
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
  dcout: any;
  constructor(private unittype: UnitnameService, private gstsrvs: GsttypeService,private router: Router, private toastCtrl: ToastController,private dcin: DcoutService) { 
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
  }

 
  onSubmit(myform: NgForm, dcinData: any) {
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
    
    this.dcout.createdcout(this.dcoutData, '', '').subscribe(
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
      this.dcoutData.push(newRow);
    }
    removeDcout(index: number,row:Dcout) {
      this.ttotal=this.ttotal-this.dcin.total;
      this.dcoutData.splice(index, 1);
    }
    calculateTotalSum() {
      let sum = 0;
      for (const row of this.dcoutData) {
        sum += this.dcin.total;
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
    this.router.navigate(["/challan-manager"])
  }
}
