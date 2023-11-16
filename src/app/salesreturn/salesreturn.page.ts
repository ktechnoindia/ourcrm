import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SalereturnService,salereturnstore } from '../services/salereturn.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';

interface Sales {
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
  selector: 'app-salesreturn',
  templateUrl: './salesreturn.page.html',
  styleUrls: ['./salesreturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,RouterModule]
})
export class SalesreturnPage implements OnInit {
  billNumber: number=0;
  billDate: string = '';
  payment: number = 0;
  orderDate: string = '';
  orderNumber: string='';
  gstin: number =0;
  salePerson: number = 0;
  taxrate: string = '';
  custcode: string = '';
  billformate:number=0;
  custname: number = 0;
  salesData: Sales[] = [{
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
  ponumber:string='';
  refrence:string='';
  refdate:string='';
  constructor(private unittype: UnitnameService,private salereturnService:SalereturnService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, ) {
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
  }
  onSubmit(myform: NgForm, salesData: any) {
    console.log('Your form data : ', myform.value);
    let salesreturndata: salereturnstore = {
      billformate:myform.value.billformate,billNumber:myform.value.billNumber,billDate:myform.value.billDate,
      payment:myform.value.payment,orderDate:myform.value.orderDate,orderNumber:myform.value.orderNumber,
      gstin:myform.value.gstin,salePerson:myform.value.salePerson,taxrate:myform.value.taxrate,custcode:myform.value.custcode,custname:myform.value.custname,unitname$:myform.value.unitname$,ponumber:myform.value.ponumber,refdate:myform.value.refdate,refrence:myform.value.refrence,
    
    };
    this.salereturnService.createSaleReturn(salesData, '', '').subscribe(
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
  addSales() {
      console.log('addrowwww'+this.salesData.length);
      // You can initialize the new row data here
      const newRow :Sales= {
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
      this.salesData.push(newRow);
    }
    removeSales(index: number,row:Sales) {
      this.ttotal=this.ttotal-this.salereturnService.total;
      this.salesData.splice(index, 1);
    }
    calculateTotalSum() {
      let sum = 0;
      for (const row of this.salesData) {
        sum += this.salereturnService.total;
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
    this.router.navigate(["/sales-manager"])
  }
}