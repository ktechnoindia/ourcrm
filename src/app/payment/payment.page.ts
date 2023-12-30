import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { PaymentService,pay,  } from '../services/payment.service';
import { Observable } from 'rxjs';
import { CreatecompanyService } from '../services/createcompany.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';
import { LegderService } from '../services/ledger.service';

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
  ledger:string='';
  suppliername:number=0;
  outstanding:string='';
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
  outstandingtype:string='';
  paymentmadetype:string='';
  cradit:string='';
  paymentmade:string='';
  paymentway:string='';
  totalamt:string='';
  billno:string='';
  receiveamt:string='';
  pendingamt:string='';
currentamt:string='';

  myform:FormGroup;
  isOpen = false;
  companys$: Observable<any[]>;
  customer$: any;
  supplier$: Observable<any>;
  ledgers$:Observable<any>;
  debit:string='';
  credit:string='';
  
  constructor(private ledgerService:LegderService,private navCtrl:NavController,private datePipe: DatePipe,private router: Router,private formBuilder:FormBuilder,private payService:PaymentService,private companyService : CreatecompanyService ,private encService:EncryptionService, private formService: FormValidationService,private vendname1:VendorService,) { 
     
this.myform= this.formBuilder.group({
  voucherNumber:['',Validators.required],
  paymentdate:[''],
  ledger:[''],
  suppliername:[''],
  outstanding:[''],
  paymentmade:[''],
  paymentway:[''],
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
  totalamt:[''],
  billno:[''],
  receiveamt:[''],
  pendingamt:[''],
  currentamt:[''],
  ledgername:1,
  companyname:1,
  debit:1,
  credit:1,
})

const compid='1';
this.companys$ = this.companyService.fetchallcompany(compid,'','');

this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
this.ledgers$ = this.ledgerService.fetchAllLedger(compid,'','');

}


async onSubmit() {
  const fields = {voucherNumber:this.voucherNumber}
  const isValid = await this.formService.validateForm(fields);
  if (await this.formService.validateForm(fields)) {

    console.log('Your form data : ', this.myform.value);
    const paymentdata: pay = {
      voucherNumber: this.myform.value.voucherNumber, paymentdate: this.myform.value.paymentdate, ledger: this.myform.value.ledger, suppliername: this.myform.value.suppliername, outstanding: this.myform.value.outstanding, paymentmade: this.myform.value.paymentmade, total: this.myform.value.total, balance: this.myform.value.balance, total_payment: this.myform.value.total_payment, billtype: this.myform.value.billtype, selectdrcr: this.myform.value.selectdrcr, particular: this.myform.value.particular, datetype: this.myform.value.datetype, reference: this.myform.value.reference, oriamount: this.myform.value.oriamount, balanceamt: this.myform.value.balanceamt, sale_person: this.myform.value.sale_person,
      paymentway: this.myform.value.paymentway,
      debit: this.myform.value.debit,
      cradit: this.myform.value.cradit,
      totalamt: this.myform.value.totalamt,
      billno:this.myform.value.billno,
      receiveamt:this.myform.value.receiveamt,
      pendingamt:this.myform.value.pendingamt,
      currentamt:this.myform.value.currentamt,
      ledgername:this.myform.value.ledgername,
      companyname:this.myform.value.companyname,
      credit:this.myform.value.credit,

    };

    this.payService.createPayment(paymentdata,'','').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        setTimeout(() => {
          this.formService.showSuccessAlert();
        }, 1000);
       
        this.formService.showSaveLoader();
        this.myform.reset();
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
  onSupplierChange() {
    // Update the 'ledger' field with the selected supplier's name
    this.myform.patchValue({
      ledger: this.suppliername,
    });
  }  
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  onNew(){
    location.reload();
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
