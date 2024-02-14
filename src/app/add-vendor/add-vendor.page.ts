import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonPopover, IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { VendorService, vend } from '../services/vendor.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ExecutiveService, execut } from '../services/executive.service';
import { CustomertypeService } from '../services/customertype.service';
import { FormValidationService } from '../form-validation.service';
import { LegderService } from '../services/ledger.service';
import { roletypesservice } from '../services/roletypes.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddVendorPage implements OnInit {

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  type: string = 'all';
  selectedSalutation: string = '';
  companyName: string = '';
  copyData: boolean = false;
  phoneData:boolean=false;
  selectTabs = 'address';
  selectedCountry: number = 0;
  selectedState: number = 0;
  selectedDistrict: number = 0;

  selectedOption1: number = 0;
  selectedState1: number = 0;
  selectedDistrict1: number = 0;
  pincode1: string = '';
  address1: string = '';

  name: string = '';
  vendor_code: string = '';
  gstin: string = '';
  select_group: number = 0;
  opening_balance: number = 0;
  closing_balance: number = 0;
  mobile: string = '';
  whatsapp_number: string = '';
  email: string = '';
  country: number = 0;
  state: number = 0;
  district: number = 0;
  pincode: string = '';
  address: string = '';
  tdn: string = '';
  aadhar_no: string = '';
  pan_no: number | string = '';
  udhyog_aadhar: string = '';
  account_number: string = '';
  ifsc_code: string = '';
  bank_name: string = '';
  branch_name: string = '';
  credit_period: number = 0;
  credit_limit: number = 0;

  card_number: string = '';
  opening_point: number = 0;
  closing_point: number = 0;

  submitValue = false;
  countries$: Observable<any[]>
  states$: Observable<any[]>;
  districts$: Observable<any[]>
  myform: FormGroup;
  submitted = false;
  discount: number = 0;

  custtype$: any;
  custtype!: string;
  country1: number = 0;
  state1: number = 0;
  district1: number = 0;
  select_sales_person: string = '';
  executive$: any;
  executive: string = '';
  form: any;

  excode: string = '';
  executivename: string = '';
  emobile: string = '';
  ledger: string = '';
  emanager: number = 0;
  roleid: number = 0;
  roletypes$: Observable<any[]>
  ledgers$: Observable<any>;
  executivepop: FormGroup;

  @ViewChild('popover', { static: false })
  popover!: IonPopover;

