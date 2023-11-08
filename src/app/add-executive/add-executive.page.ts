import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExecutiveService,execut } from '../services/executive.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../form-validation.service';
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
  excode:string='';
  executivename: string = '';
  emanager: string = '';
  emobile: string='';
  eemail: string = '';
  ewhatsapp: string='';
  epan: string = '';
  ecommision: string='';
  ledger: string = '';
  companyid=1;
  
  roletypes$: Observable<any[]>
  MenuController: any;
  roletypesservice: any;
 

  constructor(private router: Router,private addExecutiveService:ExecutiveService,private formService: FormValidationService,  private formBuilder: FormBuilder, private toastCtrl: ToastController, private roletypes: roletypesservice) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      roleid: ['', [Validators.required]],
      excode:['',[Validators.required]],
      executivename: ['', [Validators.required]],
      emanager: ['', [Validators.required]],
      emobile: ['', [Validators.required]],
      ledger: ['', [Validators.required]],
      ecommision: [''],
      epan: [''],
      ewhatsapp: [''],
      eemail: [''],
     
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

  async onSubmit() {
    // const fields = {roleid:this.roleid,executivename:this.executivename,emanager:this.emanager,emobile:this.emobile,ledger:this.ledger}
    // const isValid = await this.formService.validateForm(fields);
    // if (await this.formService.validateForm(fields)) {
    console.log('Your form data : ', this.form.value);
    let executdata:execut={roleid:this.form.value.roleid,excode:this.form.value.excode,executivename:this.form.value.executivename,emanager:this.form.value.emanager,emobile:this.form.value.emobile,eemail:this.form.value.eemail,ewhatsapp:this.form.value.ewhatsapp,epan:this.form.value.epan,ecommision:this.form.value.ecommision,ledger:this.form.value.ledger,companyid:1};
    this.addExecutiveService.createExecutive(executdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        this.formService.showSuccessAlert();
      },
      (error: any) => {
        console.error('POST request failed', error);
        this.formService.showFailedAlert();
      }
    );
    setTimeout(() => {
      // Reset the form and clear input fields
      this.form.reset()
    }, 1000); 
    
  // }else {
  //   //If the form is not valid, display error messages
  //   Object.keys(this.form.controls).forEach(controlName => {
  //     const control = this.form.get(controlName);
  //     if (control?.invalid) {
  //       control.markAsTouched();
  //     }
  //   });
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
