import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { roletypesservice } from '../services/roletypes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddexecutiveService, execut } from '../services/addexecutive.service';
import { RouterModule } from '@angular/router';
import { FormValidationService } from '../form-validation.service';


@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.page.html',
  styleUrls: ['./add-executive.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddExecutivePage implements OnInit {
  form: FormGroup;
  submitted = false;

  roleid: number = 0;
  excode:string='';
  executivename: string = '';
  emanager: string = '';
  emobile: string = '';
  eemail: string = '';
  ewhatsapp: string = '';
  epan: string = '';
  ecommision: number = 0;
  ledger: string = '';
  companyid: number = 0;

  roletypes$: Observable<any[]>;
  formService: any;

  constructor(
    private router: Router,
    private addExecutiveService: AddexecutiveService,
    private formBuilder: FormBuilder,
    private roletypes: roletypesservice,
    private formser:FormValidationService
  ) {
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
      companyid: ['']
    });
  }

  async onSubmit() {
    const fields = {
      roleid: this.roleid,
      executivename: this.executivename,
      emanager: this.emanager,
      emobile: this.emobile,
      ledger: this.ledger
    };
    const isValid = await this.formser.validateForm(fields);

    if (isValid) {
      const executData: execut = {
        roleid: this.form.value.roleid,
        executivename: this.form.value.executivename,
        emanager: this.form.value.emanager,
        emobile: this.form.value.emobile,
        eemail: this.form.value.eemail,
        ewhatsapp: this.form.value.ewhatsapp,
        epan: this.form.value.epan,
        ecommision: this.form.value.ecommision,
        ledger: this.form.value.ledger,
        companyid: this.form.value.companyid,
        excode: ''
      };

      this.addExecutiveService.createExecutive(executData, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formser.showSuccessAlert();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formser.showFailedAlert();
        }
      );

      setTimeout(() => {
        // Reset the form and clear input fields
        this.form.reset();
      }, 1000);
    } else {
      // If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  ngOnInit() {}

  navigateToViewExecutivePage() {
    this.router.navigate(['/view-executive']); // Navigate to the target page
  }

  goBack() {
    this.router.navigate(['/add-executive']); // Navigate back to the previous page
  }
}
