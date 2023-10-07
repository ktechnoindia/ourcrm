import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  firstName: string = '';
  lastName: string = '';
  phone:number|null = null;
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
  selectedOption: string = '';
  checkBoxSection: boolean = false;

  submitValue:boolean = false;

  constructor(private router: Router, private toastController: ToastController) { }

  async  signUp() {
      if(this.firstName === ""){
        const toast = await this.toastController.create({
          message:"First Name is required",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.lastName == ""){
        const toast = await this.toastController.create({
          message:"Last Name is required",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.phone == null){
        const toast = await this.toastController.create({
          message:"Phone Number is required",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.email == ""){
        const toast = await this.toastController.create({
          message:"Email is required",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.password == ""){
        const toast = await this.toastController.create({
          message:"Password is required",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.confirmpassword == ""){
        const toast = await this.toastController.create({
          message:"Confirm Password is required",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.password !== this.confirmpassword){
        const toast = await this.toastController.create({
          message:"Password doses not matched",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.selectedOption == ""){
        const toast = await this.toastController.create({
          message:"Select Country and How u find Me",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else if(this.checkBoxSection == false){
        const toast = await this.toastController.create({
          message:"Select term & conditions",
          duration:3000,
          color:'danger'
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message:"SuccessFully Submitted !",
          duration:3000,
          color:'success'
        });
        toast.present();
        this.submitValue=true;
      }
}
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/master"])
  }

}
