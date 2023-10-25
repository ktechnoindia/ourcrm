import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddaccountserviceService,act } from '../services/addaccountservice.service';

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
  constructor(private router: Router,private accountService:AddaccountserviceService,private formBuilder:FormBuilder) {
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

   onSubmit(myform: NgForm) {
    if (this.form) {
    console.log('Your form data : ', myform.value);
    let accountdata:act={acName:myform.value.acName,acid:myform.value.acid,actype:myform.value.actype,industry:myform.value.industry,phone:myform.value.phone,acmanager:myform.value.acmanager,priycontact:myform.value.priycontact,email:myform.value.email,assignteam:myform.value.assignteam,acstatus:myform.value.acstatus};
    this.accountService.createAccount(accountdata,'','').subscribe(
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
    this.router.navigate(['/account-manger']); // Navigate back to the previous page
  }

}
