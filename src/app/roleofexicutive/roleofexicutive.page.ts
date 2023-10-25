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

   
  form:any;
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

     onSubmit(form: NgForm) {
      if (this.form) {
      console.log('Your form data : ', form.value);
      let roleexecutdata:roleofexecut={
        exname: form.value.exname,
        extilte: form.value.extilte,
        phone: form.value.phone,
        selectedCountry: form.value.selectedCountry,
        selectedState: form.value.selectedState,
        selectedDistrict: form.value.selectedDistrict,
        fulladdress: form.value.fulladdress,
        email: form.value.email,
        wpnumber:form.value.email,
        pinCode:form.value.pinCode
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
    } else {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control.invalid) {
          control.markAsTouched();
        }
      })
    }
  }
    


  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}