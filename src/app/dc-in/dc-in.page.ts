import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DcinService, dcinstore } from '../services/dcin.service';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../form-validation.service';


@Component({
  selector: 'app-dc-in',
  templateUrl: './dc-in.page.html',
  styleUrls: ['./dc-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule]
})
export class DcInPage implements OnInit {
  voucherformat:string='';
  voucherNumber: string = '';
  datetype: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate:string='';
  payment: number = 0;
  remark: string = '';
  item: number = 0;
  
  form: FormGroup;
  submitted = false;

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder: FormBuilder, private dcin: DcinService, private formService: FormValidationService) {
    this.form = this.formBuilder.group({
      voucherNumber: ['', [Validators.required]],
      datetype: [''],
      suppliertype: [''],
      referenceNumber: [''],
      payment: [''],
      remark: [''],
      voucherformat: [''],
      refdate: [''],
    })
  }

  async onSubmit() {
    const fields = { voucherNumber: this.voucherNumber };
    const isValid = await this.formService.validateForm(fields);
    if (isValid) {

      console.log('Your form data : ', this.form.value);
      let dcindata: dcinstore = { datetype: this.form.value.datetype, voucherNumber: this.form.value.voucherNumber, suppliertype: this.form.value.suppliertype, referenceNumber: this.form.value.referenceNumber, payment: this.form.value.payment, remark: this.form.value.remark, item: this.form.value.item };

      this.dcin.createdcin(dcindata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
    } else {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      })
    }
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/challan-manager"])
  }
}
