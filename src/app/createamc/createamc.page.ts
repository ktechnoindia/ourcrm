import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { EncryptionService } from '../services/encryption.service';
import { AdditemService } from '../services/additem.service';
import { AmcService,amc } from '../services/amc.service';



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
  renew_date:string='';
  service_type:number=0;
  servic_coverage:string='';
  itemname:number=0;
  saler_price:string='';
  amc_type:number=0;
  amc_period:number=0;

  isOpen = false;
  customer$: any;
  itemnames$: any;

  constructor(private router: Router,private toastCtrl:ToastController,private formBuilder:FormBuilder,private custname1:CustomerService,private encService: EncryptionService,private itemService:AdditemService,private amcService:AmcService) { 
    this.form = this.formBuilder.group({
      amc_id:['',],
      amc_date:['',],
      cust_code:['',],
      cust_name:['',],
      bill_number:['',],
      renew_date:['',],
      service_type:['',],
      servic_coverage:['',],
      itemname:[''],
      saler_price:[''],
      amc_type:[''],
      amc_period:[''],
      
   })
   const compid = '1';
   this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
   this.itemnames$ = this.itemService.getAllItems();


   this.amc_date = new Date().toLocaleDateString();
   this.renew_date = new Date().toLocaleDateString();
  }

  onSubmit() {
    if (this.form) {
    console.log('Your form data : ', this.form.value);
    let amcdata:amc={amc_id:this.form.value.amc_id,amc_date:this.form.value.amc_date,cust_code:this.form.value.cust_code,cust_name:this.form.value.cust_name,bill_number:this.form.value.bill_number,renew_date:this.form.value.renew_date,service_type:this.form.value.service_type,servic_coverage:this.form.value
    .servic_coverage,itemname:this.form.value.itemname,saler_price:this.form.value.saler_price,amc_type:this.form.value.amc_type,amc_period:this.form.value.amc_period,};
    this.amcService.createAmc(amcdata,'','').subscribe(
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
