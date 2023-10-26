import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private unitService:CreateunitService) { 
    this.form = this.formBuilder.group({
  unit_name:['',[Validators.required]],
  short_name:[''],
  primary_unit:[''],
  conversion_fact:[''],
  decimal_place:[''],
  uqc_unit:[''],
  })
  }

  onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let unitdata:unit={
      unit_name:this.form.value.unit_name,
      short_name:this.form.value.short_name,
      primary_unit:this.form.value.primary_unit,
      conversion_fact:this.form.value.conversion_fact,
      decimal_place:this.form.value.decimal_place,
      uqc_unit:this.form.value.uqc_unit,
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
  } 
}

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/master']); 
  }

}