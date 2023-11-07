import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { LeadService ,leadstore } from '../services/lead.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { LeadsourceService } from '../services/leadsource.service';
import { FormValidationService } from '../form-validation.service';
import { ExecutiveService } from '../services/executive.service';


@Component({ 
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,RouterModule]
})
export class AddLeadPage {
  form: FormGroup;
  submitted = false;

  catPerson:string='';
  phone:string='';
  selectedCountry:number=0;
  // selectedState:string='';
  // selectedDistrict:string='';
  pncode:string='';
  fulladdress:string='';
  whatshappnumber:string='';
  emails:string='';
  lscore:string='';
  lassign:string='';
  rmark:string='';
  selectpd:string='';

  selectedState: number=0;
  selectedDistrict: number=0;

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  leadsourcetype$: any;
  leadsourcetype!: string;
  select_sales_person:number=0;
  executive$: any;
  executive: string='';


  constructor(private execut: ExecutiveService, private router:Router,private formBuilder: FormBuilder,private formService: FormValidationService,private leadSourceService:LeadsourceService, private leadmanage : LeadService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService
   ) {

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.leadsourcetype$ = this.leadSourceService.getleadsourcetype();
    this.executive$ = this.execut.getexecutive();

    this.form = this.formBuilder.group({
      catPerson: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      selectedCountry: ['', [Validators.required]],
      selectedState: ['', [Validators.required]],
      selectedDistrict: ['', [Validators.required]],
      fulladdress:['',[Validators.required]],
      lscore:['',[Validators.required]],
      select_sales_person:['',[Validators.required]],
      pncode:[''],
      whatshappnumber:[''],
      emails:[''],
      rmark:[''],
      selectpd:[''],

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

  
 async onSubmit() {
    const fields = {catPerson:this.catPerson,phone:this.phone,selectedCountry:this.selectedCountry,selectedState:this.selectedState,selectedDistrict:this.selectedDistrict,fulladdress:this.fulladdress,lscore:this.lscore,selectpd:this.selectpd}

    const isValid = await this.formService.validateForm(fields);
    if(await this.formService.validateForm(fields)){
      
    console.log('Your form data : ', this.form.value);
    let leaddata:leadstore={catPerson:this.form.value.catPerson,phone:this.form.value.phone,whatshappnumber:this.form.value.whatshappnumber,emails:this.form.value.emails,selectedCountry:this.form.value.selectedCountry,selectedState:this.form.value.selectedState,selectedDistrict:this.form.value.selectedDistrict,pncode:this.form.value.pncode,fulladdress:this.form.value.fulladdress,lscore:this.form.value.lscore,select_sales_person:this.form.value.select_sales_person,rmark:this.form.value.rmark};

    this.leadmanage.createLead(leaddata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
       this.formService.showSuccessAlert();
      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
    setTimeout(() => {
      this.form.reset();
    }, 1000);
    } else {
        // If the form is not valid, display error messages
        Object.keys(this.form.controls).forEach(controlName => {
          const control = this.form.get(controlName);
          if (control?.invalid) {
            control.markAsTouched();
          }
        });
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
