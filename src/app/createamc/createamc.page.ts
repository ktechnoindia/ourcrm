import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-createamc',
  templateUrl: './createamc.page.html',
  styleUrls: ['./createamc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CreateamcPage implements OnInit {

  form:any; 

  contactid:string='';
  cName:string='';
  payterms:string='';
  startdate:string='';
  endate:string='';
  contactdur:string='';  
  cover:string='';
  list:string='';
  contractvalue:string='';
  servicelevel:string='';
  listsla:string='';

  constructor(private router: Router,private toastCtrl:ToastController,private formBuilder:FormBuilder,) { 
    this.form = this.formBuilder.group({
      contactid:['',[Validators.required]],
      cName:['',[Validators.required]],
      billDate:['',[Validators.required]],
      startdate:['',[Validators.required]],
      endate:['',[Validators.required]],
      contactdur:['',[Validators.required]],
      contractvalue:['',[Validators.required]],
      cover:[''],
      list:[''],
      servicelevel:[''],
      listsla:[''],
      payterms:['']
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
    this.router.navigate(['/amc-manager']); // Navigate back to the previous page
  }

}
