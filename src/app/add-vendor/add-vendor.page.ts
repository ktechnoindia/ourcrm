import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { VendorService,vend } from '../services/vendor.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddVendorPage implements OnInit {
  // form: FormGroup;

  selectTabs='address';
  selectedCountry: any;
  selectedState:any;
  selectedDistrict: any;

  name:string='';
  vendor_code:number | null = null;
  gstin:number | null = null;
  select_group: string = '';
  opening_balance:number | null = null;
  closing_balance:number | null = null;
  mobile:number | null = null;
  whatsapp_number: number | null = null; 
  email:string='';
  country:string='';
  state:string='';
  district:string='';
  pincode:number | null = null;
  address:string='';
  tdn:number | null = null;
  aadhar_no:number | null = null;
  pan_no:number | null = null;
  udhyog_aadhar:number | null = null;
  account_number:number | null = null;
  ifsc_code:number | null = null;
  bank_name:string='';
  branch_name:string='';
  credit_period:number | null = null;
  credit_limit:number | null = null;
  select_sales_person:number | null = null;
  card_number:string='';
  opening_point:number | null = null;
  closing_point:number | null = null;

  submitValue=false;
  countries$:Observable<any[]>
  states$: Observable<any[]>;
  districts$:Observable<any[]>
  myform: any;
  submitted = false;
  
  constructor(private https:HttpClient,private router: Router,private vendService:VendorService,private formBuilder: FormBuilder,private toastController:ToastController,private countryservice: CountryService, private stateservice: StateService,private districtservice:DistrictsService) 
  {
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      vendor_code: ['', [Validators.required, Validators.maxLength(5)]],
      gstin: ['', [Validators.required, Validators.maxLength(15)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      select_group:[''],
      opening_balance:[''],
      closing_balance:[''],
      whatsapp_number:[''],
      country:[''],
      state:[''],
      district:[''],
      pincode:[''],
      address:[''],
      tdn:[''],
      aadhar_no:[''],
      pan_no:[''],
      udhyog_aadhar:[''],
      account_number:[''],
      ifsc_code:[''],
      bank_name:[''],
      branch_name:[''],
      credit_period:[''],
      credit_limit:[''],
      select_sales_person:[''],
      card_number:[''],
      opening_point:[''],
      closing_point:[''],

    });

    this.states$=this.stateservice.getStates(1)
    this.countries$=this.countryservice.getCountries();
    this.districts$=this.districtservice.getDistricts(1);
   }


   onCountryChange() {
    console.log('selected value' + this.selectedCountry);
    this.countries$ = this.countryservice.getCountries();
   }
   onStateChange() {
    console.log('selected value' + this.selectedState);
    this.states$ = this.stateservice.getStates(1);
   }

   onDistrictChange() {
    console.log('selected value' + this.selectedDistrict);
    this.districts$ = this.districtservice.getDistricts(1);
   }
    
   onSubmit(myform: NgForm) {
    // if (this.myform.valid) {
    console.log('Your form data : ', myform.value);
    let venddata:vend={name:myform.value.name,vendor_code:myform.value.vendor_code,gstin:myform.value.gstin,select_group:myform.value.select_group,opening_balance:myform.value.opening_balance,closing_balance:myform.value.closing_balance,mobile:myform.value.mobile,whatsapp_number:myform.value.whatsapp_number,email:myform.value.email,country:myform.value.country,state:myform.value.state,district:myform.value.district,pincode:myform.value.pincode,address:myform.value.address,tdn:myform.value.tdn,aadhar_no:myform.value.aadhar_no,pan_no:myform.value.pan_no,udhyog_aadhar:myform.value.udhyog_aadhar,account_number:myform.value.account_number,ifsc_code:myform.value.ifsc_code,bank_name:myform.value.bank_name,branch_name:myform.value.branch_name,credit_period:myform.value.credit_period,credit_limit:myform.value.credit_limit,select_sales_person:myform.value.select_sales_person,card_number:myform.value.card_number,opening_point:myform.value.opening_point,closing_point:myform.value.closing_point};
    this.vendService.createVendor(venddata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
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
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
}
