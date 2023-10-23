import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.page.html',
  styleUrls: ['./editinfo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditinfoPage implements OnInit {

  myform: any;
  submitted = false;

  company_name: string = '';
  gstin: string = '';
  country: string = '';
  state: string = '';
  district: string = '';
  address: string = '';
  pincode: string = '';
  mobile_number: string = '';
  whatsap_number: string = '';
  email: string = '';

  constructor(private router: Router, private formBuiler: FormBuilder) {
    this.myform = this.formBuiler.group({
      company_name: ['', [Validators.required]],
      gstin: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pincode: [''],
      mobile_number: ['', [Validators.required]],
      whatsap_number: [''],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit(data: any) {
    if (this.myform.valid) {
      console.log('Selected Value' + this.myform.value);
    } else {
      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
        if (control.invalid) {
          control.markAsTouched();
        }
      })
    }
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']);
  }

}