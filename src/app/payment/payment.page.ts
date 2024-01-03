import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PaymentService, pay, } from '../services/payment.service';
import { Observable, switchMap } from 'rxjs';
import { CreatecompanyService } from '../services/createcompany.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';
import { LegderService } from '../services/ledger.service';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [DatePipe],

})
export class PaymentPage implements OnInit {
  @ViewChild('popover') popover: any;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  voucherNumber: string = '';
  paymentdate: string = '';
  ledger: string = '';
  suppliername: number = 0;
  outstanding: number = 0;
  total:number = 0;
vendor_outstanding:any;
  ledger_name: string = '';
  total_payment: number = 0;
  paymentmade: number = 0;
  paymentway:string = '';
  totalamt:number = 0;
  billno: string = '';
  receiveamt: number = 0;
  pendingamt: number = 0;
  currentamt :number = 0;
  companyname: number = 0;
  billpendingamt: number = 0;

  myform: FormGroup;
  isOpen = false;
  companys$: Observable<any[]>;
  supplier$: Observable<any>;
  ledgers$: Observable<any>;
  user_outstanding: any;
  outstanding_amount: any;
  outstanding$: Observable<any[]>
  purchase$: Observable<any[]>
  userid: number = 0;
  vendorid :number = 0;
  totaldueamt: number = 0;
  totalreceiveamt: number = 0;
  totalcurrentamt: number = 0;
  totalpendingamt: number = 0;
  constructor(private purchaseservice: PurchaseService, private paymentservice: PaymentService, private ledgerService: LegderService, private navCtrl: NavController, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder, private payService: PaymentService, private companyService: CreatecompanyService, private encService: EncryptionService, private formService: FormValidationService, private vendname1: VendorService,) {
    const compid = '1';
    this.companys$ = this.companyService.fetchallcompany(compid, '', '');

    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    console.log(this.companys$);

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');

    // const userid = 1;
    this.outstanding$ = this.paymentservice.fetchVendorOutstanding(this.userid);

    this.outstanding$.subscribe(outstandingData => {
      console.log(outstandingData);

    });
    this.purchase$ = this.purchaseservice.fetchallPurchase(encService.encrypt(compid), '', '');

    this.myform = this.formBuilder.group({
      voucherNumber: ['', Validators.required],
      paymentdate: [''],
      ledger: [''],
      suppliername: [''],
      outstanding: [''],
      paymentmade: [''],
      paymentway: [''],
      total: [''],
      balance: [''],
      total_payment: [''],
      totalamt: [''],
      billno: [''],
      receiveamt: [''],
      pendingamt: [''],
      currentamt: [''],
      ledgername: 1,
      companyname: 1,
      userid: [0],
      vendor_outstanding:[''],
      outstanding_amount:[null]
    })


  }
  fetchVendorOutstanding() {


  }






  async onSubmit() {
    const fields = { voucherNumber: this.voucherNumber }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      const userid = 1;

      console.log('Your form data : ', this.myform.value);
      const paymentdata: pay = {
        voucherNumber: this.myform.value.voucherNumber, paymentdate: this.myform.value.paymentdate, ledger: this.myform.value.ledger, suppliername: this.myform.value.suppliername, outstanding: this.myform.value.outstanding, paymentmade: this.myform.value.paymentmade, total: this.myform.value.total, total_payment: this.myform.value.total_payment,
        paymentway: this.myform.value.paymentway,
        totalamt: this.myform.value.totalamt,
        billno: this.myform.value.billno,
        receiveamt: this.myform.value.receiveamt,
        pendingamt: this.myform.value.pendingamt,
        currentamt: this.myform.value.currentamt,
        ledgername: this.myform.value.ledgername,
        companyname: this.myform.value.companyname,
        userid: this.myform.value.userid,
        ledger_name: this.myform.value.ledger_name,
        billpendingamt:this.myform.value.billpendingamt,
        vendorid: this.myform.value.vendorid,
      };

      this.payService.createPayment(paymentdata, '', '').subscribe(
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

    } else {
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
  onNew() {
    location.reload();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  ngOnInit() {
    this.paymentdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.myform.get('companyname')?.valueChanges.pipe(
      switchMap((companyId: number) => this.paymentservice.fetchVendorOutstanding(companyId))
    ).subscribe((outstandingArray: any[]) => {
      console.log('Received outstanding data:', outstandingArray);
    
      if (outstandingArray && outstandingArray.length > 0) {
        const firstItem = outstandingArray[0];
        this.outstanding_amount = firstItem.outstanding_amount;
        console.log('outstanding_amount (after fetch):', this.outstanding_amount);
      } else {
        console.error('Invalid outstanding response:', outstandingArray);
      }
    });
  }
  presentToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  onCompanyChange(event: any) {
    // Handle any additional logic when the company name is selected
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
  calculatePendingAmount() : number{
    this.pendingamt = this.outstanding_amount - this.paymentmade;
    return this.pendingamt;
  }

  // Methods to calculate totals
  calculateTotalDueAmt(): number {
    // Convert this.totalamt to a number before returning
    return this.totalamt;
  }

  calculateTotalReceiveAmt(): number {
    // Convert this.receiveamt to a number before returning
    return this.receiveamt;
  }

  calculateTotalCurrentAmt(): number {
    // Convert this.currentamt to a number before returning
    return this.currentamt;
  }

  calculateTotalPendingAmt(): number {
    // Convert this.billpendingamt to a number before returning
    return this.billpendingamt;
  }

}
