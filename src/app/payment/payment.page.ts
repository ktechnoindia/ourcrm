import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { PaymentService,pay,  } from '../services/payment.service';
import { Observable } from 'rxjs';
import { CreatecompanyService } from '../services/createcompany.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    providers: [DatePipe],

})
export class PaymentPage implements OnInit {
  @ViewChild('popover')popover:any; 

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  voucherNumber:string='';
  paymentdate:string='';
  ledgername:number=0;
  companyname:number=0;
  debit:string='';
  credit:string='';
  total:string='';
  balance:string='';

  ledger_name:string='';
  total_payment:string='';
  billtype:number=0;
  date:string='';
  selectdrcr:number=0;
  particular:string='';
  datetype:string='';
  reference:string='';
  oriamount:string='';
  balanceamt:string='';
  sale_person:string='';
  debittype:string='';
  credittype:string='';
  totalamt:string='';

  myform:FormGroup;
  isOpen = false;
  companys$: Observable<any[]>;
  customer$: any;
  supplier$: Observable<any>;
  constructor(private datePipe: DatePipe,private router: Router,private formBuilder:FormBuilder,private payService:PaymentService,private companyService : CreatecompanyService ,private encService:EncryptionService, private formService: FormValidationService,private vendname1:VendorService,) { 
     
this.myform= this.formBuilder.group({
  voucherNumber:['',Validators.required],
  paymentdate:[''],
  ledgername:[''],
  companyname:[''],
  debit:[''],
  credit:[''],
  total:[''],
  balance:[''],
  total_payment:[''],
  billtype:[''],
  selectdrcr:[''],
  particular:[''],
  datetype:[''],
  reference:[''],
  oriamount:[''],
  balanceamt:[''],
  sale_person:[''],
})

const compid='1';
this.companys$ = this.companyService.fetchallcompany(compid,'','');

this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
  }


async onSubmit() {
  const fields = {voucherNumber:this.voucherNumber}
  const isValid = await this.formService.validateForm(fields);
  if (await this.formService.validateForm(fields)) {

    console.log('Your form data : ', this.myform.value);
    const paymentdata: pay = {
      voucherNumber:this.myform.value.voucherNumber,paymentdate:this.myform.value.paymentdate,ledgername:this.myform.value.ledgername,companyname:this.myform.value.companyname,debit:this.myform.value.debit,credit:this.myform.value.credit,total:this.myform.value.total,balance:this.myform.value.balance, total_payment:this.myform.value.total_payment,billtype:this.myform.value.billtype,selectdrcr:this.myform.value.selectdrcr,particular:this.myform.value.particular,datetype:this.myform.value.datetype,reference:this.myform.value.reference,oriamount:this.myform.value.oriamount,balanceamt:this.myform.value.balanceamt,sale_person:this.myform.value.sale_person,
      
    };

    this.payService.createPayment(paymentdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        setTimeout(() => {
          this.formService.showSuccessAlert();
        }, 1000);
       
        this.formService.showSaveLoader()
      },
      (error: any) => {
        console.error('POST request failed', error);
        setTimeout(() => {
          this.formService.showFailedAlert();
        }, 1000);
        this.formService.shoErrorLoader();
      }
    );
   
  }  else {
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

  

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  ngOnInit() {
    this.paymentdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
}
