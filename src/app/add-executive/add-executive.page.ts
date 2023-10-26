import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddexecutiveService,execut } from '../services/addexecutive.service';

@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.page.html',
  styleUrls: ['./add-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class AddExecutivePage implements OnInit {

  myform: any;
  submitted = false;

  role: string = '';
  name: string = '';
  manager: string = '';
  phone_number: number | null = null;
  email: string = '';
  whatshapp_number: number | null = null;
  pan_number: string = '';
  commission: string = '';
  ledger: string = '';

  roletypes$: Observable<any[]>
  MenuController: any;
  roletypesservice: any;


  constructor(private router: Router,private addExecutiveService:AddexecutiveService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private roletypes: roletypesservice) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.myform = this.formBuilder.group({
      role: ['', [Validators.required]],
      name: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      ledger: ['', [Validators.required]],
      commission: [''],
      pan_number: [''],
      whatshapp_number: [''],
      email: ['']
    })
  }

  // onSubmit(myform:any) {
  //   if (this.myform) {
  //     console.log('Selected Value' + myform.value);
  //     let executdata:execut = {role:myform.value.role,name:myform.value.name,manager:myform.value.manager,phone_number:myform.value.phone_number,email:myform.value.email,whatshapp_number:myform.value.whatsapp_number,pan_number:myform.value.pan_number,commission:myform.value.commission,ledger:myform.value.commission}
  //     this.addExecutiveService.createExecutive(executdata,'','').subscribe(
  //       (response:any) => {
  //            console.log('POST Request successful',response);
  //       },
  //       (error:any)=>{
  //            console.log('POST Request failed',error);
  //       }
  //     )
  //   } else {
  //     Object.keys(this.myform.controls).forEach(controlName => {
  //       const control = this.myform.get(controlName);
  //       if (control.invalid) {
  //         control.markAsTouched();
  //       }
  //     })
  //   }
  // }

  onSubmit(form: any) {
    if (this.myform) {
    console.log('Your form data : ', form.value);
    let executdata:execut={role:form.value.role,name:form.value.name,manager:form.value.manager,phone_number:form.value.phone_number,email:form.value.email,whatshapp_number:form.value.whatsapp_number,pan_number:form.value.pan_number,commission:form.value.commission,ledger:form.value.commission};
    this.addExecutiveService.createExecutive(executdata,'','').subscribe(
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
    Object.keys(this.myform.controls).forEach(controlName => {
      const control = this.myform.get(controlName);
      if (control.invalid) {
        control.markAsTouched();
      }
    })
  }
}

  ngOnInit() {
  }
  navigateToVieweExecutivePage() {
    this.router.navigate(['/view-executive']); // Navigate to the target page
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }



}
