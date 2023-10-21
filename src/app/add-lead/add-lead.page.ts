import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.page.html',
  styleUrls: ['./add-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddLeadPage {


  form: any;
  submitted = false;

  catPerson:string='';
  phone:string='';
  selectedCountry:string='';
  selectedState:string='';
  selectedDistrict:string='';
  pncode:string='';
  fulladdress:string='';
  whatshappnumber:string='';
  emails:string='';
  lscore:string='';
  lassign:string='';
  rmark:string='';

  constructor(private router:Router,private formBuilder: FormBuilder
   ) {
    this.form = this.formBuilder.group({
      catPerson: ['', [Validators.required]], 
      phone: ['', [Validators.required]],
      selectedCountry: ['', [Validators.required]],
      selectedState: ['', [Validators.required]],
      selectedDistrict: ['', [Validators.required]],
      fulladdress:['',[Validators.required]],
      lscore:['',[Validators.required]],
      lassign:['',[Validators.required]],
      pncode:[''],
      whatshappnumber:[''],
      emails:[''],
      rmark:[''],

    });
   
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      // If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

  
}
