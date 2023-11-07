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
import { IndustrytypeService } from '../services/industrytype.service';
import { CgsttypeService } from '../services/cgsttype.service';
import { BusinesstypeService } from '../services/businesstype.service';
import { SegmentService } from '../services/segment.service';
import { FormValidationService } from '../form-validation.service';
@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
  providers: [DatePipe],

})
export class CreatecompanyPage implements OnInit {
  //buttons function
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;



  form: FormGroup;
  rdate: string = '';
  selectedState: number = 0;
  selectedDistrict: number = 0;
  selectedCountry: number = 0;
  email: string = '';
  wpnumber: string = '';
  phone: string = '';
  address: string = '';
  pinCode: string = '';
  gstin: string = '';
  cpyname: string = '';
  logo: string = '';
  website: string = '';
  selectedState1: number = 0;
  selectedDistrict1: number = 0;
  selectedCountry1: number = 0;
  email1: string = '';
  wpnumber1: string = '';
  phone1: string = '';
  address1: string = '';
  pinCode1: string = '';
  website1: string = '';

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  countryService: any;
  districtservice: any;
  stateservice: any;
  company: any;

  //Step: 2
  tanno: string = '';
  pannumber: string = '';

  industry:number= 1;;
  industry$: any;
  companytype$: any;
  companytype:  number= 1;
  businesstype$: any;
  businesstype: number= 1;
  segmenttype$: any;
  segmenttype:number= 1;

  //step : 3 
  language: number = 0;
  currency: number = 0;
  sales: string = '';
  purchase: string = '';
  quotation: string = '';
  lms: string = '';
  challan: string = '';
  amc: string = '';
  alloftheabove: string = '';
  submitted = false;

  //step : 4
  bname: string = '';
  accno: string = '';
  ifsc: string = '';
  branchname: string = '';
  upiid: string = '';
  bankForm: string = '';

  constructor(private createcompany: CreatecompanyService, private formService:FormValidationService,private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, private country: CountryService, private state: StateService, private districts: DistrictsService
    , private industry1: IndustrytypeService, private cmptype: CgsttypeService, private bustype: BusinesstypeService, private segment1: SegmentService) {
    // this.rdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString();
    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.country.getCountries();
    this.districts$ = this.districts.getDistricts(1);

    //step:2
    this.industry$ = this.industry1.getindustrytype();
    this.companytype$ = this.cmptype.getcgtype();
    this.businesstype$ = this.bustype.getbusinesstype();
    this.segmenttype$ = this.segment1.getsegments();



    this.form = this.formBuilder.group({
      selectedCountry: ['', ],
      selectedState: ['', ],
      selectedDistrict: ['',],
      address: ['', ],
      phone: ['', [Validators.maxLength(10)]],
      cpyname: ['', [Validators.required]],
      email: [''],
      rdate: [''],
      wpnumber: [''],
      pinCode: [''],
      tanno: [''],
      gstin: [''],
      logo: [''],
      website: [''],
      website1: [''],
      selectedState1: [''],
      selectedDistrict1: [''],
      selectedCountry1: [''],
      email1: [''],
      wpnumber1: [''],
      phone1: [''],
      address1: [''],
      pinCode1: [''],

      //step:2
      industry: ['', ],
      businesstype: ['', ],
      segmenttype: ['', ],
      companytype: ['', ],
      pannumber: [''],
     

      //step: 3
      language: ['', ],
      currency: ['',],
      sales: [''],
      purchase: [''],
      quotation: [''],
      lms: [''],
      challan: [''],
      amc: [''],
      alloftheabove: [''],

      //step : 4
      bname: ['', ],
      accno: [''],
      ifsc: [''],
      branchname: [''],
      upiid: [''],

    })

  }
  ngOnInit() {

  }
  //Buttons function
  toggleStep1() {
    this.step1 = !this.step1;
  }
  toggleStep2() {
    this.step2 = !this.step2;
  }
  toggleStep3() {
    this.step3 = !this.step3;
  }

 async onSubmit() {
  const fields = {cpyname:this.cpyname}
  const isValid = await this.formService.validateForm(fields);
  if (await this.formService.validateForm(fields)) {
    console.log('Your form data : ', this.form.value);
    let companydata: companystore = {
      cpyname: this.form.value.cpyname, gstin: this.form.value.gstin, selectedCountry: this.form.value.selectedCountry, selectedState: this.form.value.selectedState, selectedDistrict: this.form.value.selectedDistrict, pinCode: this.form.value.pinCode, address: this.form.value.address, phone: this.form.value.phone, wpnumber: this.form.value.wpnumber, email: this.form.value.email, logo: this.form.value.logo, rdate: this.form.value.rdate, website: this.form.value.website, website1: this.form.value.website1, selectedCountry1: this.form.value.selectedCountry1, selectedState1: this.form.value.selectedState1, selectedDistrict1: this.form.value.selectedDistrict1, pinCode1: this.form.value.pinCode1, address1: this.form.value.address1, phone1: this.form.value.phone1, wpnumber1: this.form.value.wpnumber1, email1: this.form.value.email1,
      industry: this.form.value.industry, businesstype: this.form.value.businesstype, segmenttype: this.form.value.segmenttype, companytype: this.form.value.companytype, pannumber: this.form.value.pannumber, tanno: this.form.value.tanno,
      sales: this.form.value.sales, purchase: this.form.value.purchase, quotation: this.form.value.quotation, challan: this.form.value.challan, lms: this.form.value.lms, amc: this.form.value.amc, alloftheabove: this.form.value.alloftheabove, language: this.form.value.language, currency: this.form.value.currency,
      bname: this.form.value.bname, accno: this.form.value.accno, ifsc: this.form.value.ifsc, branchname: this.form.value.branchname, upiid: this.form.value.upiid,
    };

    this.createcompany.createCompany(companydata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
      },
      (error: any) => {
        console.error('POST request failed', error);
      }
    );
    setTimeout(() => {
      this.form.reset();
    }, 3000);
     }else {
    //If the form is not valid, display error messages
       Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
       if (control?.invalid) {
       control.markAsTouched();
       }
     });
    }
  }
  onCountryChange() {
    console.log('selected value' + this.selectedCountry);
    this.states$ = this.state.getStates(1);
    //  this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.selectedState);
    this.districts$ = this.districts.getDistricts(this.selectedState);
  }

  getCurrentDate() {
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