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
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
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

  searchTerm: string = '';
  filteredFollowups$: Observable<any[]> = new Observable<any[]>();
  followups: any;
  // FollowUpPage class ke andar
  selectedRow: {
    srNo?: number,
    tid?: string,
    companyname?: string,
    crdate?: string,
    executivename?: string,
    phone?: string,
    fulladdress?: string,
    selectpd?: string,
    remark?: string,
    nextfollowupDate?: string
  } = {};


  constructor(private followService: FollowupService, private formService: FormValidationService, private router: Router, private toastCtrl: ToastController, private followup: FollowupService, private formBuilder: FormBuilder, private encService: EncryptionService, private leadser: LeadService,) {
    const compid = '1';
    const custid = '1';
    const leadid = '1';
    this.lead$ = this.leadser.fetchallleads(encService.encrypt(compid), '', '');

    this.followups$ = this.followService.fetchallfollowup(encService.encrypt(compid), '', '');

    this.followups$.subscribe(data => {
      this.followups = data;
    });

    this.nextfollowupDate = new Date().toLocaleDateString();
    this.myform = this.formBuilder.group({
      remark: [''],
      nextfollowupDate: [''],
      searchTerm: ['']

    })

  }

  showDetails(leadscore: any) {
    // Populate the details for the selected row
    this.selectedRow = {
      // srNo: leadscore.srNo,
      tid: leadscore.tid,
      companyname: leadscore.companyname,
      crdate: leadscore.crdate,
      executivename: leadscore.executivename,
      phone: leadscore.phone,
      fulladdress: leadscore.fulladdress,
      selectpd: leadscore.selectpd,
     
    };
  }

  async onSubmit() {

    const followupdata: followuptable = {

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

        console.log(response);

      },
      (error: any) => {

        console.log(error)
      }
    );
  }

  filterCustomers(): Observable<any[]> {
    return this.lead$.pipe(
      map(followups =>
        followups.filter((follow: any) =>
          Object.values(follow).some(value => String(value).toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      )
    );
  }

  onSearchTermChanged(): void {
    this.filteredFollowups$ = this.filterCustomers();
  }

  ngOnInit() {
    this.filteredFollowups$ = this.lead$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
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