isOpen = false;
paymentMethod: boolean = false;

  constructor(private navCtrl: NavController, private custtp: CustomertypeService, private formService: FormValidationService, private execut: ExecutiveService, private https: HttpClient, private router: Router, private vendService: VendorService, private formBuilder: FormBuilder, private toastController: ToastController, private countryservice: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private roletypes: roletypesservice, private addExecutiveService: ExecutiveService, private ledgerService: LegderService,private popoverController: PopoverController, ) {
    this.myform = this.formBuilder.group({
      paymentMethod:[],
      name: ['', [Validators.required]],
      vendor_code: ['', [Validators.required, Validators.maxLength(10)]],
      gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      mobile: ['', [Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      select_group: [''],
      opening_balance: [''],
      closing_balance: [''],
      whatsapp_number: ['', [Validators.maxLength(10)]],
      country: [''],
      state: [''],
      district: [''],
      pincode: [''],
      address: [''],
      discount: [''],
      tdn: [Validators.pattern(/^\d{10}$/)], // TDN validation for 10 digits
      aadhar_no: [Validators.pattern(/^\d{12}$/)], // Aadhar number validation for 12 digits
      pan_no: [Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/)], // PAN number validation
      udhyog_aadhar: [Validators.pattern(/^\d{12}$/)], // Udyog Aadhar number validation for 12 digits
      account_number: [Validators.pattern(/^\d{9,18}$/)], // Account number validation (between 9 and 18 digits)
      ifsc_code: [Validators.pattern(/^[A-Za-z]{4}\d{7}$/)], // IFSC code validation (4 alphabets + 7 digits)
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
      copyData: [false],
      phoneData:[false],
    });

    this.executivepop = this.formBuilder.group({
      excode: [''],
      executivename: [''],
      emobile: [''],
      ledger: [''],
      emanager: [''],
      roleid: [0],
    })

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor

    this.countries$ = this.countryservice.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.executive$ = this.execut.getexecutive();
    this.custtype$ = this.custtp.getcustomertype();
    this.roletypes$ = this.roletypes.getroletypes();
    const compid = '1';
    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Dismiss the popover before navigating
        this.closePopover();
      }
    });
  }

  
  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  onNew() {
    location.reload();
  }
  onCountryChange() {
    console.log('selected value' + this.country);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.state);
    this.districts$ = this.districtservice.getDistricts(this.state);
  }

  async onSubmit() {
    const fields = { name: this.name, vendor_code: this.vendor_code, }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', this.myform.value);
      const venddata: vend = {
        name: this.myform.value.name,
        customer_code: this.myform.value.vendor_code,
        gstin: this.myform.value.gstin,
        select_group: this.myform.value.select_group,
        opening_balance: this.myform.value.opening_balance,
        closing_balance: this.myform.value.closing_balance,
        mobile: this.myform.value.mobile,
        whatsapp_number: this.myform.value.whatsapp_number,
        email: this.myform.value.email,
        country: this.myform.value.country,
        state: this.myform.value.state,
        district: this.myform.value.district,
        pincode: this.myform.value.pincode,
        address: this.myform.value.address,
        tdn: this.myform.value.tdn,
        aadhar_no: this.myform.value.aadhar_no,
        pan_no: this.myform.value.pan_no,
        udhyog_aadhar: this.myform.value.udhyog_aadhar,
        account_number: this.myform.value.account_number,
        ifsc_code: this.myform.value.ifsc_code,
        bank_name: this.myform.value.bank_name,
        branch_name: this.myform.value.branch_name,
        credit_period: this.myform.value.credit_period,
        credit_limit: this.myform.value.credit_limit,
        select_sales_person: this.myform.value.select_sales_person,
        card_number: this.myform.value.card_number,
        opening_point: this.myform.value.opening_point,
        closing_point: this.myform.value.closing_point,
        selectedSalutation: this.myform.value.selectedSalutation,
        companyName: this.myform.value.companyName,
        country1: this.myform.value.country1,
        state1: this.myform.value.state1,
        district1: this.myform.value.district1,
        pincode1: this.myform.value.pincode1,
        address1: this.myform.value.address1,
        discount: this.myform.value.discount,
      };

      this.vendService.createVendor(venddata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);

          this.formService.showSaveLoader()
          this.myform.reset();

        },
        (error: any) => {
          console.error('POST request failed', error);
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 1000);
          this.formService.shoErrorLoader();
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
      if (this.firstInvalidInput) {
        this.firstInvalidInput.setFocus();
      }
    }
  }


  ngOnInit() {

  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
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
      this.whatsapp_number= this.mobile;
    }else{
      this.whatsapp_number ='';
    }
    
  }

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({

    });
  }

  async OnExecutiveSubmit() {
    const fields = {}; // Assuming there are no specific fields to validate for this form
    const isValid = await this.formService.validateForm(fields);
  
    if (isValid) {
      console.log('Your form data : ', this.executivepop.value);
      const executdata: execut = {
        roleid: this.executivepop.value.roleid,
        excode: this.executivepop.value.excode,
        executivename: this.executivepop.value.executivename,
        emanager: this.executivepop.value.emanager,
        emobile: this.executivepop.value.emobile,
        ledger: this.executivepop.value.ledger,
        companyid: 1,
        ewhatsapp: '',
        epan: '',
        ecommision: 0,
        eemail: ''
      };
  
      this.addExecutiveService.createExecutive(executdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          
          // After successfully adding the executive, fetch the updated executive data again
          this.fetchExecutiveData();
          
          // Show success alert after a delay
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
  
          // Optionally, reset the form
          this.executivepop.reset();
        },
        (error: any) => {
          console.error('POST request failed', error);
          
          // Show failed alert after a delay
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 1000);
        }
      );
    } else {
      // If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
  
      // Set focus to the first invalid input field
      if (this.firstInvalidInput) {
        this.firstInvalidInput.setFocus();
      }
    }
  }
  
  fetchExecutiveData() {
    // Assuming you have a method to fetch the updated executive data
    // Here, you'll update the 'executive$' observable with the new data
    this.executive$ = this.addExecutiveService.fetchAllExecutive('','', '');
  }
  onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for up and down arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
}
