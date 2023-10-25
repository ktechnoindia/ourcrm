import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreateunitService, unit } from '../services/createunit.service';

@Component({
  selector: 'app-createunit',
  templateUrl: './createunit.page.html',
  styleUrls: ['./createunit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CreateunitPage implements OnInit {

  unit_name:string='';
  short_name:string='';
  primary_unit:string='';
  conversion_fact:string='';
  decimal_place:string='';
  uqc_unit:string='';
  form: any;

  constructor(private router:Router,private formBuilder:FormBuilder,private unitService:CreateunitService) { 
    this.form = this.formBuilder.group({
      igname: ['', [Validators.required]],
      agname: ['', [Validators.required]],
      description: ['', [Validators.required]],
  })
  }

  onSubmit(myform: NgForm) {
    if (this.form) {
    console.log('Your form data : ', myform.value);
    let unitdata:unit={
      unit_name:myform.value.unit_name,
      short_name:myform.value.short_name,
      primary_unit:myform.value.primary_unit,
      conversion_fact:myform.value.conversion_fact,
      decimal_place:myform.value.decimal_place,
      uqc_unit:myform.value.uqc_unit,
    };
    this.unitService.createUnit(unitdata,'','').subscribe(
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