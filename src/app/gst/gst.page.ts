import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import  {GstService,gststore} from '../services/gst.service';
import { FormValidationService } from '../form-validation.service';
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
  
  constructor(private navCtrl: NavController,private router:Router,private gstService:GstService,private formService:FormValidationService,private formBuilder:FormBuilder,) { 
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

  onNew() {
    location.reload();
  }
   onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  async onSubmit() {
    const fields = {service_name:this.service_name,gst_code:this.gst_code,selectedState:this.selectedState,phone_number:this.phone_number,}
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
    console.log('Your form data : ', this.myform.value);
    let gstdata:gststore={
      service_name: this.myform.value.service_name, invoice_date: this.myform.value.invoice_date, invoice_number: this.myform.value.invoice_number, customer_code: this.myform.value.customer_code, selectedCountry: this.myform.value.selectedCountry, selectedState: this.myform.value.selectedState, selectedDistrict: this.myform.value.selectedDistrict,
      gst_code: this.myform.value.gst_code,
      phone_number: this.myform.value.phone_number,
      whatshapp_number: this.myform.value.whatsapp_number,
      email: this.myform.value.email,
      name: this.myform.value.name,
      pin_code: this.myform.value.pin_code,
      address: this.myform.value.address
    };
    this.gstService.createGst(gstdata,'','').subscribe(
     (response:any) => {
          console.log('POST Request falied',response);
          this.formService.showSuccessAlert();
     },
     (error:any) => {
          console.log('POST Request falied',error);
          this.formService.showFailedAlert();
     }
    );
    setTimeout(() => {
      // Reset the form and clear input fields
      this.myform.reset()
    }, 1000);
   } 
  else {
    Object.keys(this.myform.controls).forEach(controlName => {
      const control = this.myform.get(controlName);
      if (control?.invalid) {
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
