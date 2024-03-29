import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { RecepitService, rec } from '../services/recepit.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
import { CreatecompanyService } from '../services/createcompany.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { VendorService } from '../services/vendor.service';
import { CustomerService } from '../services/customer.service';
import { LegderService } from '../services/ledger.service';
import { SalesService } from '../services/sales.service';
import { AdditemService } from '../services/additem.service';
import { SessionService } from '../services/session.service';

interface Recepit {
  billno: string,
  billdate: string,
  totalamt: number,
  receiveamt: number,
  currentamt: number,
  billpendingamt: number,
}



@Component({
  selector: 'app-payment',
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
  billdate: string = '';
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
  custcode: number = 0;
  companyid: number = 0;
  myform: FormGroup;
  isOpen = false;
  customer$: Observable<any>;
  ledgers$: Observable<any>;
  // sales$: Observable<any[]>
  outstanding_amount: any;
  outstanding$: Observable<any[]>
  isCheckboxChecked = false;
  selectedCustomerId: number = 0;
  // receiptBill$: Observable<any>;
  dataLength: number = 0;
  myReceiptBillData: any[] = [{
    billno: '',
    billdate: '',
    totalamt: 0,
    receiveamt: 0,
    currentamt: 0,
    billpendingamt: 0,
  }];
  receiptData: Recepit[] = [{
    billno: '',
    billdate: '',
    totalamt: 0,
    receiveamt: 0,
    currentamt: 0,
    billpendingamt: 0,
  }]
  recepitbill: Subscription;
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
          this.saveData(this.myReceiptBillData[index]);
      }
  }
  
  saveData(sale: any) {
      // Implement your save logic here, e.g., making an API call to save the data
      console.log("Saving data:", sale);
  }
  

  constructor(private cdRef: ChangeDetectorRef,private session: SessionService, private receiptservice: RecepitService, private saleService: SalesService, private ledgerService: LegderService, private navCtrl: NavController, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder, private encService: EncryptionService, private formService: FormValidationService, private companyService: CreatecompanyService, private custname1: CustomerService) {
    const compid = session.getValue('companyid')?.valueOf() as string;
    this.recepitbill = new Subscription();

    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    console.log(this.customer$);

    this.ledgers$ = this.ledgerService.fetchAllLedger(compid, '', '');


    this.outstanding$ = this.receiptservice.fetchUserOutstanding(this.userid);
    // this.outstanding$.subscribe(outstandingData => {
    //   console.log(outstandingData);
    // });
    // console.log(this.outstanding$);

    // this.receiptBill$ = this.receiptservice.getSalesById(this.selectedCustomerId, 1);
    // this.receiptBill$.subscribe(data => {
    //   // Get the length of the array
    //   this.dataLength = data.length;
    //   console.log('Length of the array:', this.dataLength);
    // });
    // this.sales$ = this.saleService.fetchallSales(encService.encrypt(compid), '', '');

    // this.recepitBill$.subscribe(recepitbill =>{
    //   console.log('redeeeee',recepitbill);
    // })
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
      billdate: [''],
      receiveamt: [0],
      pendingamt: [0],
      billpendingamt: [0],
      currentamt: [0],
      companyname: [''],
      userid: [0],
      custid: [0],
      outstanding_amount: [null],
      totaldueamt: [0],
      totalreceiveamt: [0],
      totalcurrentamt: [0],
      totalpendingamt: [0],
      isCheckboxSelected: [false],

    })

  };


  fetchBillsForCustomer() {
    // Check if a customer is selected
    if (this.selectedCustomerId !== 0) {
      this.filluseroutstanding(this.selectedCustomerId);
      // Call your service method with the selected customer ID
      this.recepitbill = this.receiptservice.getSalesById(1, this.selectedCustomerId).subscribe(bill => {
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

  async filluseroutstanding(userid:number){
    this.receiptservice.fetchUserOutstanding(userid).subscribe((outstandingArray: any[]) => {
      if(outstandingArray!) this.outstanding=outstandingArray[0]?.outstanding_amount;
    });
  }
  async fillbillwisedata(vendorid: number, paymentway: string) {
    if (paymentway == 'BillWise') {
        this.receiptservice.fillBillWise(vendorid).subscribe((data: any[]) => {
            console.log(data);
            this.myReceiptBillData = data;
        });
    } else if (paymentway == 'Onaccount') {
        // Save the data or perform any necessary action
        console.log("Saving data for 'OnAccount' payment...");
        // Add your saving logic here
    } else {
        console.error("Invalid paymentway:", paymentway);
    }
}
  // getSalesDetails(recepit: any) {
  //   const compid = '1';
  //   const identifier = recepit.companyname ? 'companyname' : '';
  //   const value = recepit.selectedItemId || recepit.companyname;

  //   this.saleService.fetchallSales(compid, value, '').subscribe(
  //     (data) => {
  //       console.log('Data received:', data);

  //       if (data && data.length > 0) {
  //         const itemDetails = data[0];

  //         // Update the quote properties
  //         recepit.companyname = itemDetails.custname;
  //         recepit.outstanding = itemDetails.total;

  //         // Update form control values
  //         this.myform.patchValue({
  //           companyname: recepit.companyname,
  //           outstanding: recepit.outstanding,
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
    this.receiptData = [{
      billno: '',
      billdate: '',
      totalamt: 0,
      receiveamt: 0,
      currentamt: 0,
      billpendingamt: 0,
    }];
  }

  async onSubmit(myform: FormGroup, receiptData: Recepit[]) {
    const fields = { voucherNumber: this.voucherNumber }
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
  
    
  
      // Proceed with submission if validation passes
      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(receiptData));
  
      let receiptdatas: rec[] = [];
      console.log('Your form data : ', this.myform.value);
      for (const element of receiptData) {
        element.billpendingamt = element.totalamt - element.receiveamt - element.currentamt;
  
        const recepitdata: rec = {
          voucherNumber: this.myform.value.voucherNumber,
          paymentdate: this.myform.value.paymentdate,
          ledger: this.myform.value.ledger,
          outstanding: this.myform.value.outstanding,
          paymentmade: this.myform.value.paymentmade,
          total_payment: this.myform.value.total_payment,
          paymentway: this.myform.value.paymentway,
          totalamt: element.totalamt,
          billno: element.billno,
          billdate: element.billdate,
          receiveamt: element.receiveamt,
          pendingamt: this.myform.value.pendingamt,
          billpendingamt: element.billpendingamt,
          currentamt: element.currentamt,
          companyname: this.myform.value.companyname,
          totaldueamt: this.myform.value.totaldueamt,
          totalreceiveamt: this.myform.value.totalreceiveamt,
          totalcurrentamt: this.myform.value.totalcurrentamt,
          totalpendingamt: this.myform.value.totalpendingamt,
          userid: this.myform.value.userid,
          custid: this.selectedCustomerId,
          total: 0,
          custcode: this.myform.value.custcode,
        };
        receiptdatas.push(recepitdata);
      }
  
      this.receiptservice.createRecepit(receiptdatas, '', '').subscribe(
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
 
  CustomerOutstandingOnCompanyNameChange() {
    this.myform.get('companyname')?.valueChanges.pipe(
      switchMap((companyId: number) => this.receiptservice.fetchUserOutstanding(companyId))
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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });
  
    this.paymentdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    // this.CustomerOutstandingOnCompanyNameChange();
  }

  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }
  onCustomerChange() {
    // Update the 'ledger' field with the selected supplier's name
    this.myform.patchValue({
      ledger: this.companyname,
    });
  }
  calculatePendingAmt(sale: { total: number; currentamt: number; }): number {
    return sale.total - sale.currentamt;
  }
  calculatePendingAmount(): number {
    this.pendingamt = this.outstanding - this.paymentmade;
    return this.pendingamt;
  }
  calculatePendingBillAmount(receipt: Recepit): number {
    // Assuming sales object has properties like total, receiveamt, and currentamt
    this.billpendingamt = receipt.totalamt - receipt.receiveamt - receipt.currentamt;
    return this.billpendingamt
  }


  // Methods to calculate totals
  calculateTotalDueAmt(): number {
    let totalAmt = 0;
    for (const purchase of this.myReceiptBillData) {
      // Assuming purchase.total is a numeric value
      if (typeof purchase.total === 'number') {
        totalAmt += purchase.total;
      }
    }
    return totalAmt;
  }

  calculateTotalReceiveAmt(): number {
    let totalAmt = 0;
    for (const sale of this.myReceiptBillData) {
        // Ensure that 'sale.receiveamt' is a number and add it to the total
        if (typeof sale.receiveamt === 'number' && !isNaN(sale.receiveamt)) {
            totalAmt += sale.receiveamt;
        }
    }
    return totalAmt;
}

calculateTotalCurrentAmt(): number {
    let totalCurrentAmt = 0;
    for (const sale of this.myReceiptBillData) {
        // Ensure that 'sale.currentamt' is a number and add it to the total
        if (!isNaN(parseFloat(sale.currentamt))) {
            totalCurrentAmt += parseFloat(sale.currentamt);
        }
    }
    return totalCurrentAmt;
}

calculateTotalPendingAmt(): number {
    let totalAmt = 0;
    for (const sale of this.myReceiptBillData) {
        // Ensure that 'sale.pendingamt' is a number and add it to the total
        if (typeof sale.pendingamt === 'number' && !isNaN(sale.pendingamt)) {
            totalAmt += sale.pendingamt;
        }
    }
    return totalAmt;
}



  onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for up and down arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
  
}
