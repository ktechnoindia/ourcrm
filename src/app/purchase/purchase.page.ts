import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseService, purchasestore } from '../services/purchase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class PurchasePage implements OnInit {
form:any;
  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  supplier: string = '';
  voucherNumber: number | null = null;
  gstin: number | null = null;
  exicutive:string='';
  taxrate: string = '';
  unit: string = '';
  item: string = '';
  purchase: any;

  constructor(private router: Router, private toastCtrl: ToastController,private formBuilder:FormBuilder,private sales: PurchaseService) { 
    this.form = this.formBuilder.group({
      billNumber:['',[Validators.required]],
      billDate:['',[Validators.required]],
      payment:['',[Validators.required]],
      supplier:['',[Validators.required]],
      voucherNumber:['',[Validators.required]],
      exicutive:['',[Validators.required]],
      gstin:[''],
   })
  }

  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let purchasedata: purchasestore = { billNumber: myform.value.billNumber, billDate: myform.value.billDate, cName: myform.value.cName, orderDate: myform.value.orderDate, payment: myform.value.payment, orderNumber: myform.value.orderNumber, item: myform.value.item, gstin: myform.value.gstin, exicutive: myform.value.exicutive, taxrate: myform.value.taxrate, unit: myform.value.unit, };

    this.purchase.createpurchase(purchasedata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );

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
  } 


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/sales-manager']); // Navigate back to the previous page
  }

}
