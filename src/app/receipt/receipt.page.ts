import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RecepitService, rec } from '../services/recepit.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
import { CreatecompanyService } from '../services/createcompany.service';
import { Observable, switchMap } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { VendorService } from '../services/vendor.service';
import { CustomerService } from '../services/customer.service';
import { LegderService } from '../services/ledger.service';
import { SalesService } from '../services/sales.service';
import { AdditemService } from '../services/additem.service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [DatePipe],

})
export class ReceiptPage implements OnInit {
  @ViewChild('popover') popover: any

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  voucherNumber: string = '';
  paymentdate: string = '';
  ledger: number = 0;
  companyname: number = 0;
  outstanding: number = 0;
  paymentmade: number = 0;
  pendingamt: number = 0;
  paymentway: string = '';
  total: number = 0;
  total_payment: number = 0;
  billno: string = '';
  totalamt: number = 0;
  receiveamt: number = 0;
  currentamt: number = 0;
  billpendingamt: number = 0;
  totaldueamt: number = 0;
  totalreceiveamt: number = 0;
  totalcurrentamt: number = 0;
  totalpendingamt: number = 0;
  userid: number = 0;
  custid: number = 0;

  myform: FormGroup;
  isOpen = false;
  customer$: Observable<any>;
  ledgers$: Observable<any>;
  sales$: Observable<any[]>
  outstanding_amount: any;
  outstanding$: Observable<any[]>

  constructor(private receiptservice: RecepitService, private saleService: SalesService, private ledgerService: LegderService, private navCtrl: NavController, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder, private recepitService: RecepitService, private encService: EncryptionService, private formService: FormValidationService, private companyService: CreatecompanyService, private custname1: CustomerService, private salesService: SalesService,) {
    const compid = '1';
    this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');

    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    console.log(this.customer$);
    // const userid=3;
    this.outstanding$ = this.receiptservice.fetchUserOutstanding(this.userid);

    this.outstanding$.subscribe(outstandingData => {
      console.log(outstandingData);

    });
    console.log(this.sales$);
    this.myform = this.formBuilder.group({
      voucherNumber: ['', Validators.required],
      paymentdate: [''],
      ledger: [0],
      outstanding: [0],
      paymentmade: [''],
      paymentway: [''],
      total: [''],
      total_payment: [''],
      totalamt: [''],
      billno: [''],
      receiveamt: [''],
      pendingamt: [''],
      billpendingamt: [''],
      currentamt: [''],
      companyname: [''],
      userid: [0],
      custid:[0],
      outstanding_amount: [null],
      totaldueamt: [''],
      totalreceiveamt: [''],
      totalcurrentamt: [''],
      totalpendingamt: [''],
    })

  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  getSalesDetails(recepit: any) {
    const compid = '1';
    const identifier = recepit.companyname ? 'companyname' : '';
    const value = recepit.selectedItemId || recepit.companyname;

    this.saleService.fetchallSales(compid, value, '').subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          recepit.companyname = itemDetails.custname;
          recepit.outstanding = itemDetails.total;

          // Update form control values
          this.myform.patchValue({
            companyname: recepit.companyname,
            outstanding: recepit.outstanding,
            // Other form controls...
          });
        } else {
          console.error('No data found for the selected item.');
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  async onSubmit() {
    const fields = { voucherNumber: this.voucherNumber }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      const userid = 1;

      console.log('Your form data : ', this.myform.value);
      const recepitdata: rec = {
        voucherNumber: this.myform.value.voucherNumber,
        paymentdate: this.myform.value.paymentdate,
        ledger: this.myform.value.ledger,
        outstanding: this.myform.value.outstanding,
        paymentmade: this.myform.value.paymentmade,
        total: this.myform.value.total,
        total_payment: this.myform.value.total_payment,
        paymentway: this.myform.value.paymentway,
        totalamt: this.myform.value.totalamt,
        billno: this.myform.value.billno,
        receiveamt: this.myform.value.receiveamt,
        pendingamt: this.myform.value.pendingamt,
        billpendingamt: this.myform.value.billpendingamt,
        currentamt: this.myform.value.currentamt,
        companyname: this.myform.value.companyname,
        totaldueamt: this.myform.value.totaldueamt,
        totalreceiveamt: this.myform.value.totalreceiveamt,
        totalcurrentamt: this.myform.value.totalcurrentamt,
        totalpendingamt: this.myform.value.totalpendingamt,
        userid: this.myform.value.userid,
        custid: this.myform.value.custid,
      };

      this.recepitService.createRecepit(recepitdata, '', '').subscribe(
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
  };

  onNew() {
    location.reload();
  }

  ngOnInit() {

    this.paymentdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

    // Assuming outstanding_amount is a regular variable
    this.myform.get('companyname')?.valueChanges.pipe(
      switchMap((companyId: number) => this.receiptservice.fetchUserOutstanding(companyId))
    ).subscribe((outstandingArray: any[]) => {
      if (outstandingArray && outstandingArray.length > 0) {
        const firstItem = outstandingArray[0];
        this.outstanding_amount = firstItem.outstanding_amount;
        console.log('outstanding_amount (after fetch):', this.outstanding_amount);
      } else {
        console.error('Invalid outstanding response:', outstandingArray);
      }
    });
  }
  onCompanyChange(event: any) {
    // Handle any additional logic when the company name is selected
  }
  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
  onCustomerChange() {
    this.customer$.subscribe(customers => {
      const selectedCustomer = customers.find((customer: { id: any; }) => customer.id === this.myform.value.customername);

      if (selectedCustomer) {
        this.myform.patchValue({
          ledger: selectedCustomer.name,
        });
      }
    });
  }
  calculatePendingAmount(): number {
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
