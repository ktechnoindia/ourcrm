import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddaccountPage implements OnInit {

  form:any;

  acName: string = '';
  acid: string = '';
  actype: string = '';
  industry:string='';
  priycontact:string='';
  email:string='';
  phone:string='';
  acmanager:string='';
  assignteam:string='';
  acstatus:string='';
  constructor(private router: Router,private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      acName:['',[Validators.required]],
      acid:['',[Validators.required]],
      actype:['',[Validators.required]],
      industry:['',[Validators.required]],
      phone:['',[Validators.required]],
      acmanager:['',[Validators.required]],
      priycontact:[''],
      email:[''],
      assignteam:[''],
      acstatus:[''],
   })
   }

   onSubmit() {
    if (this.form.valid) {
      console.log('Selected Value' + this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control.invalid) {
          control.markAsTouched();
        }
      })
    }
  } 


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/account-manger']); // Navigate back to the previous page
  }

}
