import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,ReactiveFormsModule]
})
export class SignupPage implements OnInit {

  RegisterFrom:FormGroup;

  constructor(private router:Router,private formBuilder: FormBuilder, private toastController: ToastController) { 
    this.RegisterFrom = this.formBuilder.group({
      firstname: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      lastname: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z] + $/),
      ]),
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[0-9] +$/),
        Validators.maxLength(10),
      ]),
      email: new FormControl('',[
        Validators.email,
        Validators.required,
        Validators.pattern(/^[a-zA-z0-9]+$/),
      ]),
      password: new FormControl('',[
        Validators.required,
      ]),
      confirmpassword: new FormControl('',[
        Validators.required,
      ])
    })
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
  goBack(){
    this.router.navigate(["/master"])
  }

}
