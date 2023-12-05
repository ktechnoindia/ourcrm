import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { QuotationService, quotestore } from '../services/quotation.service';
import { GsttypeService } from '../services/gsttype.service';
import { UnitnameService } from '../services/unitname.service';
import { AdditemService } from '../services/additem.service';
import { CustomerService } from '../services/customer.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';

interface Quote {
  barcode: string;
  itemcode: number;
  itemname: number,
  description: string;
  quantity: number;
  unitname: number;
  mrp: number;
  basicrate: number;
  netrate: number;
  grossrate: number;
  taxrate: number;
  CGST: number;
  SGST: number;
  IGST: number;
  discount: number;
  discountamt: number;
  totaltax: number;
  total: number;
}

@Component({
  selector: 'app-add-quot',
  templateUrl: './add-quot.page.html',
  styleUrls: ['./add-quot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
    ReactiveFormsModule]
})
export class AddQuotPage implements OnInit {
  gstTypes: any[] = [];

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  billformate: number = 0;
  quoteNumber: number = 0;
  quateDate: string = '';
  custcode: string = '';
  custname: number = 0;
  refrence: string = '';
  refdate: string = '';

  //table data
  barcode: string = '';
  itemcode: string = '';
  itemname: number = 0;
  description: string = '';
  quantity: string = '';
  unitname: number = 0;
  mrp: string = '';
  basicrate: string = '';
  netrate: string = '';
  grossrate: string = '';
  taxrate: string = '';
  CGST: string = '';
  SGST: string = '';
  IGST: string = '';
  discount: string = '';
  discountamt: string = '';
  totaltax: string = '';
  total: string = '';

  totalitemno: string = '';
  totalquantity: string = '';
  totalgrossamt: string = '';
  totaldiscountamt: string = '';
  totaltaxamount: string = '';
  totalnetamount: string = '';

  roundoff: string = '';
  pretax: string = '0';
  posttax: string = '0';
  deliverydate: string = '';
  deliveryplace: string = 'Jaipur';
  openingbalance: string = '';
  closingbalance: string = '';
  debit: string = '';
  credit: string = '';
  // deliveryplace: string = "Jaipur";


  quoteData: Quote[] = [{
    barcode: '',
    itemcode: 0,
    itemname: 0,
    description: '',
    quantity: 0,
    unitname: 0,
    mrp: 0,
    basicrate: 0,
    netrate: 0,
    grossrate: 0,
    taxrate: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
    discount: 0,
    discountamt: 0,
    totaltax: 0,
    total: 0,
  }];
  ttotal!: number;
  myform: FormGroup;

  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;
  itemnames$: Observable<any[]>;
  unitname$: Observable<any[]>;
  taxrate$: Observable<any[]>;
  customer$: any;
  
  constructor(private formBuilder: FormBuilder, private custname1: CustomerService, private encService: EncryptionService, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private quote: QuotationService, private formService: FormValidationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.gstsrvs.getgsttype().subscribe((types) => {
      this.gstTypes = types
    });
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    this.quateDate = new Date().toLocaleDateString();
    this.refdate = new Date().toLocaleDateString();
    this.deliverydate = new Date().toLocaleDateString();



    this.myform = this.formBuilder.group({
      billformate: [''],
      quoteNumber: ['', Validators.required],
      quateDate: [''],
      custcode: ['', Validators.required],
      custname: ['', Validators.required],
      refrence: [''],
      refdate: [''],

      //table
      barcode: [''],
      itemcode: [''],
      itemname: [''],
      description: [''],
      quantity: [''],
      unitname: [''],
      mrp: [''],
      basicrate: [''],
      netrate: [''],
      grossrate: [''],
      taxrate: [''],
      IGST: [''],
      CGST: [''],
      SGST: [''],
      discount: [''],
      discountamt: [''],
      totaltax: [''],
      total: [''],

      totalitemno: [''],
      totalquantity: [''],
      totalgrossamt: [''],
      totaldiscountamt: [''],
      totaltaxamount: [''],
      totalnetamount: [''],
      deliverydate: [''],
      deliveryplace: [''],

      roundoff: [''],
      pretax: [''],
      posttax: [''],
      openingbalance: [''],
      closingbalance: [''],
      debit: [''],
      credit: [''],

      ttotal: [''],


    });

  }

