import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
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
  copyData: boolean = false;
  @ViewChild('firstInvalidInput') firstInvalidInput: any;

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
  tanumber: string = '';
  pannumber: string = '';
  industry$: any;
  industry: number = 0;
  companytype$: any;
  companytype: number = 0;
  businesstype$: any;
  businesstype: number = 0;
  segmenttype$: any;
  segmenttype: number = 0;

  //step : 3 
  language: number = 0;
  currency: number = 0;

  sales: boolean=false;
  purchase: boolean=false;
  quotation: boolean=false;
  lms: boolean=false;
  challan: boolean=false;
  amc: boolean=false;
  alloftheabove: boolean=false;
  submitted = false;

  //step : 4
  bname: string = '';
  accno: string = '';
  ifsc: string = '';
  branchname: string = '';
  upiid: string = '';
  bankForm: string = '';

  constructor(private navCtrl: NavController,private createcompany: CreatecompanyService, private formService: FormValidationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, private country: CountryService, private state: StateService, private districts: DistrictsService
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
    this.rdate = new Date().toISOString().split('T')[0]; 


    this.form = this.formBuilder.group({
      selectedCountry: [''],
      selectedState: [''],
      selectedDistrict: [''],
      address: [''],
      phone: ['', [Validators.maxLength(10)]],
      cpyname: ['', [Validators.required]],
      email: ['', [Validators.email]],
      rdate: [''],
      wpnumber: [''],
      pinCode: ['',[Validators.pattern(/^[1-9][0-9]{5}$/)],],
      tanno: [''],
      gstin: ['',[Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      logo: [''],
      website: [''],
      website1: [''],
      selectedState1: [''],
      selectedDistrict1: [''],
      selectedCountry1: [''],
      email1: ['', [Validators.email]],
      wpnumber1: [''],
      phone1: [''],
      address1: [''],
      pinCode1: [''],

      //step:2
      industry: [''],
      businesstype: [''],
      segmenttype: [''],
      companytype: [''],
      pannumber: ['',[Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      tanumber: ['', [Validators.pattern(/^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/)]],

      //step: 3
      language: [''],
      currency: [''],
      sales: [false],
      purchase: [false],
      quotation: [false],
      challan: [false],
      lms: [false],
      amc: [false],
      alloftheabove: [false],

      //step : 4
      bname: [''],
      accno: ['', [Validators.pattern(/^\d+$/)]],
      ifsc: ['', [Validators.pattern(/^[A-Za-z]{4}\d{7}$/)]],
      branchname: [''],
      upiid: ['', [Validators.pattern(/^[\w\d._-]+@[\w\d.-]+\.[\w]{2,}$/)]],
      copyData:[false]
    })

  }

  onAllOfTheAboveChange() {
    const allOfTheAboveValue = this.form.get('alloftheabove')?.value;

    // Set all other checkboxes to the value of "All Of The Above"
    this.form.patchValue({
      sales: allOfTheAboveValue,
      purchase: allOfTheAboveValue,
      quotation: allOfTheAboveValue,
      challan: allOfTheAboveValue,
      lms: allOfTheAboveValue,
      amc: allOfTheAboveValue,
    });
  }

  onCheckboxChange() {
    // Check if all individual checkboxes are selected
    const allSelected = this.sales && this.purchase && this.quotation && this.challan && this.lms && this.amc /* && other checkboxes */;
    
    // Update the "All Of The Above" checkbox based on the selection
    this.alloftheabove = allSelected;
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
    const fields = { cpyname: this.cpyname }
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
          this.formService.showSaveLoader()
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
          this.form.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showSaveLoader
            ()
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 1000);


        }
      );
    } else {
      //If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
    if (this.firstInvalidInput) {
      this.firstInvalidInput.setFocus();
    }

  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  onNew() {
    location.reload();
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
  onCopyboxChange() {
    if (this.copyData) {
      // Copy values from the first row to the second row
      this.selectedCountry1 = this.selectedCountry;
      this.selectedState1 = this.selectedState;
      this.selectedDistrict1 = this.selectedDistrict;
      this.pinCode1 = this.pinCode;
      this.address1 = this.address;
      this.phone1 = this.phone;
      this.wpnumber1 = this.wpnumber;
      this.email1 = this.email;
      this.website1 = this.website;
    } else {
      // Clear values in the second row
      this.selectedCountry1 = 0;
      this.selectedState1 = 0;
      this.selectedDistrict1 = 0;
      this.pinCode1 = '';
      this.address1 = '';
      this.phone1 = '';
      this.wpnumber1 = '';
      this.email1 = '';
      this.website1 = '';
    }
}
}