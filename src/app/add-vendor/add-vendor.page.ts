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
  type: string = 'all';
  selectedSalutation: string='';
  companyName: string='';

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
  myform: FormGroup;
  submitted = false;
  
  constructor(private https:HttpClient,private router: Router,private vendService:VendorService,private formBuilder: FormBuilder,private toastController:ToastController,private countryservice: CountryService, private stateservice: StateService,private districtservice:DistrictsService) 
  {
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      vendor_code: ['', [Validators.required, Validators.maxLength(5)]],
      gstin: ['', [Validators.required, Validators.maxLength(15)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      select_group:['',[Validators.required]],
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
      selectedSalutation:[''],
      companyName:['']
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
    
   onSubmit() {
    if (this.myform) {
      this.submitted=true;
    console.log('Your form data : ', this.myform.value);
    let venddata:vend={name:this.myform.value.name,vendor_code:this.myform.value.vendor_code,gstin:this.myform.value.gstin,select_group:this.myform.value.select_group,opening_balance:this.myform.value.opening_balance,closing_balance:this.myform.value.closing_balance,mobile:this.myform.value.mobile,whatsapp_number:this.myform.value.whatsapp_number,email:this.myform.value.email,country:this.myform.value.country,state:this.myform.value.state,district:this.myform.value.district,pincode:this.myform.value.pincode,address:this.myform.value.address,tdn:this.myform.value.tdn,aadhar_no:this.myform.value.aadhar_no,pan_no:this.myform.value.pan_no,udhyog_aadhar:this.myform.value.udhyog_aadhar,account_number:this.myform.value.account_number,ifsc_code:this.myform.value.ifsc_code,bank_name:this.myform.value.bank_name,branch_name:this.myform.value.branch_name,credit_period:this.myform.value.credit_period,credit_limit:this.myform.value.credit_limit,select_sales_person:this.myform.value.select_sales_person,card_number:this.myform.value.card_number,opening_point:this.myform.value.opening_point,closing_point:this.myform.value.closing_point,selectedSalutation:this.myform.value.selectedSalutation,companyName:this.myform.value.companyName};
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
  }
 
}
  
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
}