  async onSubmit() {
    const fields = { quoteNumber: this.quoteNumber, custcode: this.custcode, custname: this.custcode }
    // const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', this.myform.value);
      const quotedata: quotestore = {
        billformate: this.myform.value.billformate,
        quoteNumber: this.myform.value.quoteNumber,
        quateDate: this.myform.value.quateDate,
        custcode: this.myform.value.custcode,
        custname: this.myform.value.custname,
        refrence: this.myform.value.refrence,
        refdate: this.myform.value.refdate,

        barcode: this.myform.value.barcode,
        itemcode: this.myform.value.itemcode,
        itemname: this.myform.value.itemname,
        description: this.myform.value.description,
        quantity: this.myform.value.quantity,
        unitname: this.myform.value.unitname,
        mrp: this.myform.value.mrp,
        basicrate: this.myform.value.basicrate,
        netrate: this.myform.value.netrate,
        grossrate: this.myform.value.grossrate,
        taxrate: this.myform.value.taxrate,
        CGST: this.myform.value.CGST,
        SGST: this.myform.value.SGST,
        IGST: this.myform.value.IGST,
        discount: this.myform.value.discount,
        discountamt: this.myform.value.discountamt,
        totaltax: this.myform.value.totaltax,
        total: this.myform.value.total,
        totalitemno: this.myform.value.totalitemno,
        totalquantity: this.myform.value.totalquantity,
        totalgrossamt: this.myform.value.totalgrossamt,
        totaldiscountamt: this.myform.value.totaldiscountamt,
        totaltaxamount: this.myform.value.totaltaxamount,
        totalnetamount: this.myform.value.totalnetamount,
        roundoff: this.myform.value.roundoff,
        pretax: '0',
        posttax: '0',
        deliverydate: '01/12/23',
        deliveryplace: 'jaipur',
        openingbalance: this.myform.value.openingbalance,
        closingbalance: this.myform.value.closingbalance,
        debit: this.myform.value.debit,
        credit: this.myform.value.credit,

        ttotal: this.myform.value.ttotal,
      };

      this.quote.createquote(quotedata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
            this.myform.reset()
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

  addQuote() {
    console.log('addquotewww' + this.quoteData.length);
    // You can initialize the new row data here
    const newRow: Quote = {
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description: '',
      quantity: 0,
      unitname: 0,
      mrp: 0,
      basicrate: 0,
      netrate: 0,
      grossrate: 0,
      taxrate: 0,
      CGST: 0,
      SGST: 0,
      IGST: 0,
      discount: 0,
      discountamt: 0,
      totaltax: 0,
      total: 0,
      // Add more properties as needed
    };
    this.quoteData.push(newRow);
  }
  calculateTotal(quote: Quote) {
    quote.total = quote.totaltax + quote.grossrate;
    this.calculateTotals();
  }

  removeQuote(index: number, quote: Quote) {
    this.ttotal = this.ttotal - quote.total;
    this.quoteData.splice(index, 1);
  }
  calculateTotals() {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.quoteData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.quoteData.reduce((total, quote) => total + quote.quantity, 0);
    this.totalGrossAmt = this.quoteData.reduce((total, quote) => total + (quote.grossrate * quote.quantity), 0);

    // Add similar calculations for other totals
  }
  // Inside your component class
  // Inside your component class
  getAllRows() {
    console.log('Number of Rows:', this.quoteData.length);

    for (let i = 0; i < this.quoteData.length; i++) {
      const quote = this.quoteData[i];
      console.log('Row:', quote);
    }
  }



  // calculateTotalSum() {
  //   let sum = 0;
  //   for (const row of this.quoteData) {
  //     sum += this.quote.total;
  //   }
  //   this.ttotal = sum;
  // }
  // async onSubmit() {
  //   if (this.quoteNumber === null) {
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Number is required",
  //       duration: 3000,
  //       color: 'danger',

  //     });
  //     toast.present();
  //   }else if(this.quateDate===''){
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Date is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   }else if(this.quoteGroup===''){
  //     const toast = await this.toastCtrl.create({
  //       message: "Quatation Group is required",
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //   
  //   }else{
  //     const toast = await this.toastCtrl.create({
  //       message: "Successfully !",
  //       duration: 3000,
  //       color: 'success',
  //       position:'top'
  //     });
  //     toast.present();
  //   }
  // }
  getTotalQuantity(): number {
    return this.quoteData.reduce((total, quote) => total + +quote.quantity, 0);
  }

  getTotalGrossAmount(): number {
    return this.quoteData.reduce((total, quote) => total + (+quote.grossrate * +quote.quantity), 0);
  }

  getTotalnetAmount(): number {
    return this.quoteData.reduce((total, quote) => total + (((quote.basicrate * quote.quantity) + quote.taxrate) - quote.discount), 0)
  }
  getTotalTaxAmount(): number {
    return this.quoteData.reduce((total, quote) => total + (+quote.totaltax * +quote.quantity), 0);
  }
  getTotalDiscountAmount(): number {
    return this.quoteData.reduce((total, quote) => total + (+quote.grossrate * quote.discount / 100), 0);
  }
  //table formaula
  getnetrate(quote: Quote): number {
    return quote.basicrate + quote.totaltax;
  }
  getTotaltax(): number {
    return this.quoteData.reduce((total, quote) => total + (+quote.basicrate * +quote.taxrate / 100 * + quote.quantity), 0);
  }
  getgrossrate(quote: Quote): number {
    return quote.quantity * quote.basicrate;
  }

  getdiscountamt(quote: Quote): number {
    return (quote.discount / 100) * quote.basicrate * quote.quantity;
  }

  getTotalamt(quote: Quote): number {
    return quote.basicrate * quote.quantity + quote.totaltax - quote.discountamt;
  }
  getcgst(quote: Quote): number {
    return quote.taxrate / 2;
  }

  getsgst(quote: Quote): number {
    return quote.taxrate / 2;
  }

  getigst(quote: Quote): number {
    return quote.taxrate;
  }
  ngOnInit() {
    // Other initialization logic...

    // Subscribe to value changes of basicrate, taxrate, and discount
    this.myform.get('basicrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('discount')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());

  }

  calculateNetRate() {
    // Add your logic to calculate netrate based on basicrate, taxrate, and discount
    const basicrate = this.myform.get('basicrate')?.value ?? 0; // Use the nullish coalescing operator to provide a default value if null
    const taxrate = this.myform.get('taxrate')?.value ?? 0;
    const discount = this.myform.get('discount')?.value ?? 0;
    const grossrate = this.myform.get('grossrate')?.value ?? 0;
    const quantity = this.myform.get('quantity')?.value ?? 0;

    // Perform the calculation and update the netrate in the form
    const gstAmount = (discount / 100) * basicrate * quantity;
    const netrate = basicrate + taxrate;
    this.myform.get('netrate')?.setValue(netrate);

  }

  goBack() {
    this.router.navigate(['/transactiondashboard']); // Navigate back to the previous page
  }

  onSelectChange(select: HTMLSelectElement) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      // Use numericValue as needed
    } else {
      console.error('Selected text does not represent a valid number.');
    }
  }

  // checkFocus(custcodeValue: string) {
  //   // console.log('Element lost focus. ccode value:', custcodeValue);
  //   this.myaction(val + '');
  //   console.log("checkfocusss  " + val);
  //   }

  checkFocus(val: number) {
    this.myaction(val + '');
    console.log("checkfocusss  " + val);
  }
  myaction(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
