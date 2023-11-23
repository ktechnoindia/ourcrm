import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleofexecutiveService, roleofexecut } from '../services/roleofexecutive.service';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-roleofexicutive',
  templateUrl: './roleofexicutive.page.html',
  styleUrls: ['./roleofexicutive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class RoleofexicutivePage implements OnInit {

   
  form:FormGroup;
  submitted=false;

  exname: string = '';
  extilte: string = '';
  phone: string = '';
  wpnumber: string = '';
  email: string = '';
  selectedOption: number = 0;
  selectedState:number=0;
  selectedDistrict:  number = 0;
  pinCode: string = '';
  fulladdress: string = '';
  
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>

  constructor(private router:Router,private roleExecuitveService:RoleofexecutiveService,private formBuilder:FormBuilder,private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService) 
    {
      this.form = this.formBuilder.group({
        exname:['',[Validators.required]],
        extilte:[''],
        phone:[''],
        selectedOption:[''],
        selectedState:[''],
        selectedDistrict:[''],
        fulladdress:[''],
        email:[''],
        wpnumber:[''],
        pinCode:['']
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

     onSubmit() {
      if (this.form) {
      console.log('Your form data : ', this.form.value);
      let roleexecutdata:roleofexecut={
        exname: this.form.value.exname,
        extilte: this.form.value.extilte,
        phone: this.form.value.phone,
        selectedOption: this.form.value.selectedOption,
        selectedState: this.form.value.selectedState,
        selectedDistrict: this.form.value.selectedDistrict,
        fulladdress: this.form.value.fulladdress,
        email: this.form.value.email,
        wpnumber:this.form.value.email,
        pinCode:this.form.value.pinCode
      };
      this.roleExecuitveService.createRoleofExecutive(roleexecutdata,'','').subscribe(
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
    
  }
    


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}