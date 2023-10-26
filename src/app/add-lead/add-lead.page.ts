import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { LeadService ,leadstore } from '../services/lead.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
@Component({ 
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddLeadPage {
  form: FormGroup;
  submitted = false;

  catPerson:string='';
  phone:string='';
  selectedCountry:string='';
  // selectedState:string='';
  // selectedDistrict:string='';
  pncode:string='';
  fulladdress:string='';
  whatshappnumber:string='';
  emails:string='';
  lscore:string='';
  lassign:string='';
  rmark:string='';

  selectedState: any;
  selectedDistrict: any;

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>

  constructor(private router:Router,private formBuilder: FormBuilder, private leadmanage : LeadService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService
   ) {

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);

    this.form = this.formBuilder.group({
      catPerson: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      selectedCountry: ['', [Validators.required]],
      selectedState: ['', [Validators.required]],
      selectedDistrict: ['', [Validators.required]],
      fulladdress:['',[Validators.required]],
      lscore:['',[Validators.required]],
      lassign:['',[Validators.required]],
      pncode:[''],
      whatshappnumber:[''],
      emails:[''],
      rmark:[''],

    });
   
  }
  onCountryChange() {
    console.log('selected value' + this.selectedCountry);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.selectedState);
    this.districts$ = this.districtservice.getDistricts(this.selectedState);
  }

  loadCountries() {
    // this.countryService.getCountries().subscribe(
    //   (data) => {
    //      console.log(data);

    //     if (Array.isArray(data)) {
    //       this.countries = data;
    //     } else {
    //       console.error('API did not return an array of countries.');
    //     }

    //   },
    //   (error) => {
    //     console.error('Error loading countries:', error);

    //     if (error instanceof HttpErrorResponse) {
    //       const errorMessage = 'HTTP Error occurred during the API request.';
    //       console.error(errorMessage);

    //       console.error('Status Code:', error.status);
    //     } else {
    //       console.error('Non-HTTP error occurred during the API request.');
    //     }
    //   }
    // );
  }

  onSubmit() {
    if(this.form){
    console.log('Your form data : ', this.form.value);
    let leaddata:leadstore={catPerson:this.form.value.catPerson,phone:this.form.value.phone,whatshappnumber:this.form.value.whatshappnumber,emails:this.form.value.emails,selectedCountry:this.form.value.selectedCountry,selectedState:this.form.value.selectedState,selectedDistrict:this.form.value.selectedDistrict,pncode:this.form.value.pncode,fulladdress:this.form.value.fulladdress,lscore:this.form.value.lscore,lassign:this.form.value.lassign,rmark:this.form.value.rmark};

    this.leadmanage.createLead(leaddata,'','').subscribe(
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


    // if (this.form.valid) {
    //   console.log('Form submitted:', this.form.value);
    // } else {
    //   // If the form is not valid, display error messages
    //   Object.keys(this.form.controls).forEach(controlName => {
    //     const control = this.form.get(controlName);
    //     if (control.invalid) {
    //       control.markAsTouched();
    //     }
    //   });
    // }
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

  
}
