import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  createpass: string = '';
  cunfpass: string = '';

  form: FormGroup;
  submitted = false;
  subscription: any;
  passcreate: any;
  constructor(private password1: PasswordService, private router: Router, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      createpass: ['', [Validators.required]],
      cunfpass: ['', [Validators.required]],
    })
  }
  ngOnInit() {
    // Page initialization code goes here
  }

  onSubmit() {
    if (this.form) {
      console.log('Your form data : ', this.form.value);
      let passtore: passdata = {
        createpass: this.form.value.createpass,
        cunfpass: this.form.value.cunfpass,
        oldpass: this.form.value.oldpass,
        newpass: this.form.value.newpass,
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