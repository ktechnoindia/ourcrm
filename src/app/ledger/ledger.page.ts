import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { CustomertypeService } from '../services/customertype.service';
import { ExecutiveService } from '../services/executive.service';
import { LegderService, ledg } from '../services/ledger.service';
import { FormValidationService } from '../form-validation.service';
import { AddgroupService } from '../services/addgroup.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, HttpClientModule, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LedgerPage implements OnInit {

  selectedSalutation: string = '';
  companyName: string = '';
  selectTabs = 'address';
  activeSegment: string = '';
  selectedPage: string = 'page1';
copyData:boolean=false;
  country: number = 0;
  state: number = 0;
  district: number = 0;
  lname: string = '';
  // lcode: number=0;
  ledger_code: string = '';
  selectedOption: number = 0;
  opening_balance: number = 0;
  closing_balance: number = 0;
  mobile: string = '';
  whatsapp_number: string = '';
  address: string = '';
  gstin: string = '';
  email: string = '';
  select_sales_person: string = '';
  pincode: string = '';
  tdn: string = '';
  aadhar_no: string = '';
  pan_no: string = '';
  udhyog_aadhar: string = '';
  account_number: string = "";
  ifsc_code: string = '';
  bank_name: string = '';
  branch_name: string = '';
  credit_period: number = 0;
  credit_limit: number = 0;
  card_number: string = '';
  opening_point: number = 0;
  closing_point: number = 0;
  lgroup_name: string = '';

  country1: number = 0;
  state1: number = 0;
  district1: number = 0;
  pincode1: string = '';
  address1: string = '';
  phoneData:boolean=false;
  submitValue = false;
  // selectedOption:string='';
  //countries: any[] = [];
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  menuController: any;
  custtype$: any;
  custtype!: string;
  executive$: any;
  executive!: string;
  myform: FormGroup;
  form: any;
  itemgroups$: Observable<any>;

  discount: number = 0;

  constructor(private navCtrl: NavController,private toastController: ToastController, private formService: FormValidationService, private https: HttpClient, private formBuilder: FormBuilder, private custtp: CustomertypeService, private execut: ExecutiveService, private ledger: LegderService, private router: Router, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private groupService: AddgroupService) {
    this.myform = this.formBuilder.group({
      lname: ['', [Validators.required,]],
      ledger_code: ['', [Validators.required, Validators.maxLength(10)]],
      gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      mobile: ['', [Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      lgroup_name: [''].toString(),
      opening_balance: [''],
      closing_balance: [''],
      whatsapp_number: ['', [Validators.maxLength(10)]],
      country: [''],
      state: [''],
      district: [''],
      pincode: [''],
      address: [''],
      discount: [''],
      tdn: ['', Validators.pattern(/^\d{10}$/),], // TDN validation for 10 digits
      aadhar_no: ['', Validators.pattern(/^\d{12}$/)], // Aadhar number validation for 12 digits
      pan_no: ['', Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/)], // PAN number validation
      udhyog_aadhar: ['', Validators.pattern(/^\d{12}$/)], // Udyog Aadhar number validation for 12 digits
      account_number: ['', Validators.pattern(/^\d{9,18}$/)], // Account number validation (between 9 and 18 digits)
      ifsc_code: ['', Validators.pattern(/^[A-Za-z]{4}\d{7}$/)], // IFSC code validation (4 alphabets + 7 digits)
      bank_name: [''],
      branch_name: [''],
      credit_period: [''],
      credit_limit: [''],
      select_sales_person: [''],
      card_number: [''],
      opening_point: [''],
      closing_point: [''],
      selectedSalutation: [''],
      companyName: [''],
      country1: [''],
      state1: [''],
      district1: [''],
      pincode1: [''],
      address1: [''],
      selectedOption: [''],
      selectedState: [''],
      selectedDistrict: [''],
      selectedOption1: [''],
      selectedState1: [''],
      selectedDistrict1: [''],
      copyData:[false],
      phoneData:[false]
    });
    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.custtype$ = this.custtp.getcustomertype();
    this.executive$ = this.execut.getexecutive();
    this.itemgroups$ = this.groupService.getAllGroups(1);
  }
  ngOnInit() {
  }
  onCountryChange() {
    console.log('selected value' + this.selectedOption);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.state);
    this.districts$ = this.districtservice.getDistricts(this.state);
  }
  onDistrictChange() {
    console.log('selected value' + this.district);
    this.districts$ = this.districtservice.getDistricts(1);
  }

  goBack() {
    this.router.navigate(['/master']);
  }

  async onSubmit() {

    const fields = { lname: this.lname, ledger_code: this.ledger_code }
    const isValid = await this.formService.validateForm(fields);
    if (isValid) {

      console.log('Your form data : ', this.myform.value);
      let ledgerdata: ledg = { lname: this.myform.value.lname, ledger_code: this.myform.value.ledger_code, gstin: this.myform.value.gstin, lgroup_name: this.myform.value.lgroup_name.toString(), opening_balance: this.myform.value.opening_balance, closing_balance: this.myform.value.closing_balance, mobile: this.myform.value.mobile, whatsapp_number: this.myform.value.whatsapp_number, email: this.myform.value.email, country: this.myform.value.country, state: this.myform.value.state, district: this.myform.value.district, pincode: this.myform.value.pincode, address: this.myform.value.address, account_number: this.myform.value.account_number, ifsc_code: this.myform.value.ifsc_code, bank_name: this.myform.value.bank_name, branch_name: this.myform.value.branch_name, select_sales_person: this.myform.value.select_sales_person, card_number: this.myform.value.card_number, opening_point: this.myform.value.opening_point, closing_point: this.myform.value.closing_point, selectedSalutation: this.myform.value.selectedSalutation, companyName: this.myform.value.companyName, country1: this.myform.value.country1, state1: this.myform.value.state1, district1: this.myform.value.district1, pincode1: this.myform.value.pincode1, address1: this.myform.value.address1, tdn: this.myform.value.tdn, aadhar_no: this.myform.value.aadhar_no, pan_no: this.myform.value.pan_no, udhyog_aadhar: this.myform.value.udhyog_aadhar, credit_limit: this.myform.value.credit_limit, credit_period: this.myform.value.credit_period, companyid: 1,
        discount:this.myform.value.discount, };
      this.ledger.createLdeger(ledgerdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
          this.myform.reset();

        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
    } else {
      //If the form is not valid, display error messages
      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  onNew(){
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  toggleSegment(segment: string) {
    this.activeSegment = segment;
  }

  closeMenu() {
    this.menuController.close(); // Close the menu
  }
  limitInputLength($event: { target: { value: string | any[]; }; preventDefault: () => void; }, maxLength = 10) {
    if ($event.target.value.length >= maxLength) {
      $event.preventDefault();
      return;
    }
  }
  limitInputLength1($event: { target: { value: string | any[]; }; preventDefault: () => void; }, maxLength = 20) {
    if ($event.target.value.length >= maxLength) {
      $event.preventDefault();
      return;
    }
  }

  onCopyboxChange() {
    if (this.copyData) {
      // Copy values from the first row to the second row
      this.country1 = this.country;
      this.state1 = this.state;
      this.district1 = this.district;
      this.pincode1 = this.pincode;
      this.address1 = this.address;
    } else {
      // Clear values in the second row
      this.country1 = 0;
      this.state1 = 0;
      this.district1 = 0;
      this.pincode1 = '';
      this.address1 = '';
    }
  }

  onWhatshappCheck(){
    if(this.phoneData){
    this.whatsapp_number = this.mobile;
  }else{
this.whatsapp_number='';
  }
}
}

