import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class DcOutPage implements OnInit {

  voucherNumber: number | null = null;
  date: string = '';
  supplier: string = '';
  referenceNumber: number | null = null;
  payment: string = '';
  remark: string = '';

  form:any;
  submitted=false;

  constructor(private router: Router, private toastCtrl: ToastController, private formBuilder:FormBuilder) { 
    this.form = this.formBuilder.group({
      voucherNumber:['',[Validators.required]],
      date:['',[Validators.required]],
      supplier:['',[Validators.required]],
      referenceNumber:['',[Validators.required]],
      payment:['',[Validators.required]],
      remark:['']
    })
  }

 
  onSubmit() {
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

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/challan-manager"])
  }
}
