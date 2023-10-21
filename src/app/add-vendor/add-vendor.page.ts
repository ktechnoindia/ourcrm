import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddVendorPage implements OnInit {
  // form: FormGroup;

  selectTabs='address';
  selectedCountry: any;
  selectedState:any;
  selectedDistrict: any;

  cname:string='';
  vendorcode:number | null = null;
  gstin:number | null = null;
  selectedOption: string = '';
  openingbalance:number | null = null;
  closingbalance:number | null = null;
  phone:number | null = null;
  whatshappnumber: number | null = null; 
  email:string='';
  pincode:number | null = null;
  fullname:string='';
  taxnumber:number | null = null;
  adharnumber:number | null = null;
  panumber:number | null = null;
  udayognumber:number | null = null;
  accountnumber:number | null = null;
  ifsc:number | null = null;
  bankname:string='';
  branchname:string='';
  creditperiod:number | null = null;
  creditlimit:number | null = null;
  cardnumber:number | null = null;
  openingpoint:number | null = null;
  closingpoint:number | null = null;

  submitValue=false;
  countries$:Observable<any[]>
  states$: Observable<any[]>;
  districts$:Observable<any[]>
  form: any;
  submitted = false;
  
  constructor(private router: Router,private formBuilder: FormBuilder,private toastController:ToastController,private countryservice: CountryService, private stateservice: StateService,private districtservice:DistrictsService) 
  {
    this.form = this.formBuilder.group({
      cname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      vendorcode: ['', [Validators.required, Validators.maxLength(5)]],
      gstin: ['', [Validators.required, Validators.maxLength(15)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      state:['',[Validators.required]],
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
      if (this.form.valid) {
        console.log('Form submitted:', this.form.value);
      } else {
        // If the form is not valid, display error messages
        Object.keys(this.form.controls).forEach(controlName => {
          const control = this.form.get(controlName);
          if (control.invalid) {
            control.markAsTouched();
          }
        });
      }
    }
  
 


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }
}
