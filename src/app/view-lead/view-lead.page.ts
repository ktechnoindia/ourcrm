import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExecutiveService } from '../services/executive.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { LeadService } from '../services/lead.service';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.page.html',
  styleUrls: ['./view-lead.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,RouterLink,ReactiveFormsModule]
})
export class ViewLeadPage implements OnInit {

  viewLeadForm: FormGroup;
  executive$: any;
  executive: string='';
  select_sales_person:number=0;
  formdate: string = '';
  toDate: string = '';
  lead$:Observable<any[]>

  constructor(private encService: EncryptionService,private leadser:LeadService, private execut: ExecutiveService,private router: Router, private toastCtrl: ToastController,private formBuilder:FormBuilder) {
    const compid = '1';
    this.lead$ = this.leadser.fetchallleads (encService.encrypt(compid), '', '');
    this.executive$ = this.execut.getexecutive();

    this.viewLeadForm = this.formBuilder.group({
      select_sales_person:[''],
      formdate:[''],
      toDate:[''],
    })
   }

 async onSubmit(){

 }
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/leaddashboard"])
  }

}
