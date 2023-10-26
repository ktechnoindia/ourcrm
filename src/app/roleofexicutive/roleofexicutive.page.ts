import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleofexecutiveService, roleofexecut } from '../services/roleofexecutive.service';


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
  wpnumber: number | null = null;
  email: string = '';
  selectedCountry: string = '';
  selectedState: string = '';
  selectedDistrict: string = '';
  pinCode: string = '';
  fulladdress: string = '';

  constructor(private router:Router,private roleExecuitveService:RoleofexecutiveService,private formBuilder:FormBuilder,) 
    {
      this.form = this.formBuilder.group({
        exname:['',[Validators.required]],
        extilte:['',[Validators.required]],
        phone:['',[Validators.required]],
        selectedCountry:['',[Validators.required]],
        selectedState:['',[Validators.required]],
        selectedDistrict:['',[Validators.required]],
        fulladdress:['',[Validators.required]],
        email:[''],
        wpnumber:[''],
        pinCode:['']
      })
     }

     onSubmit() {
      if (this.form) {
      console.log('Your form data : ', this.form.value);
      let roleexecutdata:roleofexecut={
        exname: this.form.value.exname,
        extilte: this.form.value.extilte,
        phone: this.form.value.phone,
        selectedCountry: this.form.value.selectedCountry,
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