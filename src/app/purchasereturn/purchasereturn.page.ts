import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { quotestore } from '../services/quotation.service';
import { purchasestore } from '../services/purchase.service';

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
  selector: 'app-purchasereturn',
  templateUrl: './purchasereturn.page.html',
  styleUrls: ['./purchasereturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class PurchasereturnPage implements OnInit {
  form:any;
  billNumber: number = 0;
  billDate: string = '';
  payment: number = 0;
  supplier: number = 0;
  gstin: number = 0;
  exicutive:number=0;
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
    let purchasereturndata: purchasestore = {
      billNumber:myform.value.billNumber,billDate:myform.value.billDate,billformate:myform.value.billformate,payment:myform.value.payment,supplier:myform.value.supplier,gstin:myform.value.gstin,
      exicutive:myform.value.exicutive,unitname$:myform.value.unitname$,taxrate$:myform.value.taxrate$,
      refrence:myform.value.refrence,refdate:myform.value.refdate,vendcode:myform.value.vendcode,orderDate:myform.value.orderDate,orderNumber:myform.value.orderNumber,
    
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

