import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular'; // Import ToastController


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],

})
export class LoginPage implements OnInit {

  RegisterFrom: FormGroup;



  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {
    this.RegisterFrom = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-z]+$/),

      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
      ])
    });

  }
  async onSubmit() {
    if (this.RegisterFrom.valid) {
     
      const emailValue = this.RegisterFrom.value.email;
      const phoneValue = this.RegisterFrom.value.phone;
      const passwordValue = this.RegisterFrom.value.password;
      const confirmpasswordValue = this.RegisterFrom.value.confirmpassword;
  
      if (passwordValue !== confirmpasswordValue) {
        const toast = await this.toastController.create({
          message: 'Passwords do not match',
          duration: 3000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
        return; 
      }
  
      console.log('Email:', emailValue);
      console.log('Phone:', phoneValue);
      console.log('Password:', passwordValue);
    } else {
      
      const toast = await this.toastController.create({
        message: 'Please enter valid email, phone number, and password',
        duration: 3000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  }
  

  ngOnInit() {

  }

}






function passwordMatchValidator(): any {
  throw new Error('Function not implemented.');
}

