import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleofexecutiveService, roleofexecut } from '../services/roleofexecutive.service';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';


@Component({
  selector: 'app-roleofexicutive',
  templateUrl: './roleofexicutive.page.html',
  styleUrls: ['./roleofexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
    ReactiveFormsModule]
})
export class RoleofexicutivePage implements OnInit {
  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  form: FormGroup;
  submitted = false;

  exname: string = '';
  extilte: string = '';
  phone: string = '';
  wpnumber: string = '';
  email: string = '';
  selectedOption: number = 0;
  selectedState: number = 0;
  selectedDistrict: number = 0;
  pin_code: string = '';
  fulladdress: string = '';

  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>

  constructor(private navCtrl: NavController,private router: Router, private roleExecuitveService: RoleofexecutiveService, private formBuilder: FormBuilder, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private formService: FormValidationService,) {
    this.form = this.formBuilder.group({
      exname: ['', [Validators.required]],
      extilte: ['', [Validators.required]],
      phone: [''],
      selectedOption: [''],
      selectedState: [''],
      selectedDistrict: [''],
      fulladdress: [''],
      email: ['',Validators.email],
      wpnumber: [''],
      pin_code: ['']
    })
    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);
  }

  onCountryChange() {
    console.log('selected value' + this.selectedOption);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.selectedState);
    this.districts$ = this.districtservice.getDistricts(this.selectedState);
  }

  async onSubmit() {
    const fields = {exname:this.exname,extilte:this.extilte}
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
const companyid=1
      console.log('Your form data : ', this.form.value);
      let roleexecutdata: roleofexecut = {
        exname: this.form.value.exname,
        extilte: this.form.value.extilte,
        phone: this.form.value.phone,
        selectedOption: this.form.value.selectedOption,
        selectedState: this.form.value.selectedState,
        selectedDistrict: this.form.value.selectedDistrict,
        fulladdress: this.form.value.fulladdress,
        email: this.form.value.email,
        wpnumber: this.form.value.email,
        pin_code: this.form.value.pin_code,
        companyid:companyid
      };
      this.roleExecuitveService.createRoleofExecutive(roleexecutdata, '', '').subscribe(
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
      // Page initialization code goes here
    }
    goBack() {
      this.router.navigate(['/roleofexicutive']);
    }

}