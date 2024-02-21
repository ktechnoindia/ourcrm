import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { Observable } from 'rxjs';
import { SignupService, signup } from '../services/signup.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  salutation: number = 0;
  firstName: string = '';
  midName: string = '';
  lastName: string = '';
  phone:string='';
  email: string = '';
  role: number = 0;
  password: string = '';
  confirmpassword: string = '';
  selectedOption: number = 0;
  selectedState: number = 0;
  selectedDistrict: number = 0;
  address: string = '';
  selectedarea:number=0;

  checkBoxSection: boolean = false;
  submitValue: boolean = false;
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
myform:FormGroup;
  constructor(private sharedService: SharedService,private signUp: SignupService, private router: Router, private toastController: ToastController, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService,private formBuilder:FormBuilder) {
    this.myform = this.formBuilder.group({
      salutation:[''],
      firstName:[''],
      midName:[''],
      lastName:[''],
      phone:[''],
      email:[''],
      role:[''],
      password:[''],
      confirmpassword:[''],
      selectedOption:[''],
      selectedState:[''],
      selectedDistrict:[''],
      address:[''],
      selectedarea:[''],
      checkBoxSection:[''],
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
    console.log('Your form data : ', this.myform.value);
    let signupdata: signup = {
      firstName: this.myform.value.firstName,
      midName: this.myform.value.midName,
      lastName: this.myform.value.lastName,
      phone: this.myform.value.phone,
      email: this.myform.value.email,
      role: this.myform.value.role,
      password: this.myform.value.password,
      confirmpassword: this.myform.value.confirmpassword,
      selectedOption: this.myform.value.selectedOption,
      selectedState: this.myform.value.selectedState,
      selectedDistrict: this.myform.value.selectedDistrict,
      address: this.myform.value.address,
      selectedarea: this.myform.value.selectedarea,
      salutation: this.myform.value.salutation,
      companyid:0
    };
    this.signUp.createsignup(signupdata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        this.myform.reset();
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
    // console.log('Form submitted with data:', {
    //   salutation: this.selectedSalutation,
    //   companyName: this.companyName,
    // });
  }
  //   async  signUp() {
  //       // if(this.firstName === ""){
  //       //   const toast = await this.toastController.create({
  //       //     message:"First Name is required",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.lastName == ""){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Last Name is required",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.phone == null){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Phone Number is required",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.email == ""){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Email is required",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.password == ""){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Password is required",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.confirmpassword == ""){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Confirm Password is required",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.password !== this.confirmpassword){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Password doses not matched",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.selectedOption == ""){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Select Country and How u find Me",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else if(this.checkBoxSection == false){
  //       //   const toast = await this.toastController.create({
  //       //     message:"Select term & conditions",
  //       //     duration:3000,
  //       //     color:'danger'
  //       //   });
  //       //   toast.present();
  //       // }else{
  //       //   const toast = await this.toastController.create({
  //       //     message:"SuccessFully Submitted !",
  //       //     duration:3000,
  //       //     color:'success'
  //       //   });
  //       //   toast.present();
  //       //   this.submitValue=true;
  //       // }
  // }
  ngOnInit() {
    this.sharedService.showHeader  = false;
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     // Reset form data when navigating away from the page
    //     this.myform.reset();
    //   }
    // });
  
  }
  goBack() {
    this.router.navigate(["/master"])
  }

}
