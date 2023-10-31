import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddexecutiveService,execut } from '../services/addexecutive.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.page.html',
  styleUrls: ['./add-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink, RouterModule, ReactiveFormsModule,RouterLink, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddExecutivePage implements OnInit {

  form: FormGroup;
  submitted = false;

  roleid: number = 0;
  executivename: string = '';
  emanager: string = '';
  emobile: string='';
  eemail: string = '';
  ewhatsapp: string='';
  epan: string = '';
  ecommision: number=0;
  ledger: string = '';
  companyid:number=0;
  
  roletypes$: Observable<any[]>
  MenuController: any;
  roletypesservice: any;
 

  constructor(private router: Router,private addExecutiveService:AddexecutiveService, private formBuilder: FormBuilder, private toastCtrl: ToastController, private roletypes: roletypesservice) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      roleid: ['', [Validators.required]],
      executivename: ['', [Validators.required]],
      emanager: ['', [Validators.required]],
      emobile: ['', [Validators.required]],
      ledger: ['', [Validators.required]],
      ecommision: [''],
      epan: [''],
      ewhatsapp: [''],
      eemail: [''],
      companyid:['']
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

  onSubmit() {
    this.submitted=true;
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let executdata:execut={roleid:this.form.value.roleid,executivename:this.form.value.executivename,emanager:this.form.value.emanager,emobile:this.form.value.emobile,eemail:this.form.value.eemail,ewhatsapp:this.form.value.ewhatsapp,epan:this.form.value.epan,ecommision:this.form.value.ecommision,ledger:this.form.value.ledger,companyid:this.form.value.companyid};
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
    }
  // } else {
  //   Object.keys(this.form.controls).forEach(controlName => {
  //     const control = this.form.get(controlName);
  //     if (control.invalid) {
  //       control.markAsTouched();
  //     }
  //   })
  // }
}

  ngOnInit() {
  }
  navigateToVieweExecutivePage() {
    this.router.navigate(['/view-executive']); // Navigate to the target page
  }
  goBack() {
    this.router.navigate(['/add-executive']); // Navigate back to the previous page
  }



}
