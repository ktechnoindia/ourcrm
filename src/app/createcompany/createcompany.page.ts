import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { NgForm } from '@angular/forms';
import { CreatecompanyService, companystore } from '../services/createcompany.service';
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
  providers: [DatePipe],

})
export class CreatecompanyPage implements OnInit {

  form:any;

  rdate:string ='' ;
  selectedState: any;
  selectedDistrict:any;
  selectedCountry: string = '';
  email:string='';
  wpnumber:string='';
  phone:string='';
  address:string='';
  pinCode:string='';
  gstin:string='';
  cpyname:string='';
logo:string='';

  countries$:Observable<any[]>
  states$:Observable<any[]>
  districts$:Observable<any[]>
  countryService: any;
  districtservice: any;
  stateservice: any;
  company: any;
  constructor(private createcompany : CreatecompanyService  , private router:Router,private formBuilder:FormBuilder,private datePipe: DatePipe,private country:CountryService,private state:StateService,private districts:DistrictsService
    ) 
    {
      // this.rdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString();
      this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
      this.countries$=this.country.getCountries();
      this.districts$=this.districts.getDistricts(1);

      this.form = this.formBuilder.group({
        selectedCountry:['',[Validators.required]],
        selectedState:['',[Validators.required]],
        selectedDistrict:['',[Validators.required]],
        address:['',[Validators.required]],
        phone:['',[Validators.required]],
        cpyname:['',[Validators.required]],
        email:[''],
        rdate:[''],
        wpnumber:[''],
        pinCode:[''],
        gstin:[''],
     })
    
  }
  ngOnInit() {
    
  }
  
  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let companydata: companystore = {
      cpyname: myform.value.cpyname, gstin: myform.value.gstin, selectedCountry: myform.value.selectedCountry, selectedState: myform.value.selectedState, selectedDistrict: myform.value.selectedDistrict, pinCode: myform.value.pinCode, address: myform.value.address, phone: myform.value.phone, wpnumber: myform.value.wpnumber, email: myform.value.email, logo: myform.value.logo, rdate: myform.value.rdate,
      industry: '',
      businesstype: '',
      segmenttype: '',
      companytype: '',
      pannumber: '',
      tanno: '',
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





  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log('Selected Value' + this.form.value);
  //   } else {
  //     Object.keys(this.form.controls).forEach(controlName => {
  //       const control = this.form.get(controlName);
  //       if (control.invalid) {
  //         control.markAsTouched();
  //       }
  //     })
  //   }
  // }
    }
     onCountryChange() {
      console.log('selected value' + this.selectedCountry);
      this.states$ = this.state.getStates(1);this.states$ = this.stateservice.getStates(1);
     }
     onStateChange() {
      console.log('selected value' + this.selectedState);
      this.districts$ = this.districts.getDistricts(this.selectedState);
     }
   
     getCurrentDate(){
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
 
  goBack() {
    this.router.navigate(['/master']);
  }

}