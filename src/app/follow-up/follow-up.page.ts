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
  companyId: string = '1';
  followUpCounter: number = 1;
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
        remark: this.remark,
        nextFollowUpDate: this.nextfollowupDate,
        enteredBy: leadscore.catPerson,
      },
    ];
    this.companyId = leadscore.tid;
    this.followUpCounter = 1;
  }

  
  async onSubmit() {
    // ... (other existing code)

    const followupdata: followuptable = {
      followupId: this.generateFollowUpId(), 
      nextfollowupDate: this.myform.value.nextfollowupDate,
      remark: this.myform.value.remark,
      followupdate: '1',
      enterdby: '1',
      leadid: '1',
      companyid: this.companyId,
      custid: '1',
      
    };
    

    this.followService.createfollowup(followupdata, '', '').subscribe(
      (response: any) => {
        // ... (other existing code)

        // Add the new follow-up detail to the selectedRowDetails array
        this.selectedRowDetails.push({
          srNo: this.selectedRowDetails.length + 1,
          companyId: followupdata.companyid,
          leadDate: '', // You may need to set an appropriate value
          remark: followupdata.remark,
          nextFollowUpDate: followupdata.nextfollowupDate,
          enteredBy: followupdata.enterdby,
          followid:this.followUpCounter
        });

        // ... (other existing code)
      },
      (error: any) => {
        // ... (other existing code)
      }
    );
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }

  private generateFollowUpId(): string {
    const followUpId = `${this.companyId}_${this.followUpCounter}`;
    this.followUpCounter++;
    return followUpId;
    
  }
  
}
