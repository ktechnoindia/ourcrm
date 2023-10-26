import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SalesService, salesstore } from '../services/sales.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.page.html',
  styleUrls: ['./add-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddSalePage implements OnInit {

  form: FormGroup;

  billNumber: number | null = null;
  billDate: string = '';
  payment: string = '';
  cName: string = '';
  orderDate: string = '';
  orderNumber: number | null = null;
  gstin: number | null = null;
  salePerson: string = '';
  taxrate: string = '';
  unit: string = '';
  item: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private toastCtrl: ToastController, private sales: SalesService) {
    this.form = this.formBuilder.group({
      billNumber: ['', [Validators.required]],
      billDate: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      cName: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      orderNumber: ['', [Validators.required]],
      gstin: [''],
      salePerson: [''],
      taxrate: [''],
      unit: [''],
      item: [''],
    })
  }
  onSubmit() {
    console.log('Your form data : ', this.form.value);
    let salesdata: salesstore = { billNumber: this.form.value.billNumber, billDate: this.form.value.billDate, cName: this.form.value.cName, orderDate: this.form.value.orderDate, payment: this.form.value.payment, orderNumber: this.form.value.orderNumber, item: this.form.value.item, gstin: this.form.value.gstin, salePerson: this.form.value.salePerson, taxrate: this.form.value.taxrate, unit: this.form.value.unit, };

    this.sales.createsale(salesdata, '', '').subscribe(
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
    this.router.navigate(["/sales-manager"])
  }
}
