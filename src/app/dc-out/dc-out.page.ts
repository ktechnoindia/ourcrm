import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DcoutService, dcoutstore } from '../services/dcout.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class DcOutPage implements OnInit {

  voucherNumber: number | null = null;
  datetype: string = '';
  suppliertype: string = '';
  referenceNumber: number | null = null;
  payment: string = '';
  remark: string = '';
  item: string = '';
  form:any;
  submitted = false;

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder:FormBuilder,private dcin: DcoutService) { 
    this.form = this.formBuilder.group({
      voucherNumber:['',[Validators.required]],
      date:['',[Validators.required]],
      supplier:['',[Validators.required]],
      referenceNumber:['',[Validators.required]],
      payment:['',[Validators.required]],
      remark:['']
    })
  }

 
  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let dcoutdata: dcoutstore = {datetype: myform.value.datetype, voucherNumber: myform.value.voucherNumber,suppliertype: myform.value.suppliertype,referenceNumber: myform.value.referenceNumber, payment: myform.value.payment, remark: myform.value.remark, item: myform.value.item };

    this.dcin.createdcout(dcoutdata, '', '').subscribe(
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
