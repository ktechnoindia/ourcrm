import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
import { LegderService } from '../services/ledger.service';
import { EncryptionService } from '../services/encryption.service';
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
  ecommision: number=0;
  ledger: string = '';
  companyid=1;
  
  roletypes$: Observable<any[]>
  MenuController: any;
  roletypesservice: any;
  ledgers$: Observable<any>;
  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private router: Router,private addExecutiveService:ExecutiveService,private formService: FormValidationService,  private formBuilder: FormBuilder, private toastCtrl: ToastController, private roletypes: roletypesservice,private ledgerService:LegderService , private encService:EncryptionService) {
    this.roletypes$ = this.roletypes.getroletypes();

    this.form = this.formBuilder.group({
      roleid: [''],
      excode:['',[Validators.required]],
      executivename: ['', [Validators.required]],
      emanager: [''],
      emobile: [''],
      ledger: [''],
      ecommision: [''],
      epan: ['',Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/)],
      ewhatsapp: [''],
      eemail: ['',Validators.email],
     
    })
    const compid='1';

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid,'','');
    console.log(this.ledgers$);
  }

  
  async onSubmit() {
    const fields = {}
    if (await this.formService.validateForm(fields)) {
    console.log('Your form data : ', this.form.value);
    const executdata:execut={
      roleid:this.form.value.roleid,excode:this.form.value.excode,executivename:this.form.value.executivename,emanager:this.form.value.emanager,emobile:this.form.value.emobile,eemail:this.form.value.eemail,ewhatsapp:this.form.value.ewhatsapp,epan:this.form.value.epan,ecommision:this.form.value.ecommision,ledger:this.form.value.ledger,companyid:1};
    this.addExecutiveService.createExecutive(executdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        setTimeout(() => {
          this.formService.showSuccessAlert();
        }, 1000);
       
        this.formService.showSaveLoader()

      },
      (error: any) => {
        console.error('POST request failed', error);
        setTimeout(() => {
          this.formService.showFailedAlert();
        }, 1000);
        this.formService.shoErrorLoader();
      }
    );
    
  }else {
    //If the form is not valid, display error messages
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
    if (this.firstInvalidInput) {
     this.firstInvalidInput.setFocus();
   }
  }
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
