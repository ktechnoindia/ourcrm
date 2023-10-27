import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { IndustrytypeService } from '../services/industrytype.service';
import { CgsttypeService } from '../services/cgsttype.service';
import { BusinesstypeService } from '../services/businesstype.service';
import { SegmentService } from '../services/segment.service';
import { FormBuilder } from '@angular/forms';
import { CreatecompanyService, companystore } from '../services/createcompany.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ccstep2',
  templateUrl: './ccstep2.page.html',
  styleUrls: ['./ccstep2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,RouterModule,ReactiveFormsModule]
})
export class Ccstep2Page implements OnInit {

  form:FormGroup;
  tanumber:string='';
  pannumber:string='';

industry$:any;
selectindustry:string = '';
industry!:string;
companytype$:any;
companytype!:string;
businesstype$:any;
businesstype!:string;
segmenttype$:any;
segmenttype!:string;
  company: any;
  

  constructor(private createcompany : CreatecompanyService  ,private router:Router,private formBulider:FormBuilder,private industry1:IndustrytypeService,private cmptype:CgsttypeService,private bustype:BusinesstypeService,private segment1:SegmentService) {
   this.industry$=this.industry1.getindustrytype();
   this.companytype$=this.cmptype.getcgtype();
   this.businesstype$=this.bustype.getbusinesstype();
   this.segmenttype$=this.segment1.getsegments();
   
    this.form= this.formBulider.group({
      industry:['',[Validators.required]],
      businesstype:['',[Validators.required]],
      segmenttype:['',[Validators.required]],
      companytype:['',[Validators.required]],
      gsttax:['',[Validators.required]],
      pannumber:[''],
      tanumber:['']
    })
   }

   onSubmit() {
    console.log('Your form data : ', this.form.value);
    let companydata: companystore = {
      cpyname: this.form.value.cpyname, gstin: this.form.value.gstin, selectedCountry: this.form.value.selectedCountry, selectedState: this.form.value.selectedState, selectedDistrict: this.form.value.selectedDistrict, pinCode: this.form.value.pinCode, address: this.form.value.address, phone: this.form.value.phone, wpnumber: this.form.value.wpnumber, email: this.form.value.email, logo: this.form.value.logo, rdate: this.form.value.rdate,
      industry: this.form.value.industry, businesstype: this.form.value.businesstype, segmenttype: this.form.value.segmenttype, companytype: this.form.value.companytype, pannumber: this.form.value.pannumber, tanno: this.form.value.tanno,
      sales: '',
      purchase: '',
      quotation: '',
      challan: '',
      lms: '',
      amc: '',
      alloftheabove: '',
      language: '',
      currency: '',
      bname: '',
      accno: '',
      ifsc: '',
      branchname: '',
      upiid: ''
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
//   }}

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/createcompany']); 
  }

}