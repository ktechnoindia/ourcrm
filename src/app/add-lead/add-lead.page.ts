// add-lead.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-lead',
  templateUrl: 'add-lead.page.html',
  styleUrls: ['add-lead.page.scss']
})
export class AddLeadPage {
  leadForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.leadForm = this.formBuilder.group({
      leadOwner: ['', Validators.required],
      cpName: ['', Validators.required],
      cName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  onSubmit() {
    if (this.leadForm.valid) {
      // Perform form submission logic here
    }
  }
}
