import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular'; 
import { LoginService,logindata } from '../services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],

})
export class LoginPage implements OnInit {

  emailphone:string='';
   password:string='';
   username: string='';

   submitValue = false;
login:any;
   constructor(private navCtrl: NavController, private toastCtrl: ToastController,private logIn : LoginService){}
 
   onSubmit(myform: NgForm) {
    console.log('Your form data : ', myform.value);
    let loginStore: logindata = {
      emailphone: myform.value.emailphone,
      password: myform.value.password,
      username: myform.value.username,

    };
    this.logIn.createlogin(loginStore, '', '').subscribe(
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
  // async login(loginForm: NgForm){
  //    if(this.email === "" && this.phone === null && this.password === "" && this.confirmpassword === ""){
  //     const toast = await this.toastCtrl.create({
  //       message: "All felid is required",
  //       duration: 3000,
  //       color:'danger',
  //     });
  //      toast.present();
  //   }else if(this.email === ""){
  //     const toast = await this.toastCtrl.create({
  //       message: "Email is required",
  //       duration: 3000,
  //       color:'danger',
        
  //     });
  //      toast.present();
  //   }else if(this.phone === null){
  //     const toast = await this.toastCtrl.create({
  //       message: "Phone Number is required",
  //       duration: 3000,
  //       color:'danger'
  //     });
  //      toast.present();
  //   }else if(this.password === ""){
  //     const toast = await this.toastCtrl.create({
  //       message: "Password is required",
  //       duration: 3000,
  //       color:'danger'
  //     });
  //      toast.present();
  //   }else if(this.confirmpassword === ""){
  //     const toast = await this.toastCtrl.create({
  //       message: "Confirm Password is required",
  //       duration: 3000,
  //       color:'danger'
  //     });
  //      toast.present();
  //   }else if(this.password !== this.confirmpassword){
  //     const toast = await this.toastCtrl.create({
  //       message: "Password does not matched",
  //       duration: 3000,
  //       color:'danger'
  //     });
  //      toast.present();
  //   }else{
  //     const toast = await this.toastCtrl.create({
  //       message: "Successfully !",
  //       duration: 3000,
  //       color:'success'
  //     });
  //      toast.present();
  //      this.submitValue=true
  //   }
  // }

   ngOnInit(){
  
}


}






function passwordMatchValidator(): any {
  throw new Error('Function not implemented.');
}

