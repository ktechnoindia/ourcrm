import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddgroupService, group } from '../services/addgroup.service';
import { Observable, Subscription } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { EncryptionService } from '../services/encryption.service';
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.page.html',
  styleUrls: ['./addgroup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddgroupPage implements OnInit {

  form: FormGroup;

  itemgroupname: string = '';
  groupname: number = 0;
  companyid=1;
  subscription: Subscription = new Subscription();
  itemgroups$: Observable<any[]>

  constructor(private router: Router, private formBuilder: FormBuilder,private encService:EncryptionService, private formService: FormValidationService, private groupService: AddgroupService) {
    this.form = this.formBuilder.group({
      itemgroupname: ['', [Validators.required]],
      groupname: [''],

    })
    this.itemgroups$ = this.groupService.getAllGroups(1);
   
  }

  async onSubmit() {
    const fields = { itemgroupname: this.itemgroupname, }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.form.value);
      let groupdata: group = {
        itemgroupname: this.form.value.itemgroupname,
        groupname: this.form.value.groupname,
        companyid: 1,
      };
      this.subscription = this.groupService.createGroup(groupdata, '', '').subscribe(
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
        this.form.reset();
      }, 3000);
    } else {
      //If the form is not valid, display error messages
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
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