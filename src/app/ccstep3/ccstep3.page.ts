import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatecompanyService, companystore } from '../services/createcompany.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ccstep3',
  templateUrl: './ccstep3.page.html',
  styleUrls: ['./ccstep3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule,ReactiveFormsModule]
})
export class Ccstep3Page implements OnInit {

  module:string='';
  language:string='';
  currency:string='';
  sales:string='';
  purchase:string='';
  quotation:string='';
  lms:string='';
  challan:string='';
  amc:string='';
  alloftheabove:string='';


  form:FormGroup;
  submitted=false;
  company: any;

  constructor(private createcompany : CreatecompanyService ,private router:Router,private formBuilder:FormBuilder) { 
    this.form= this.formBuilder.group({
      module:['',[Validators.required]],
      language:['',[Validators.required]],
      currency:['',[Validators.required]],
      sales:[''],
      purchase:[''],
      quotation:[''],
      lms:[''],
      challan:[''],
      amc:[''],
      alloftheabove:[''],
    })
  }
  onSubmit() {
    console.log('Your form data : ', this.form.value);
    let companydata: companystore = {
      cpyname: this.form.value.cpyname, gstin: this.form.value.gstin, selectedCountry: this.form.value.selectedCountry, selectedState: this.form.value.selectedState, selectedDistrict: this.form.value.selectedDistrict, pinCode: this.form.value.pinCode, address: this.form.value.address, phone: this.form.value.phone, wpnumber: this.form.value.wpnumber, email: this.form.value.email, logo: this.form.value.logo, rdate: this.form.value.rdate,
      industry: this.form.value.industry, businesstype: this.form.value.businesstype, segmenttype: this.form.value.segmenttype, companytype: this.form.value.companytype, pannumber: this.form.value.pannumber, tanno: this.form.value.tanno, sales: this.form.value.sales, purchase: this.form.value.purchase, quotation: this.form.value.quotation, challan: this.form.value.challan, lms: this.form.value.lms, amc: this.form.value.amc, alloftheabove: this.form.value.alloftheabove, language: this.form.value.language, currency: this.form.value.currency,
      bname: '',
      accno: '',
      ifsc: '',
      branchname: '',
      upiid: '',
      website: ''
    };
    this.createcompany.createcomapany(companydata, '', '').subscribe(
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



  // onSubmit(){
  //   if(this.form.valid){
  //     console.log('selected Value'+ this.form.value);
  //   }else{
  //     Object.keys(this.form.controls).forEach(controlName =>{
  //       const control = this.form.get(controlName);
  //       if(control.invalid){
  //         control.markAsTouched();
  //       }
  //     })
  //   }
  // }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/ccstep2']); 
  }

}