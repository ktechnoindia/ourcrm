import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FollowupService, followuptable } from '../services/followup.service';
import { MyService } from '../myservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../form-validation.service';
import { LeadService } from '../services/lead.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.page.html',
  styleUrls: ['./follow-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class FollowUpPage implements OnInit {

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  followupdate: string = '';
  enterdby: string = '';
  remark: string = '';
  nextfollowupDate: string = '';
  custid: string = '';
  leadid: string = '';
  compid: string = '';

  lead$: Observable<any[]>
  myform: FormGroup;
  showLeadDetails = false;
  followups$: Observable<any>;
  selectedRowDetails: any[] = [];
  constructor(private followService: FollowupService, private formService: FormValidationService, private router: Router, private toastCtrl: ToastController, private followup: FollowupService, private formBuilder: FormBuilder, private encService: EncryptionService, private leadser: LeadService,) {
    const compid = '1';
    const custid = '1';
    const leadid = '1';
    this.lead$ = this.leadser.fetchallleads(encService.encrypt(compid), '', '');

    this.followups$ = this.followService.fetchallfollowup(encService.encrypt(compid),'', '');

    this.nextfollowupDate = new Date().toLocaleDateString();
    this.myform = this.formBuilder.group({
      remark: [''],
      nextfollowupDate: ['']
    })

  }

  showDetails(leadscore: any) {
    // Populate the details for the selected row
    this.selectedRowDetails = [
      {
        srNo: 1, // You can dynamically set these values based on leadscore
        companyId: leadscore.tid,
        leadDate: leadscore.leaddate,
        remark: 'this remark',
        nextFollowUpDate: '12/1/23',
        enteredBy: leadscore.catPerson,
      },
    ];
  }

  async onSubmit() {
    const fields = {}
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', this.myform.value);
      const followupdata: followuptable = {
        nextfollowupDate: this.myform.value.nextfollowupDate,
        remark: this.myform.value.remark,
        followupdate: '1',
        enterdby: '1',
        leadid: '1',
        companyid: '1',
        custid: '1'
      };

      this.followService.createfollowup(followupdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);

          this.formService.showSaveLoader()
          this.myform.reset()
        },
        (error: any) => {
          console.error('POST request failed', error);
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 1000);
          this.formService.shoErrorLoader();
        }
      );

    } else {

      Object.keys(this.myform.controls).forEach(controlName => {
        const control = this.myform.get(controlName);
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
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }


}
