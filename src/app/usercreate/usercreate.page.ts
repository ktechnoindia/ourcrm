import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { roletypesservice } from '../services/roletypes.service';
import { Observable } from 'rxjs';
import { UsercreateService, userdata } from '../services/usercreate.service';
import { FormValidationService } from '../form-validation.service';


@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.page.html',
  styleUrls: ['./usercreate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
    ReactiveFormsModule]
})
export class UsercreatePage implements OnInit {
  username: string = '';
  usercode: string = '';
  fathname: string = '';
  email: string = '';
  phone: string = '';
  roletype: number = 0;

  form: FormGroup;
  roletypes$: Observable<any[]>
  submitted = false;
  subscription: any;

  constructor(private navCtrl: NavController,private usercreate: UsercreateService, private formService: FormValidationService, private router: Router, private formBuilder: FormBuilder, private roletypes: roletypesservice) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      usercode: ['', [Validators.required]],
      fathname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roletype: ['', [Validators.required]],
    })
  }


  async onSubmit() {
    const fields = { username: this.username, usercode: this.usercode, fathname: this.fathname, phone: this.phone, email: this.email, roletype: this.roletype }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', this.form.value);
      let userstore: userdata = {
        username: this.form.value.username,
        usercode: this.form.value.usercode,
        fathname: this.form.value.fathname,
        phone: this.form.value.phone,
        email: this.form.value.email,
        roletype: this.form.value.roletype,
      };
      this.usercreate.createuser(userstore, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          // Handle the response as needed
        },
        (error: any) => {
          console.error('POST request failed', error);
          // Handle the error as needed
        }
      );
      setTimeout(() => {
        this.form.reset();
      }, 1000);
    } else {
      //If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
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
  goBack() {
    this.router.navigate(['/setting']);
  }

}