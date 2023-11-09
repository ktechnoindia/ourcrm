import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule,FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FollowupService, followuptable } from '../services/followup.service';
import { MyService } from '../myservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../form-validation.service';
@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.page.html',
  styleUrls: ['./follow-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class FollowUpPage implements OnInit {
  
myform:FormGroup;
  remark:string='';
  nextfollowupDate:string='';

  constructor(private followService : FollowupService,private formService:FormValidationService, private router: Router, private toastCtrl: ToastController, private followup : FollowupService,private formBuilder:FormBuilder) { 
   this.myform = this.formBuilder.group({
    remark:[''],
    nextfollowupDate:['']
   })

  }


  async onSubmit() {

    if(await this.formService.validateForm({})){

    console.log('Your form data : ', this.myform.value);
    let followuptable:followuptable={remark:this.myform.value.remark,nextfollowupDate:this.myform.value.nextfollowupDate};

    this.followService.createfollowup(followuptable, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );setTimeout(() => {
      this.myform.reset();
    }, 1000);
    }else {
      //If the form is not valid, display error messages
      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
    }
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/lead-manager"])
  }
}
