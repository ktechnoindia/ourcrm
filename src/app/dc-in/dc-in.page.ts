import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DcinService, dcinstore } from '../services/dcin.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dc-in',
  templateUrl: './dc-in.page.html',
  styleUrls: ['./dc-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,RouterLink,RouterModule]
})
export class DcInPage implements OnInit {

  voucherNumber: string='';
  datetype: string = '';
  suppliertype: string = '';
  referenceNumber: string='';
  payment: string = '';
  remark: string = '';
  item: string = '';

  form: FormGroup;
  submitted = false;

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder: FormBuilder, private dcin: DcinService,) {
    this.form = this.formBuilder.group({
      voucherNumber: ['', [Validators.required]],
      datetype: ['', [Validators.required]],
      suppliertype: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      remark: ['']
    })
  }

  onSubmit() {
    console.log('Your form data : ', this.form.value);
    let dcindata: dcinstore = {datetype: this.form.value.datetype, voucherNumber: this.form.value.voucherNumber,suppliertype: this.form.value.suppliertype,referenceNumber: this.form.value.referenceNumber, payment: this.form.value.payment, remark: this.form.value.remark, item: this.form.value.item };

    this.dcin.createdcin(dcindata, '', '').subscribe(
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
    this.router.navigate(["/challan-manager"])
  }
}
