import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordService, passdata } from '../services/password.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
})
export class PasswordPage implements OnInit {

  create_pass: string = '';
  confirm_pass: string = '';

  form: FormGroup;
  submitted = false;
  subscription: any;
  passcreate: any;
  constructor(private navCtrl: NavController,private password1: PasswordService, private router: Router, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      create_pass: ['', [Validators.required]],
      confirm_pass: ['', [Validators.required]],
    })
  }
  onNew() {
    location.reload();
  }
   onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  ngOnInit() {
    // Page initialization code goes here
  }

  onSubmit() {
    if (this.form) {
      console.log('Your form data : ', this.form.value);
      let passtore: passdata = {
        create_pass: this.form.value.create_pass,
        confirm_pass: this.form.value.confirm_pass,
      };
      this.passcreate.createpass(passtore, '', '').subscribe(
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

  goBack() {
    this.router.navigate(['/setting']);
  }

}