import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExecutiveService, execut } from '../services/executive.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../form-validation.service';
import { LegderService, ledg } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';
import { StateService } from '../services/state.service';
import { CountryService } from '../services/country.service';
import { DistrictsService } from '../services/districts.service';
@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.page.html',
  styleUrls: ['./add-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule, RouterLink, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddExecutivePage implements OnInit {

  form: FormGroup;
  submitted = false;

  roleid: number = 0;
  excode: string = '';
  executivename: string = '';
  emanager: string = '';
  emobile: string = '';
  eemail: string = '';
  ewhatsapp: string = '';
  epan: string = '';
  ecommision: number = 0;
  ledger: string = '';
  companyid = 1;

  roletypes$: Observable<any[]>
  MenuController: any;
  roletypesservice: any;
  ledgers$: Observable<any>;

  ledger_code: string = '';
  lname: string = '';
  gstin: string = '';
  country: number = 0;
  state: number = 0;
  district: number = 0;
  mobile: string = '';
  address: string = '';
  pincode: string = '';
  selectedOption: number = 0;
  lgroup_name:number=0;
  ledgerpop: FormGroup;

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private navCtrl: NavController, private router: Router, private addExecutiveService: ExecutiveService, private formService: FormValidationService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private roletypes: roletypesservice, private ledgerService: LegderService, private encService: EncryptionService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService,private popoverController: PopoverController, ) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      roleid: [''],
      excode: ['', [Validators.required]],
      executivename: ['', [Validators.required]],
      emanager: [''],
      emobile: [''],
      ledger: [''],
      ecommision: [''],
      epan: ['', Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/)],
      ewhatsapp: [''],
      eemail: ['', Validators.email],

    });

    this.ledgerpop = this.formBuilder.group({
      ledger_code: [''],
      lname: [''],
      gstin: [''],
      country: [0],
      state: [0],
      district: [0],
      mobile: [''],
      pincode:[''],
      address: [''],
      lgroup_name:[0].toString()
    });

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);

    const compid = '1';
    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');
    console.log(this.ledgers$);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Dismiss the popover before navigating
        this.closePopover();
      }
    });
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


  async onSubmit() {
    const fields = {}
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.form.value);
      const executdata: execut = {
        roleid: this.form.value.roleid, excode: this.form.value.excode, executivename: this.form.value.executivename, emanager: this.form.value.emanager, emobile: this.form.value.emobile, eemail: this.form.value.eemail, ewhatsapp: this.form.value.ewhatsapp, epan: this.form.value.epan, ecommision: this.form.value.ecommision, ledger: this.form.value.ledger, companyid: 1
      };
      this.addExecutiveService.createExecutive(executdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);

          this.formService.showSaveLoader()
          this.form.reset();

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
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
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

  ngOnInit() {
  }
  navigateToVieweExecutivePage() {
    this.router.navigate(['/view-executive']); // Navigate to the target page
  }
  goBack() {
    this.router.navigate(['/add-executive']); // Navigate back to the previous page
  }

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({

    });
  }

  async OnLedgerSubmit(){
    const fields = { lname: this.lname, ledger_code: this.ledger_code }
    const isValid = await this.formService.validateForm(fields);
    if (isValid) {

      console.log('Your form data : ', this.ledgerpop.value);
      let ledgerdata: ledg = {
        lname: this.ledgerpop.value.lname,
        ledger_code: this.ledgerpop.value.ledger_code,
        gstin:  this.ledgerpop.value.gstin,
        lgroup_name: '',
        opening_balance: 0,
        closing_balance: 0,
        mobile:  this.ledgerpop.value.mobile,
        whatsapp_number: '',
        email: '',
        country: this.ledgerpop.value.country,
        state: this.ledgerpop.value.state,
        district:  this.ledgerpop.value.district,
        pincode: this.ledgerpop.value.pincode,
        address:  this.ledgerpop.value.address,
        tdn: '',
        aadhar_no: '',
        pan_no: '',
        udhyog_aadhar: '',
        account_number: '',
        ifsc_code: '',
        bank_name: '',
        branch_name: '',
        credit_period: 0,
        credit_limit: 0,
        select_sales_person: '',
        card_number: '',
        opening_point: 0,
        closing_point: 0,
        selectedSalutation: '',
        companyName: '',
        country1: 0,
        state1: 0,
        district1: 0,
        pincode1: '',
        address1: '',
        companyid: 0,
        discount: 0
      };
      this.ledgerService.createLdeger(ledgerdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
          this.ledgerpop.reset();

        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
    } else {
      //If the form is not valid, display error messages
      Object.keys(this.ledgerpop.controls).forEach(controlName => {
        const control = this.ledgerpop.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }



}
