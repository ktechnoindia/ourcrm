import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { CustomerService, cust } from '../services/customer.service';
import { CustomertypeService } from '../services/customertype.service';
import { ExecutiveService, execut } from '../services/executive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../form-validation.service';
import { roletypesservice } from '../services/roletypes.service';
import { LegderService } from '../services/ledger.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCustomerPage implements OnInit {

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  selectedSalutation: string = '';
  companyName: string = '';
  copyData: boolean = false;
  selectTabs = 'address';
  activeSegment: string = '';
  selectedPage: string = 'page1';
  state: number = 0;
  district: number = 0;

  name: string = '';
  customercode: string = '';
  customer_code: string = '';
  country: number = 0;
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
  card_number: string = "";
  opening_point: number = 0;
  closing_point: number = 0;

  select_group: number = 0;
  discount: number = 0;

  selectedOption1: number = 0;
  selectedState1: number = 0;
  selectedDistrict1: number = 0;
  pincode1: string = '';
  address1: string = '';

  submitValue = false;
  phoneData: boolean = false;
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  menuController: any;
  custtype$: any;
  custtype!: string;
  executive$: any;
  executive!: string;

  myform: FormGroup;
  executivepop: FormGroup;
  showShippingAddress: boolean = false;
  form: any;

  excode: string = '';
  executivename: string = '';
  emobile: string = '';
  ledger: string = '';
  emanager: number = 0;
  roleid: number = 0;
  roletypes$: Observable<any[]>

  ledgers$: Observable<any>;
  paymentMethod: boolean = false;
  edit: any;

  constructor( private route: ActivatedRoute,private session: SessionService,private popoverController: PopoverController, private navCtrl: NavController, private custtp: CustomertypeService, private formBuilder: FormBuilder, private execut: ExecutiveService, private myService: CustomerService, private router: Router, private toastCtrl: ToastController, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private formService: FormValidationService, private roletypes: roletypesservice, private addExecutiveService: ExecutiveService, private ledgerService: LegderService,) {

    this.myform = this.formBuilder.group({
      paymentMethod:[],
      selectedSalutation: [''],
      companyName: [''],
      customer_code: [''],
      name: ['', Validators.required],
      gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      select_group: [''],
      discount: [''],
      opening_balance: [''],
      closing_balance: 1,
      mobile: [''],
      whatsapp_number: [''],
      email: ['', Validators.email],
      country: [''],
      state: [''],
      district: [''],
      pincode: [''],
      address: [''],
      selectedOption1: [''],
      selectedState1: [''],
      selectedDistrict1: [''],
      pincode1: [''],
      address1: [''],
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
      copyData: [false],
      phoneData: [false],
      showShippingAddress: [false],

    })
    this.executivepop = this.formBuilder.group({
      excode: [''],
      executivename: [''],
      emobile: [''],
      ledger: [''],
      emanager: [''],
      roleid: [0],
    })

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
    this.custtype$ = this.custtp.getcustomertype();
    this.executive$ = this.execut.getexecutive();
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

  openToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  onCountryChange() {
    console.log('selected value' + this.country);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.state);
    this.districts$ = this.districtservice.getDistricts(this.state);
  }
  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({

    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const editMode = params['edit'];
      const customer = JSON.parse(params['customer']); // Parse the string back to an object
      
      if (editMode && customer) {
        // Pre-fill form fields with customer data
        this.myform.patchValue({
          name: customer.name,
          email: customer.email,
          address: customer.address,
          phone: customer.mobile,
          gstin: customer.gstin,
          opening_balance: customer.opening_balance,
          closing_balance: customer.closing_balance,
          closing_point: customer.closing_point,
          account_number: customer.account_number,
          bank_name: customer.bank_name,
          branch_name: customer.branch_name,
          card_number: customer.card_number,
          companyid: customer.companyid,
          country: customer.country,
          crdate: customer.crdate,
          credit_limit: customer.credit_limit,
          credit_period: customer.credit_period,
          id: customer.id,
          district: customer.district,
          groupid: customer.groupid,
          ifsc_code: customer.ifsc_code,
          isactive: customer.isactive,
          pan_no: customer.pan_no,
          pincode: customer.pincode,
          select_sales_person: customer.select_sales_person,
          state: customer.state,
          tdn: customer.tdn,
          udhyog_aadhar: customer.udhyog_aadhar,
          whatsapp_number: customer.whatsapp_number,
          discount:customer.discount,
          mobile:customer.mobile, 
          opening_point:customer.opening_point,
          selectedOption1:customer.selectedOption1,
          selectedState1:customer.selectedState1,
          selectedDistrict1:customer.selectedDistrict1,
          pincode1:customer.pincode1,
          address1:customer.address1,
          select_group:customer.select_group,
        }
        );
      }
    });
  }
  segmentChanged(event: any) {
    const selectedValue = event.detail.value;

    console.log('Selected Segment Value:', selectedValue);
  }

  goBack() {
    this.router.navigate(['/master']);
  }


  async onSubmit() {
    const fields = { name: this.name, }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      const companyid = 1;
      const customerid=1
      console.log('Your form data : ', this.myform.value);
      const keys = formatDate(new Date(), 'yMMddHH', 'en-IN');
      const userid = await this.session.getValue('userid');

      let custdata: cust = { name: this.myform.value.name, customer_code: this.myform.value.customer_code, gstin: this.myform.value.gstin, select_group: this.myform.value.select_group, opening_balance: this.myform.value.opening_balance, closing_balance: this.myform.value.closing_balance, mobile: this.myform.value.mobile, whatsapp_number: this.myform.value.whatsapp_number, email: this.myform.value.email, country: this.myform.value.country, state: this.myform.value.state, district: this.myform.value.district, pincode: this.myform.value.pincode, address: this.myform.value.address, tdn: this.myform.value.tdn, aadhar_no: this.myform.value.aadhar_no, pan_no: this.myform.value.pan_no, udhyog_aadhar: this.myform.value.udhyog_aadhar, account_number: this.myform.value.account_number, ifsc_code: this.myform.value.ifsc_code, bank_name: this.myform.value.bank_name, branch_name: this.myform.value.branch_name, credit_period: this.myform.value.credit_period, credit_limit: this.myform.value.credit_limit, select_sales_person: this.myform.value.select_sales_person, card_number: this.myform.value.card_number, opening_point: this.myform.value.opening_point, closing_point: this.myform.value.closing_point, selectedSalutation: this.myform.value.selectedSalutation, companyName: this.myform.value.companyName, selectedOption1: this.myform.value.selectedOption1, selectedState1: this.myform.value.selectedState1, selectedDistrict1: this.myform.value.selectedDistrict1, pincode1: this.myform.value.pincode1, address1: this.myform.value.address1, discount: this.myform.value.discount, companyid: companyid };
      if (this.edit) {
        this.myService.editCustomer(companyid,customerid).subscribe((response: any) => {
          if (response.status) { 
            this.openToast('Saved!'); 
          } else { 
            this.openToast('Not Saved'); 
          }
        }, (error) => {
          console.log('error caught in component' + error.message);
          this.openToast('error ' + error.message);
        });
      } else {
      this.myService.createCustomer(custdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);

          this.formService.showSaveLoader()
          // location.reload()
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
    }} else {
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

  onNew() {
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  copyBillingToShipping() {
    if (this.copyData) {
      this.selectedOption1 = this.country;
      this.selectedState1 = this.state;
      this.selectedDistrict1 = this.district;
      this.pincode1 = this.pincode;
      this.address1 = this.address;
    } else {

    }
    this.selectedOption1 = 0;
    this.selectedState1 = 0;
    this.selectedDistrict1 = 0;
    this.pincode1 = '';
    this.address1 = '';

  }
  onCopyboxChange() {
    if (this.copyData) {
      // Copy values from the first row to the second row
      this.selectedOption1 = this.country;
      this.selectedState1 = this.state;
      this.selectedDistrict1 = this.district;
      this.pincode1 = this.pincode;
      this.address1 = this.address;


    } else {
      // Clear values in the second row
      this.selectedOption1 = 0;
      this.selectedState1 = 0;
      this.selectedDistrict1 = 0;
      this.pincode1 = '';
      this.address1 = '';
    }
  }

  onWhatshappCheck() {
    if (this.phoneData) {
      this.whatsapp_number = this.mobile;
    } else {
      this.whatsapp_number = '';
    }
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
