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
  selectTabs = 'address';

  leadName: string = '';
  companyName: string = '';
  email: string = '';
  phoneNumber: number | null = null;
  leadStatus: string = '';
myform:FormGroup;
  constructor(private followService : FollowupService,private formService:FormValidationService, private router: Router, private toastCtrl: ToastController, private followup : FollowupService,private formBuilder:FormBuilder) { 
   this.myform = this.formBuilder.group({
    leadName:['',[Validators.required]],
    companyName:['',[Validators.required]],
    email:['',Validators.email],
    phoneNumber:[''],
    leadStatus:['']
   })

  }


  async onSubmit() {

    const fields = {leadName:this.leadName,companyName:this.companyName}
    const isValid = await this.formService.validateForm(fields);
    if(await this.formService.validateForm(fields)){

    console.log('Your form data : ', this.myform.value);
    let followuptable:followuptable={leadName:this.myform.value.leadName,companyName:this.myform.value.companyName,email:this.myform.value.email,phoneNumber:this.myform.value.phoneNumber,leadStatus:this.myform.value.leadStatus};

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

  // async onSubmit() {
  //   if (this.leadName === '') {
  //     const toast = await this.toastCtrl.create({
  //       message: "Lead Name is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   } else if (this.companyName === '') {
  //     const toast = await this.toastCtrl.create({
  //       message: "Company Name is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   } else if (this.email === '') {
  //     const toast = await this.toastCtrl.create({
  //       message: "Email is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.phoneNumber===null){
  //     const toast = await this.toastCtrl.create({
  //       message:"Phone Number is required",
  //       duration:3000,
  //       color:'danger'
  //     });
  //     toast.present();
  //   }else if(this.leadStatus===''){
  //     const toast = await this.toastCtrl.create({
  //       message:"Lead Status is required",
  //       duration:3000,
  //       color:'danger',
  //     });
  //     toast.present();
  //   }else{
  //     const toast = await this.toastCtrl.create({
  //       message:"SuccessFully !",
  //       duration:3000,
  //       color:'success'
  //     });
  //     toast.present();
  //   }
  // }
    }
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }
}
