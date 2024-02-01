import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddserviceService, serv } from '../services/addservice.service';
import { GsttypeService } from '../services/gsttype.service';
import { FormValidationService } from '../form-validation.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddServicePage implements OnInit {
  service_code: string = '';
  service_name: string = '';
  sac_code: string = '';
  description: string = '';
  myform: FormGroup;

  gst$: any;
  gst: string = '';

  constructor(private navCtrl: NavController, private gstsrvs: GsttypeService, private formService: FormValidationService, private router: Router, private addService: AddserviceService, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.gst$ = this.gstsrvs.getgsttype();

    this.myform = this.formBuilder.group({
      service_code: ['', [Validators.required]],
      service_name: ['', [Validators.required]],
      gst: [''],
      sac_code: ['', Validators.pattern(/^\d{6}$/)],
      description: ['']
    })
  }

  async onSubmit() {
    const fields = { service_code: this.service_code, service_name: this.service_name }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.myform.value);
      let servicedata: serv = {
        service_code: this.myform.value.service_code,
        service_name: this.myform.value.service_name,
        gst: this.myform.value.gst.toString(),
        sac_code: this.myform.value.sac_code,
        description: this.myform.value.description,
        companyid: 1,
      };
      this.addService.createService(servicedata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();

        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
   this.myform.reset();

    } else {
      //If the form is not valid, display error messages
      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
        if (control?.invalid) {
          control.markAllAsTouched();
        }
      });
    }
  }

  onNew() {
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/master']); // Navigate back to the previous page
  }

}
