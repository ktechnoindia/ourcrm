import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PaymentService, pay, } from '../services/payment.service';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { CreatecompanyService } from '../services/createcompany.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
import { CustomerService } from '../services/customer.service';
import { VendorService } from '../services/vendor.service';
import { LegderService } from '../services/ledger.service';
import { PurchaseService, purchasestore } from '../services/purchase.service';
import { SessionService } from '../services/session.service';
interface Payment {
  billno: string,
  billdate: string,
  totalamt: number,
  receiveamt: number,
  currentamt: number,
  pendingamt: number,

}
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
  ledger: number = 0;
  companyname: number = 1;
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
  totaldueamt: number = 0;
  totalreceiveamt: number = 0;
  totalcurrentamt: number = 0;
  totalpendingamt: number = 0;
  myform: FormGroup;
  isOpen = false;
  supplier$: Observable<any>;
  ledgers$: Observable<any>;
  outstanding_amount: any;
  //outstanding$: Observable<any[]>
  //purchase$: Observable<any[]>
  userid: number = 0;
  vendorid: number = 0;
  isCheckboxChecked = false;
  billdate: string = '';
  paymentData: Payment[] = [{
    billno: '',
    billdate: '',
    totalamt: 0,
    receiveamt: 0,
    currentamt: 0,
    pendingamt: 0,
  }]
  paymentBill: Subscription;
  myPaymentBillData: any[] = [];
  dataLength: number = 0;
  selectedVendorId: number = 0;
  //paymentbill$:Observable<any[]>
  companyid: number = 0;
  selectedRowIndexes: Set<number> = new Set<number>();

  selectRow(event: CustomEvent, index: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedRowIndexes.add(index);
    } else {
      this.selectedRowIndexes.delete(index);
    }
  }

  isSelectedRow(index: number): boolean {
    return this.selectedRowIndexes.has(index);
  }

  onCurrentAmtChanged(index: number) {
    if (this.isSelectedRow(index)) {
      // Call your save method here passing the updated data
      this.saveData(this.myPaymentBillData[index]);
    }
  }

  saveData(sale: any) {
    // Implement your save logic here, e.g., making an API call to save the data
    console.log("Saving data:", sale);
  }

  constructor(private cdr: ChangeDetectorRef, private purchaseservice: PurchaseService, private paymentservice: PaymentService, private ledgerService: LegderService, private navCtrl: NavController, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder, private companyService: CreatecompanyService, private encService: EncryptionService, private formService: FormValidationService, private vendname1: VendorService, private session: SessionService) {

    const compid = session.getValue('companyid')?.valueOf() as string;
    this.paymentBill = new Subscription();

    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    console.log(this.supplier$);

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');
    this.userid = session.getValue('userid')?.valueOf() as number;
    //  this.outstanding$ = this.paymentservice.fetchVendorOutstanding(this.userid);
    // this.outstanding$.subscribe(outstandingData => {
    //   console.log(outstandingData);
    // });

    // this.paymentbill$ = this.paymentservice.getPurchaseById(this.selectedVendorId, 1);
    // this.paymentbill$.subscribe(data => {
    //   // Get the length of the array
    //   this.dataLength = data.length;
    //   console.log('Length of the array:', this.dataLength);
    // });

    //this.purchase$ = this.purchaseservice.fetchallPurchase(encService.encrypt(compid), '', '');

    this.myform = this.formBuilder.group({
      voucherNumber: ['', Validators.required],
      paymentdate: [''],
      ledger: [0],
      outstanding: [0],
      paymentmade: [0],
      paymentway: [''],
      total: [0],
      total_payment: [0],
      totalamt: [0],
      billno: [''],
      receiveamt: [0],
      pendingamt: [0],
      currentamt: [0],
      ledgername: [''],
      companyname: [''],
      userid: [0],
      vendorid: [0],
      outstanding_amount: [null],
      totaldueamt: [0],
      totalreceiveamt: [0],
      totalcurrentamt: [0],
      totalpendingamt: [0],
      isCheckboxChecked: [false],
      billdate: [''],
    })

  }

  fetchBillsForVendor() {
    // Check if a customer is selected
    if (this.selectedVendorId !== 0) {
      this.fillvendoroutstanding(this.selectedVendorId);
      // Call your service method with the selected customer ID
      this.paymentBill = this.paymentservice.getPurchaseById(1, this.selectedVendorId).subscribe(bill => {
        console.log('data length', bill.length)
        if (bill && bill.length > 0) {
          const bills = bill[0];
          console.log('bills data', bill[0])
          this.billno = bills.billno;
          this.billdate = bills.billdate;
          this.totalamt = bills.totalamt;
          this.pendingamt = bills.pendingamt;
          // this.outstanding=bills.outstanding;
          // this.paymentmade=bills.paymentmade;


          this.myform.patchValue({
            billno: bills.billNumber,
            billdate: bills.billDate,
            totalamt: bills.total,
          });
        }
      });
    }
  }

  async fillvendoroutstanding(vendorid: number) {
    this.paymentservice.fetchVendorOutstanding(vendorid).subscribe((outstandingArray: any[]) => {
      if (outstandingArray!) this.outstanding = outstandingArray[0]?.outstanding_amount;
    });
  }
  async fillbillwisedata(vendorid: number, paymentway: string) {
    if (paymentway == 'BillWise') {
        this.paymentservice.fillBillWise(vendorid).subscribe((data: any[]) => {
            console.log(data);
            this.myPaymentBillData = data;
        });
    } else if (paymentway == 'Onaccount') {
        // Save the data or perform any necessary action
        console.log("Saving data for 'OnAccount' payment...");
        // Add your saving logic here
    } else {
        console.error("Invalid paymentway:", paymentway);
    }
}


  // getPurchaseDetails(payment: any) {
  //   const compid = '1';
  //   const identifier = payment.companyname ? 'companyname' : '';
  //   const value = payment.selectedItemId || payment.companyname;

  //   this.purchaseservice.fetchallPurchase(compid, value, '').subscribe(
  //     (data) => {
  //       console.log('Data received:', data);

  //       if (data && data.length > 0) {
  //         const itemDetails = data[0];

  //         // Update the quote properties
  //         payment.companyname = itemDetails.custname;
  //         payment.outstanding = itemDetails.total;

  //         // Update form control values
  //         this.myform.patchValue({
  //           companyname: payment.companyname,
  //           outstanding: payment.outstanding,
  //           // Other form controls...
  //         });
  //       } else {
  //         console.error('No data found for the selected item.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching data', error);
  //     }
  //   );
  // }
  async ionViewWillEnter() {
    //   const userid = await this.session.getValue('userid');
    //   if (userid == null || userid == 'undefined' || userid == '') {
    //     this.router.navigate(['/login']);
    //   }
    //  this.setlangvals();
    this.paymentData = [{
      billno: '',
      billdate: '',
      totalamt: 0,
      receiveamt: 0,
      currentamt: 0,
      pendingamt: 0,
    }];
  }

  async onSubmit(myform: FormGroup, paymentData: Payment[]) {
    const fields = { voucherNumber: this.voucherNumber };
    const isValid = await this.formService.validateForm(fields);

    if (isValid) {
      if (this.myform.value.paymentway === 'BillWise') {
          // Check if payment made equals total payment only if payment method is 'BillWise'
          if (this.myform.value.paymentmade === this.myform.value.total_payment) {
              this.formService.showErrorPopup("Payment made & Total Current Amount does not match Total Payment. Please verify.");
              return; // Stop submission
          }
      } else if (this.myform.value.paymentway === 'Onaccount') {
          // Proceed directly to saving data when 'Onaccount' is selected
          // Add your saving logic here
      }

      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(paymentData));

      let paymentdatas: pay[] = [];

      for (const element of paymentData) {
        console.log('Your form data : ', this.myform.value);
        const paymentdata: pay = {
          voucherNumber: this.myform.value.voucherNumber,
          paymentdate: this.myform.value.paymentdate,
          ledger: this.myform.value.ledger,
          outstanding: this.myform.value.outstanding,
          paymentmade: this.myform.value.paymentmade,
          total: this.myform.value.total,
          total_payment: this.myform.value.total_payment,
          paymentway: this.myform.value.paymentway,
          totalamt: element.totalamt,
          billno: element.billno,
          billdate: element.billdate,
          receiveamt: element.receiveamt,
          pendingamt: element.pendingamt,
          currentamt: element.currentamt,
          companyname: this.myform.value.companyname,
          totaldueamt: this.myform.value.totaldueamt,
          totalreceiveamt: this.myform.value.totalreceiveamt,
          totalcurrentamt: this.myform.value.totalcurrentamt,
          totalpendingamt: this.myform.value.totalpendingamt,
          userid: this.myform.value.userid,
          vendorid: this.selectedVendorId,
        };
        paymentdatas.push(paymentdata);
      }

      this.paymentservice.createPayment(paymentdatas, '', '').subscribe(
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
          this.formService.showErrorLoader();
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
      ledger: this.companyname,
    });
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  onNew() {
    location.reload();
  }

  fetchVendorOutstandingOnCompanyNameChange() {
    this.myform.get('companyname')?.valueChanges.pipe(
      switchMap((companyId: number) => this.paymentservice.fetchVendorOutstanding(companyId))
    ).subscribe((outstandingArray: any[]) => {
      console.log('Received outstanding data:', outstandingArray);

      if (outstandingArray && outstandingArray.length > 0) {
        const firstItem = outstandingArray[0];
        this.outstanding = firstItem.outstanding_amount;
        console.log('outstanding_amount (after fetch):', this.outstanding_amount);
      } else {
        console.error('Invalid outstanding response:', outstandingArray);
      }
    });
  }

  ngOnInit() {
    this.paymentdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.fetchVendorOutstandingOnCompanyNameChange();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });

  }
  presentToast(arg0: string) {
    throw new Error('Method not implemented.');
  }

  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
  calculatePendingAmount(): number {
    this.pendingamt = this.outstanding - this.paymentmade;
    return this.pendingamt;
  }

  // Methods to calculate totals
  calculateTotalDueAmt(): number {
    let totalAmt = 0;
    for (const purchase of this.myPaymentBillData) {
      // Assuming purchase.total is a numeric value
      if (typeof purchase.total === 'number') {
        totalAmt += purchase.total;
      }
    }
    return totalAmt;
  }


  calculateTotalReceiveAmt(): number {
    let totalAmt = 0;
    for (const sale of this.myPaymentBillData) {
      // Ensure that 'sale.receiveamt' is a number and add it to the total
      if (typeof sale.receiveamt === 'number' && !isNaN(sale.receiveamt)) {
        totalAmt += sale.receiveamt;
      }
    }
    return totalAmt;
  }

  calculateTotalCurrentAmt(): number {
    let totalCurrentAmt = 0;
    for (const sale of this.myPaymentBillData) {
      // Ensure that 'sale.currentamt' is a number and add it to the total
      if (!isNaN(parseFloat(sale.currentamt))) {
        totalCurrentAmt += parseFloat(sale.currentamt);
      }
    }
    return totalCurrentAmt;
  }

  calculateTotalPendingAmt(): number {
    let totalAmt = 0;
    for (const sale of this.myPaymentBillData) {
      // Ensure that 'sale.pendingamt' is a number and add it to the total
      if (typeof sale.pendingamt === 'number' && !isNaN(sale.pendingamt)) {
        totalAmt += sale.pendingamt;
      }
    }
    return totalAmt;
  }
  calculatePendingAmt(purchase: { total: number; currentamt: number; }): number {
    return purchase.total - purchase.currentamt;
  }

  onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for up and down arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }

}
