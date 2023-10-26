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


  form:any;
  submitted=false;
  company: any;

  constructor(private createcompany : CreatecompanyService ,private router:Router,private formBuilder:FormBuilder) { 
    this.form= this.formBuilder.group({
      module:['',[Validators.required]],
      language:['',[Validators.required]],
      currency:['',[Validators.required]],
     
    })
  }
  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let companydata: companystore = {
      cpyname: myform.value.cpyname, gstin: myform.value.gstin, selectedCountry: myform.value.selectedCountry, selectedState: myform.value.selectedState, selectedDistrict: myform.value.selectedDistrict, pinCode: myform.value.pinCode, address: myform.value.address, phone: myform.value.phone, wpnumber: myform.value.wpnumber, email: myform.value.email, logo: myform.value.logo, rdate: myform.value.rdate,
      industry: myform.value.industry, businesstype: myform.value.businesstype, segmenttype: myform.value.segmenttype, companytype: myform.value.companytype, pannumber: myform.value.pannumber, tanno: myform.value.tanno, sales: myform.value.sales, purchase: myform.value.purchase, quotation: myform.value.quotation, challan: myform.value.challan, lms: myform.value.lms, amc: myform.value.amc, alloftheabove: myform.value.alloftheabove, language: myform.value.language, currency: myform.value.currency,
      bname: '',
      accno: '',
      ifsc: '',
      branchname: '',
      upiid: ''
    };
    this.company.createcompany(companydata, '', '').subscribe(
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