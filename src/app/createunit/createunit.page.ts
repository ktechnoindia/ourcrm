import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreateunitService, unit } from '../services/createunit.service';
import { FormValidationService } from '../form-validation.service';
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
  decimal_place:string='';
  form: FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder,private formService:FormValidationService,private unitService:CreateunitService) { 
    this.form = this.formBuilder.group({
  unit_name:['',[Validators.required]],
  short_name:[''],
  primary_unit:[''],
  decimal_place:[''],

  })
  }

 async onSubmit() {
    const fields = {unit_name:this.unit_name,primary_unit:this.primary_unit}
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
    console.log('Your form data : ', this.form.value);
    let unitdata:unit={
      unit_name:this.form.value.unit_name,
      short_name:this.form.value.short_name,
      primary_unit:this.form.value.primary_unit,
      decimal_place:this.form.value.decimal_place,
    };
    this.unitService.createUnit(unitdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
       this.formService.showSuccessAlert();
      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
    setTimeout(()=>{
      this.form.reset();
    },1000)
  } else {
    //If the form is not valid, display error messages
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }
}

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/item-master']); 
  }

}