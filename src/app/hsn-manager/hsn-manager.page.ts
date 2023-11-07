import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HsnService, hsn } from '../services/hsn.service';
import { Observable, Subscription } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { EncryptionService } from '../services/encryption.service';
@Component({
  selector: 'app-hsn-manager',
  templateUrl: './hsn-manager.page.html',
  styleUrls: ['./hsn-manager.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HsnManagerPage implements OnInit {
  hsncode: string = '';
  unit: string = '';
  desc: string = '';
  form: FormGroup;
  subscription: Subscription = new Subscription();

  hsncode$: Observable<any[]>
 
  constructor(private router: Router,private encService:EncryptionService, private formService: FormValidationService, private formBuilder: FormBuilder, private hsnService: HsnService, private toastCtrl: ToastController) {
    this.form = this.formBuilder.group({
      hsncode: ['', [Validators.required]],
      unit: ['', ],
      desc: [''],
    })
    this.hsncode$ = this.hsnService.getHSNNames(1);

  }

  async onSubmit() {
    const fields = { hsncode: this.hsncode, }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.form.value);
      let hsndata: hsn = {
        hsncode: this.form.value.hsncode,
        unit: this.form.value.unit,
        desc: this.form.value.desc,
        companyid: 1,
      };
      this.subscription = this.hsnService.createHSN(hsndata, '', '').subscribe(
        (response: any) => {
          if (response.status) {
            console.log('POST request successful', response);
            this.formService.showSuccessAlert();
          }
         
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
      setTimeout(() => {
        this.form.reset();
      }, 3000)
    } else {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAllAsTouched();
        }
      })
    }
  }

  ngOnInit() {
    // Page initialization code goes here
  }
  goBack() {
    this.router.navigate(['/item-master']);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}