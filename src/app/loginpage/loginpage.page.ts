import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService, logindata } from '../services/login.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
})
export class LoginpagePage implements OnInit {
  username:string='';
  password:string='';

  form: FormGroup;
  submitted = false;
  subscription: any;
  logincreate: any;

  constructor(private login : LoginService,private router:Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.form) {
      console.log('Your form data : ', this.form.value);
      let loginstore: logindata = {
        username: this.form.value.username,
        password: this.form.value.password,
        emailphone: ''
      };
      this.logincreate.createlogin(loginstore, '', '').subscribe(
        (response: any) => {
          if (response.status) {
            console.log('POST request successful', response);
          }
          // Handle the response as needed
        },
        (error: any) => {
          console.error('POST request failed', error);
          // Handle the error as needed
        }
      );
    }
  }
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/setting']); 
  }
}