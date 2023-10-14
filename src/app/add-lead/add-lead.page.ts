// add-lead.page.ts
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-add-lead',
  templateUrl: 'add-lead.page.html',
  styleUrls: ['add-lead.page.scss']
})
@NgModule({
  declarations: [
    // Your components here
  ],
  imports: [
    IonicModule.forRoot(),
    // Other modules
  ],
  bootstrap: [AppComponent],
})
export class AddLeadPage {
  leadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) {
    this.leadForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      companyName: [''],
      leadSource: [''],
      leadStatus: [''],
      streetAddress: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      country: ['']
      // Define more fields here with their respective validation rules
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  submitLead() {
    if (this.leadForm.valid) {
      // Here you would send the lead data to your backend for processing and storage
      console.log('Submitting lead:', this.leadForm.value);
      // Implement the backend connection here
    } else {
      this.presentToast('Please fill in all required fields and correct any validation errors.');
    }
  }
}
