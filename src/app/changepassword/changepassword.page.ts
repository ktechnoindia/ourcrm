import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangepasswordService,changepass } from '../services/changepassword.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
})
export class ChangepasswordPage implements OnInit {
  oldpass: string = '';
  newpass: string = '';
  cunfpass: string = '';

  form: FormGroup;
  submitted = false;
  subscription: any;
  passcreate: any;

  constructor(private passwordChange: ChangepasswordService, private router: Router, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      oldpass: ['', [Validators.required]],
      newpass: ['', [Validators.required]],
      cunfpass: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.form) {
      console.log('Your form data : ', this.form.value);
      let passchangetore: changepass = {
        oldpass: this.form.value.oldpass,
        newpass: this.form.value.newpass,
        cunfpass: this.form.value.cunfpass,
       
      };
      this.passwordChange.createChangePass(passchangetore, '', '').subscribe(
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
