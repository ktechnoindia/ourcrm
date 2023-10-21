import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-gst',
  templateUrl: './gst.page.html',
  styleUrls: ['./gst.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class GstPage implements OnInit {

  form:any;
  submitted=false;

  sname:string='';
  gstcode:string='';
  invoicedate:string='';
  invoiceno:string='';
  name:string='';
  customercode:string='';
  phone:string='';
  wpnumber:string='';
  email:string='';
  selectedCountry:string='';
  selectedState:string='';
  selectedDistrict:string='';
  pincode:string='';
  fulladdress:string='';
  
  constructor(private router:Router,private formBuilder:FormBuilder,) { 
    this.form = this.formBuilder.group({
      sname:['',[Validators.required]],
      invoicedate:['',[Validators.required]],
      invoiceno:['',[Validators.required]],
      customercode:['',[Validators.required]],
      selectedCountry:['',[Validators.required]],
      selectedState:['',[Validators.required]],
      selectedDistrict:['',[Validators.required]],
      fulladdress:['',[Validators.required]],
      wpnumber: [''],
      name:[''],
      phone:[''],
      email:[''],
      gstcode:[''],
      pincode:['']
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
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}
