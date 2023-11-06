import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddaccountserviceService,act } from '../services/addaccountservice.service';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class AddaccountPage implements OnInit {

  form:FormGroup;

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

   onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let accountdata:act={acName:this.form.value.acName,acid:this.form.value.acid,actype:this.form.value.actype,industry:this.form.value.industry,phone:this.form.value.phone,acmanager:this.form.value.acmanager,priycontact:this.form.value.priycontact,email:this.form.value.email,assignteam:this.form.value.assignteam,acstatus:this.form.value.acstatus};
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
  } 
}



  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/account-manger']); // Navigate back to the previous page
  }

}
