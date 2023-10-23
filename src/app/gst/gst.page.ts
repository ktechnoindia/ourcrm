import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import  {GstService,gststore} from '../services/gst.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.page.html',
  styleUrls: ['./gst.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class GstPage implements OnInit {

  myform:FormGroup;
  submitted=false;

  service_name:string='';
  gst_code:string='';
  invoice_date:string='';
  invoice_number:string='';
  customer_code:string='';
  phone_number:string='';
  whatshapp_number:string='';
  email:string='';
  name:string='';
  selectedCountry:string='';
  selectedState:string='';
  selectedDistrict:string='';
  pin_code:string='';
  address:string='';
  
  constructor(private router:Router,private gstService:GstService,private formBuilder:FormBuilder,) { 
    this.myform = this.formBuilder.group({
      service_name:['',[Validators.required]],
      invoice_date:['',[Validators.required]],
      invoice_number:['',[Validators.required]],
      customer_code:['',[Validators.required]],
      selectedCountry:['',[Validators.required]],
      selectedState:['',[Validators.required]],
      selectedDistrict:['',[Validators.required]],
      address:['',[Validators.required]],
      whatshapp_number: [''],
      name:[''],
      phone_number:[''],
      email:[''],
      gst_code:[''],
      pin_code:['']
    })
  }

  onSubmit(myform: any) {
    // if (this.myform) {
    console.log('Your form data : ', myform.value);
    let gstdata:gststore={
      service_name: myform.value.service_name, invoice_date: myform.value.invoice_date, invoice_number: myform.value.invoice_number, customer_code: myform.value.customer_code, selectedCountry: myform.value.selectedCountry, selectedState: myform.value.selectedState, selectedDistrict: myform.value.selectedDistrict,
      gst_code: myform.value.gst_code,
      phone_number: myform.value.phone_number,
      whatshapp_number: myform.value.whatsapp_number,
      email: myform.value.email,
      name: myform.value.name,
      pin_code: myform.value.pin_code,
      address: myform.value.address
    };
    this.gstService.createGst(gstdata,'','').subscribe(
     (response:any) => {
          console.log('POST Request falied',response);
     },
     (error:any) => {
          console.log('POST Request falied',error);
     }
    )
  // } else {
  //   Object.keys(this.myform.controls).forEach(controlName => {
  //     const control = this.myform.get(controlName);
  //     if (control.invalid) {
  //       control.markAsTouched();
  //     }
  //   })
  // }
}

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}
