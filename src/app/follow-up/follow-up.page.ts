import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FollowupService, followuptable } from '../services/followup.service';
import { MyService } from '../myservice.service';
@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.page.html',
  styleUrls: ['./follow-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FollowUpPage implements OnInit {
  selectTabs = 'address';

  leadName: string = '';
  companyName: string = '';
  email: string = '';
  phoneNumber: number | null = null;
  leadStatus: string = '';

  constructor( private router: Router, private toastCtrl: ToastController, private followup : FollowupService) { }


  onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let followuptable:followuptable={leadName:myform.value.leadName,companyName:myform.value.companyName,email:myform.value.email,phoneNumber:myform.value.phoneNumber,leadStatus:myform.value.leadStatus};

    this.followup.createfollowup(followuptable, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );

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
    this.router.navigate(["/lead-manager"])
  }
}
