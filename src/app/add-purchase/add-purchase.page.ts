import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { quotestore } from '../services/quotation.service';

interface Purchase {
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
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})


export class AddPurchasePage implements OnInit {
form:any;
  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  supplier: string = '';
  voucherNumber: number | null = null;
  gstin: number | null = null;
  exicutive:string='';
  purchaseData: Purchase[] = [{
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
  ponumber:string='';
  refrence:string='';
  refdate:string='';
  purchase: any;
  billformate:number=0;
  vendcode:string='';
  orderDate:string='';
  orderNumber:string='';
  
  constructor(private unittype: UnitnameService, private gstsrvs: GsttypeService,private router: Router, private toastCtrl: ToastController) { 
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
  }

  onSubmit(myform: NgForm, purchaseData: any) {
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
    if (this.form.valid) {
      console.log('Selected Value' + this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control.invalid) {
          control.markAsTouched();
        }
      })
    }
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
