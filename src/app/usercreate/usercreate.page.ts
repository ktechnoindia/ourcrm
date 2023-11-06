import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { roletypesservice } from '../services/roletypes.service';
import { Observable } from 'rxjs';
import { UsercreateService, userdata } from '../services/usercreate.service';
import { FormValidationService } from '../form-validation.service';


@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.page.html',
  styleUrls: ['./usercreate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class UsercreatePage implements OnInit {
  fname:string='';
  usercode:number=0;
  fathname:string='';
  email:string='';
  phone:number=0;
  roleid: number = 0;

  form:FormGroup;
  roletypes$: Observable<any[]>
  submitted=false;
  subscription: any;

  constructor(private usercreate : UsercreateService, private formService:FormValidationService, private router:Router,private formBuilder:FormBuilder, private roletypes: roletypesservice) { 
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      fname:['',[Validators.required]],
      usercode:['',[Validators.required]],
      fathname:['',[Validators.required]],
      phone:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      roleid: ['', [Validators.required]],
    })
  }

  
 async onSubmit() {
  const fields = {fname:this.fname,usercode:this.usercode,fathname:this.fathname,phone:this.phone,email:this.email,roleid:this.roleid}
  const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

    console.log('Your form data : ', this.form.value);
    let userstore:userdata={
     fname:this.form.value.fname,
     usercode:this.form.value.usercode,
     fathname:this.form.value.fathname,
     phone:this.form.value.phone,
     email:this.form.value.email,
     roleid:this.form.value.roleid,
    };
    this.usercreate.createuser(userstore,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
    setTimeout(() => {
      this.form.reset();
    }, 1000);
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
    this.router.navigate(['/setting']); 
  }

}