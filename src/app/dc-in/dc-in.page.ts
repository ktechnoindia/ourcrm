import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcinService, dcinstore } from '../services/dcin.service';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../form-validation.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { NgForm } from '@angular/forms';
import { AdditemService } from '../services/additem.service';
import { VendorService } from '../services/vendor.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
interface Dcin {
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
  taxrate1: number;

}
@Component({
  selector: 'app-dc-in',
  templateUrl: './dc-in.page.html',
  styleUrls: ['./dc-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule]
})
export class DcInPage implements OnInit {

  voucherformat: number = 0;
  voucherNumber: string = '';
  datetype: string = '';
  vendcode: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate: string = '';
  // ponumber: string = '';

  //table data
  /* barcode: string = '';
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
   total: string = '';*/

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

  dcinData: Dcin[] = [{
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
    taxrate1: 0,

  }];

  ttotal!: number;
  myform: FormGroup;
  supplier$: any;
  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;
  itemnames$: Observable<any[]>;
  unitname$: Observable<any[]>;
  taxrate$: Observable<any[]>;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private encService: EncryptionService, private formBuilder: FormBuilder, private vendname1: VendorService, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private dcinService: DcinService, private formService: FormValidationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.itemnames$ = this.itemService.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    this.datetype = new Date().toLocaleDateString();
    this.refdate = new Date().toLocaleDateString();
    this.deliverydate = new Date().toLocaleDateString();


    this.myform = this.formBuilder.group({
      voucherformat: [''],
      voucherNumber: ['', Validators.required],
      datetype: [''],
      vendcode: ['', Validators.required],
      suppliertype: ['', Validators.required],
      referenceNumber: [''],
      refdate: [''],
      // ponumber: [''],

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
      discountType: ['amount'], // 'amount' or 'percentage'

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

    })

  }

  async onSubmit() {

    const fields = { voucherNumber: this.voucherNumber, suppliertype: this.suppliertype, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.myform.value);

      let dcindata: dcinstore = {
        voucherformat: this.myform.value.voucherformat,
        voucherNumber: this.myform.value.voucherNumber,
        datetype: this.myform.value.datetype,
        vendcode: this.myform.value.vendcode,
        suppliertype: this.myform.value.suppliertype,
        referenceNumber: this.myform.value.referenceNumber,
        refdate: this.myform.value.refdate,
        // ponumber: this.myform.value.ponumber,

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
        pretax: this.myform.value.pretax,
        posttax: this.myform.value.posttax,
        deliverydate: this.myform.value.deliverydate,
        deliveryplace: this.myform.value.deliveryplace,
        openingbalance: this.myform.value.openingbalance,
        closingbalance: this.myform.value.closingbalance,
        debit: this.myform.value.debit,
        credit: this.myform.value.credit,

      };

      this.dcinService.createdcin(dcindata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
          this.formService.showSaveLoader();

        },
        (error: any) => {
          console.log('POST request failed', error);
          setTimeout(() => {
            this.formService.showFailedAlert();
          }, 1000);
          this.formService.shoErrorLoader();
        }
      );
    } else {
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


  addDcin() {
    console.log('addrowwww' + this.dcinData.length);
    // You can initialize the new row data here
    const newRow: Dcin = {
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
      taxrate1: 0,

      // Add more properties as needed
    };
    this.dcinData.push(newRow);
  }
  removeDcin(index: number, row: Dcin) {
    this.ttotal = this.ttotal - this.dcinService.total;
    this.dcinData.splice(index, 1);
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.dcinData) {
      sum += this.dcinService.total;
    }
    this.ttotal = sum;
  }
  calculateTotals() {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.dcinData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.dcinData.reduce((total, dcin) => total + dcin.quantity, 0);
    this.totalGrossAmt = this.dcinData.reduce((total, dcin) => total + dcin.grossrate, 0);

    // Add similar calculations for other totals
  }
  getAllRows() {
    console.log('Number of Rows:', this.dcinData.length);

    for (let i = 0; i < this.dcinData.length; i++) {
      const quote = this.dcinData[i];
      console.log('Row:', quote);
    }
  }
  getTotalQuantity(): number {
    return this.dcinData.reduce((total, dcin) => total + +dcin.quantity, 0);

  }

  getTotalGrossAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (+dcin.grossrate * +dcin.quantity), 0);
  }

  getTotalnetAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (((dcin.basicrate * dcin.quantity) + dcin.taxrate1) - dcin.discount), 0)
  }
  getTotalTaxAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (+dcin.totaltax), 0);
  }
  getTotalDiscountAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (+dcin.grossrate * dcin.discount / 100), 0);
  }
  //table formaula
  getnetrate(dcin: Dcin): number {
    return dcin.basicrate + (dcin.taxrate1 / 100 * dcin.basicrate);
  }
  getTotaltax(dcin: Dcin): number {
    return dcin.quantity * (dcin.taxrate1 / 100 * dcin.basicrate);
        //return this.quoteData.reduce((total, quote) => total + (+quote.basicrate * +quote.taxrate1 / 100 * + quote.quantity), 0);

  }
  getgrossrate(dcin: Dcin): number {
    return dcin.quantity * dcin.basicrate;
  }

  getdiscountamt(dcin: Dcin): number {
    const discountamt = dcin.discountamt || 0; // handle null/undefined values
    const basicrate = dcin.basicrate || 0; // handle null/undefined values
    const quantity = dcin.quantity || 0; // handle null/undefined values
    // calculate discount percentage
    const discount = (discountamt / (basicrate * quantity)) * 100;
    // update discount percentage
    dcin.discount = discount;
    // return discount amount for display
    return discountamt;
  }
  getdiscountp(dcin: Dcin) {
    dcin.discountamt = dcin.total * (dcin.discount / 100);
    dcin.total = dcin.total - dcin.total * (dcin.discount / 100)
  }
  getTotalamt(dcin: Dcin): number {
    return (dcin.basicrate * dcin.quantity) + (dcin.quantity * (dcin.taxrate1 / 100 * dcin.basicrate)) - dcin.discountamt;
  }
  getcgst(dcin: Dcin): number {
    return dcin.taxrate1 / 2;
  }
  getsgst(dcin: Dcin): number {
    return dcin.taxrate1 / 2;
  }
  getigst(dcin: Dcin): number {
    return dcin.taxrate1;
  }
  ngOnInit() {
    // Other initialization logic...

    // Subscribe to value changes of basicrate, taxrate, and discount
    this.myform.get('basicrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());

    this.myform.get('discount')?.valueChanges.subscribe(() => {
      this.calculateDiscount();
      this.calculateNetRate();
    });
    this.myform.get('discountamt')?.valueChanges.subscribe(() => {
      this.calculateDiscountPercentage();
    }); 
  }
  calculateDiscountPercentage() {
    // Calculate discount percentage based on discountamt
  const discountamt = this.myform.get('discountamt')?.value ?? 0;
  const basicrate = this.myform.get('basicrate')?.value ?? 0;
  const quantity = this.myform.get('quantity')?.value ?? 0;

  const discountPercentage = (discountamt / (basicrate * quantity)) * 100;
  }
  calculateDiscount() {
    const discountType = this.myform.get('discountType')?.value;
    const discount = +this.myform.get('discount')?.value || 0;
    const basicrate = +this.myform.get('basicrate')?.value || 0;
    const quantity = +this.myform.get('quantity')?.value || 0;
  
    if (discountType === 'amount') {
      // Calculate discount amount based on user-entered amount
      const discountAmt = discount;
      this.myform.get('discountAmt')?.setValue(discountAmt, { emitEvent: false });
    } else if (discountType === 'percentage') {
      // Calculate discount amount based on user-entered percentage
      const discountAmt = (discount / 100) * basicrate * quantity;
      this.myform.get('discountAmt')?.setValue(discountAmt, { emitEvent: false });
    }
    
  }
  calculateDiscountAmt() {
    // Calculate discountamt based on discount percentage
    const discount = this.myform.get('discount')?.value ?? 0;
    const basicrate = this.myform.get('basicrate')?.value ?? 0;
    const quantity = this.myform.get('quantity')?.value ?? 0;
  
    const discountamt = (discount / 100) * basicrate * quantity;
  
    // Update the discountamt in the form
    this.myform.get('discount')?.setValue(discountamt, { emitEvent: false }); // Avoid triggering an infinite loop
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
    this.router.navigate(["/transcationdashboard"])
  }
  onSelectChange(select: HTMLSelectElement, dcin: Dcin) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      dcin.taxrate1=numericValue;

      // Use numericValue as needed
    } else {
      dcin.taxrate1 = 0;

      console.error('Selected text does not represent a valid number.');
    }
  }

}
