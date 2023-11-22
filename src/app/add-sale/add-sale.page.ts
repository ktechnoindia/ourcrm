import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SalesService, salesstore } from '../services/sales.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
// import { quotestore } from '../services/quotation.service';

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
  selector: 'app-add-sale',
  templateUrl: './add-sale.page.html',
  styleUrls: ['./add-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AddSalePage implements OnInit {
  billformate: number = 0;
  billNumber: number = 0;
  billDate: string = '';
  custcode: string = '';
  custname: number = 0;
  refrence: string = '';
  refdate: string = '';
  orderDate: string = '';
  orderNumber: string = '';
  // ponumber: string = '';
  gstin: number = 0;
  salePerson: number = 0;
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
  ttotal:  number = 0;
  myform: FormGroup;
  unitname$: any;
  taxrate$: any;

  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;

  constructor(private formBuilder: FormBuilder, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private saleService: SalesService) {
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();

    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: [''],
      billDate: [''],
      custcode: [''],
      custname: [''],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      // ponumber: [''],
      gstin: [''],
      salePerson: [''],
      payment: [''],

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
  onSubmit(salesData: any) {
    console.log('Your form data : ', this.myform.value);
    let saledata: salesstore = {
      billformate: this.myform.value.billformate,
      billNumber: this.myform.value.billNumber,
      billDate: this.myform.value.billDate,
      custcode: this.myform.value.custcode,
      custname: this.myform.value.custname,
      refdate: this.myform.value.refdate,
      refrence: this.myform.value.refrence,
      orderDate: this.myform.value.orderDate,
      orderNumber: this.myform.value.orderNumber,
      // ponumber: this.myform.value.ponumber,
      gstin: this.myform.value.gstin,
      salePerson: this.myform.value.salePerson,
      payment: this.myform.value.payment,

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
      unitname$: this.myform.value.unitname$,
      ttotal: this.myform.value.ttotal,

    };
    this.saleService.createsale(saledata, '', '').subscribe(
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
    console.log('addrowwww' + this.salesData.length);
    // You can initialize the new row data here
    const newRow: Sales = {
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
      // Add more properties as needed
    };
    this.salesData.push(newRow);
  }
  calculateTotal(sales: Sales) {
    sales.total = sales.totaltax + sales.grossrate;
    this.calculateTotals();
  }
  removeSales(index: number, sales: Sales) {
    this.ttotal = this.ttotal - this.saleService.total;
    this.salesData.splice(index, 1);
  }
  calculateTotals(): void {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.salesData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.salesData.reduce((total, sale) => total + sale.quantity, 0);
    this.totalGrossAmt = this.salesData.reduce((total, sale) => total + sale.grossrate, 0);

    // Add similar calculations for other totals
  }
  // calculateTotalSum() {
  //   let sum = 0;
  //   for (const sales of this.salesData) {
  //     sum += sales.total;

  //   }
  //   this.ttotal = sum;
    
  // }

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
