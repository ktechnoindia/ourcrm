import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateamcService,amc } from '../services/createamc.service';


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

  constructor(private router: Router,private amcService:CreateamcService,private toastCtrl:ToastController,private formBuilder:FormBuilder,) { 
    this.form = this.formBuilder.group({
      contactid:['',[Validators.required]],
      cName:['',[Validators.required]],
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

  onSubmit(myform: NgForm) {
    if (this.form) {
    console.log('Your form data : ', myform.value);
    let amcdata:amc={contactid:myform.value.contactid,cName:myform.value.cName,startdate:myform.value.startdate,endate:myform.value.endate,contactdur:myform.value.contactdur,contractvalue:myform.value.contractvalue,cover:myform.value.cover,list:myform.value.list,servicelevel:myform.value.servicelevel,listsla:myform.value.listsla,payterms:myform.value.payterms};
    this.amcService.createAMC(amcdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
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
