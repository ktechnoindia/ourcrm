import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateamcService,amc } from '../services/createamc.service';
import { CustomerService } from '../services/customer.service';
import { EncryptionService } from '../services/encryption.service';
import { AdditemService } from '../services/additem.service';


@Component({
  selector: 'app-createamc',
  templateUrl: './createamc.page.html',
  styleUrls: ['./createamc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class CreateamcPage implements OnInit {
  @ViewChild('popover')popover:any; 
  form:FormGroup; 

  amc_id:string='';
  amc_date:string='';
  cust_code:string='';
  cust_name:number=0;
  bill_number:string='';
  particular:string='';
  renew_date:string='';
  service_type:number=0;
  servic_coverage:string='';
  itemname:number=0;
  isOpen = false;
  customer$: any;
  itemnames$: any;

  constructor(private router: Router,private amcService:CreateamcService,private toastCtrl:ToastController,private formBuilder:FormBuilder,private custname1:CustomerService,private encService: EncryptionService,private itemService:AdditemService,) { 
    this.form = this.formBuilder.group({
      amc_id:['',],
      amc_date:['',],
      cust_code:['',],
      cust_name:['',],
      bill_number:['',],
      renew_date:['',],
      service_type:['',],
      servic_coverage:['',],
      itemname:['']
   })
   const compid = '1';
   this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
   this.itemnames$ = this.itemService.getAllItems();
  }

  onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let amcdata:amc={contactid: this.form.value.contactid,cName: this.form.value.cName,startdate: this.form.value.startdate,endate: this.form.value.endate,contactdur: this.form.value.contactdur,contractvalue: this.form.value.contractvalue,cover: this.form.value.cover,list: this.form.value.list,servicelevel: this.form.value.servicelevel,listsla: this.form.value.listsla,payterms: this.form.value.payterms};
    this.amcService.createAMC(amcdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        // Handle the response as needed
      },
      (error: any) => {
        console.error('POST request failed', error);
        // Handle the error as needed
      }
    );
  } 
}

presentPopover(e: Event) {
  this.popover.event = e;
  this.isOpen = true;
}


  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/amc-manager']); // Navigate back to the previous page
  }
}
