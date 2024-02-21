import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FollowupService, followuptable } from '../services/followup.service';
import { MyService } from '../myservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../form-validation.service';
import { LeadService } from '../services/lead.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AdditemService } from '../services/additem.service';
import { ExecutiveService } from '../services/executive.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.page.html',
  styleUrls: ['./follow-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe]

})
export class FollowUpPage implements OnInit {

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  followupdate: string = '';
  enterdby: string = '';
  remark: string = '';
  nextfollowupDate: string = '';
  custid: string = '';
  leadid: number = 0;
  compid: number = 0;
  companyId: number = 0;
  followUpCounter: number = 1;
  lead$: Observable<any[]>
  myform: FormGroup;
  showLeadDetails = false;
  selectedRowDetails: any[] = [];
  lid: number = 0;
  searchTerm: string = '';
  filteredFollowups$: Observable<any[]> = new Observable<any[]>();
  followups: any;

  // FollowUpPage class ke andar
  selectedRow: {
    srNo?: number,
    tid?: number,
    companyname?: string,
    crdate?: string,
    leaddate?: string,
    executivename?: string,
    phone?: string,
    fulladdress?: string,
    selectpd?: string,
    remark?: string,
    nextfollowupDate?: string
    leadstatus: string,
    leadactivity?: string;

  } = {
      leadstatus: '',
     leadactivity:'',

    };
  leadstatus: number = 0;
  rangeValue: number = 0; // Initial value for ion-range
  leadactivity: string='';

  constructor(private productService: AdditemService, private executiveService: ExecutiveService, private datePipe: DatePipe, private followService: FollowupService, private formService: FormValidationService, private router: Router, private toastCtrl: ToastController, private followup: FollowupService, private formBuilder: FormBuilder, private encService: EncryptionService, private leadser: LeadService, private navCtrl: NavController) {
    const compid = '1';
    const custid = '1';
    const leadid = '1';
    this.lead$ = this.leadser.fetchallleads(encService.encrypt(compid), (leadid), '');
    // fo: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),

    this.followupdate = new Date().toISOString().split('T')[0];
    this.nextfollowupDate = new Date().toISOString().split('T')[0];
    this.myform = this.formBuilder.group({
      remark: ['', Validators.required],
      nextfollowupDate: ['', Validators.required],
      searchTerm: [''],
      lid: 0,
      followupdate: [''],
      leadstatus: [this.leadstatus],
      leadactivity:[this.leadactivity],
    })

  }

  showDetails(leadscore: any) {
    // Populate the details for the selected row


    this.followService.fetchallfollowup(this.encService.encrypt('1'), leadscore.tid, '', '').subscribe(
      (response: any) => {
        console.log('data', response);
        this.followups = response;
      },
      (error: any) => {
        console.log('Post request Failed', error);
        this.formService.showFailedAlert();
      }
    );

    this.lid = leadscore.tid;
    this.selectedRow = {
      srNo: leadscore.srNo,
      tid: leadscore.tid,
      companyname: leadscore.companyname,
      crdate: leadscore.crdate,
      leaddate: leadscore.leaddate,
      executivename: leadscore.executivename,
      phone: leadscore.phone,
      fulladdress: leadscore.fulladdress,
      selectpd: leadscore.selectpd,
      remark: leadscore.rmark,
      nextfollowupDate: leadscore.nextfollowupDate,
      leadstatus: leadscore.leadstatus,
      leadactivity:leadscore.leadactivity,
    };
  }

  selectFollowup(selectedFollowup: any) {
    // Update the remark field with the selected follow-up's remark
    this.remark = selectedFollowup.remark;

    // You might want to update other fields as well, e.g., nextfollowupDate, lid, etc.
    // this.nextfollowupDate = selectedFollowup.nextfollowupDate;
    this.lid = selectedFollowup.tid;
    // ... other fields
  }

  async onSubmit() {
    const fields = { remark: this.remark, followupdate: this.followupdate, }
    // const isValid = await this.formService.validateForm(fields);
    const isValid = await this.formService.validateForm(fields);

    if (await this.formService.validateForm(fields)) {
      const followupdata: followuptable = {
        nextfollowupDate: this.myform.value.nextfollowupDate,
        remark: this.myform.value.remark,
        followupdate: this.myform.value.followupdate,
        enterdby: '1',
        leadid: this.myform.value.lid,
        companyid: 1,
        custid: 1,
        leadstatus:this.myform.value.leadstatus,
        leadactivity: this.myform.value.leadactivity,
      };


      this.followService.createfollowup(followupdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
          this.formService.showSaveLoader();
          this.myform.reset();

          // Add the new follow-up data to the array
          this.followups.push(response);

          // If you are using observables, you might need to refresh the observable here
          // Example: this.followups$ = this.followService.getFollowups();
        },
        (error: any) => {
          console.error('POST request failed', error);
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 100);
          this.formService.shoErrorLoader();

        }
      );
    }
    else {
      //If the form is not valid, display error messages
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

  onNew() {
    //location.reload();
  }

  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
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
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(() => this.filterCustomers())
    );
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });
  
  }


  goBack() {
    this.router.navigate(["/leaddashboard"])
  }

  private generateFollowUpId(): string {
    const followUpId = `${this.companyId}_${this.followUpCounter}`;
    this.followUpCounter++;
    return followUpId;
  }
  updateProgressBar() {
    // If "Not Interested" is selected, set the range value to 0
    if (String(this.leadstatus) === '1') {
      this.rangeValue = 0;
    } else {
      // Increment of 25% for other lead statuses
      this.rangeValue = (parseInt(String(this.leadstatus), 10) - 1) * 25;
    }
  }
  

}
