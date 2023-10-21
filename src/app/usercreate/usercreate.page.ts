import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.page.html',
  styleUrls: ['./usercreate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class UsercreatePage implements OnInit {
  fname:string='';
  email:string='';
  phone:string='';
  password:string='';
  confrimpassword:string='';

  form:any;
  submitted=false;

  constructor(private router:Router,private formBuilder:FormBuilder) { 
    this.form = this.formBuilder.group({
      fname:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.maxLength(15)]],
      confrimpassword:['',[Validators.required,Validators.maxLength(15)]],
      phone:[''],
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