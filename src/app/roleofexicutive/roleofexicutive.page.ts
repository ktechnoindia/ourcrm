import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


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

  constructor(private router:Router,private formBuilder:FormBuilder,) 
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
      if (this.form.valid) {
        console.log('Selected Value' + this.form.value);
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