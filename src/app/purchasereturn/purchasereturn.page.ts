import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { ExecutiveService } from '../services/executive.service';
import { PurchasereturnService, purchasereturnstore } from '../services/purchasereturn.service';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs';
import { AdditemService } from '../services/additem.service';
import { EncryptionService } from '../services/encryption.service';
import { FormValidationService } from '../form-validation.service';
interface Purchase {
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
  selector: 'app-purchasereturn',
  templateUrl: './purchasereturn.page.html',
  styleUrls: ['./purchasereturn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class PurchasereturnPage implements OnInit {
  form: any;
  billNumber: number = 0;
  billDate: string = '';
  frombill: number = 0;
  payment: number = 0;
  supplier: number = 0;
  gstin: number = 0;
  exicutive: number = 0;

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
  totaltax: number = 0;
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
  purchaseData: Purchase[] = [{
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

  refrence: string = '';
  refdate: string = '';
  purchase: any;
  billformate: number = 0;
  vendcode: string = '';
  orderDate: string = '';
  orderNumber: string = '';
  executive$: any;
  myform: FormGroup;
  purchaseService: any;
  supplier$: Observable<any>;
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

  constructor(private encService: EncryptionService, private vendname1: VendorService, private itemsname: AdditemService, private formBuilder: FormBuilder, private execut: ExecutiveService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private purchasereturnService: PurchasereturnService,private formService: FormValidationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.executive$ = this.execut.getexecutive();
    this.itemnames$ = this.itemsname.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    this.billDate = new Date().toLocaleDateString();
    this.refdate = new Date().toLocaleDateString();
    this.deliverydate = new Date().toLocaleDateString();
    this.orderDate = new Date().toLocaleDateString();


    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: [''],
      billDate: [''],
      vendcode: [''],
      supplier: [''],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      gstin: [''],
      payment: [''],
      executive$: ['', Validators.required],
      frombill: [''],


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

  async onSubmit(purchaseData: any) {
    const fields = { billNumber:this.billNumber,supplier:this.supplier,vendcode:this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.myform.value);
    let purchasereturndata: purchasereturnstore = {
      billNumber: this.myform.value.billNumber,
      billDate: this.myform.value.billDate,
      billformate: this.myform.value.billformate,
      payment: this.myform.value.payment,
      supplier: this.myform.value.supplier,
      gstin: this.myform.value.gstin,
      exicutive$: this.myform.value.exicutive$,
      taxrate$: this.myform.value.taxrate$,
      refrence: this.myform.value.refrence,
      refdate: this.myform.value.refdate,
      vendcode: this.myform.value.vendcode,
      orderDate: this.myform.value.orderDate,
      orderNumber: this.myform.value.orderNumber,
      frombill: this.myform.value.frombill,

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
    this.purchasereturnService.createpurchasereturn(purchasereturndata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        setTimeout(() => {
          this.formService.showSuccessAlert();
          this.myform.reset();
        }, 1000);
        this.formService.showSaveLoader();

      },
      (error:any) =>{
       console.log('POST request failed',error);
       setTimeout(() => {
        this.formService.showFailedAlert();
       }, 1000);
       this.formService.shoErrorLoader();
      }
    );
  }  else {
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
  addPurchase() {
    console.log('addrowwww' + this.purchaseData.length);
    // You can initialize the new row data here
    const newRow: Purchase = {
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
    this.purchaseData.push(newRow);
  }
  removePurchase(index: number, row: Purchase) {
    this.ttotal = this.ttotal - this.purchase.total;
    this.purchaseData.splice(index, 1);
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.purchaseData) {
      sum += this.purchase.total;
    }
    this.ttotal = sum;
  }
  getAllRows() {
    console.log('Number of Rows:', this.purchaseData.length);

    for (let i = 0; i < this.purchaseData.length; i++) {
      const quote = this.purchaseData
      [i];
      console.log('Row:', quote);
    }
  }

  calculateTotals() {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.purchaseData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.purchaseData.reduce((total, purchase) => total + purchase.quantity, 0);
    this.totalGrossAmt = this.purchaseData.reduce((total, purchase) => total + purchase.grossrate, 0);

    // Add similar calculations for other totals
  }

  getTotalQuantity(): number {
    return this.purchaseData.reduce((total, purchase) => total + +purchase.quantity, 0);
  }

  getTotalGrossAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (+purchase.grossrate * +purchase.quantity), 0);
  }

  getTotalnetAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (((purchase.basicrate * purchase.quantity) + purchase.taxrate)  - purchase.discount), 0)
  }
  getTotalTaxAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (+purchase.totaltax* +purchase.quantity), 0);
  }
  getTotalDiscountAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (+purchase.grossrate * purchase.discount / 100), 0);
  }
 //table formaula
  getnetrate(purchase: Purchase): number {
   return purchase.basicrate  + purchase.totaltax;
   }
  getTotaltax(): number {
    return this.purchaseData.reduce((total, purchase) => total + (+purchase.basicrate * +purchase.taxrate/100 * + purchase.quantity), 0);
  }
  getgrossrate(purchase: Purchase): number {
    return purchase.quantity * purchase.basicrate;
  }
 
  getdiscountamt(purchase: Purchase): number {
    return (purchase.discount/100) * purchase.basicrate * purchase.quantity;
  }
  
  getTotalamt(purchase:Purchase): number {
    return purchase.basicrate * purchase.quantity + purchase.totaltax - purchase.discountamt;
  }
  getcgst(purchase:Purchase): number {
    return purchase.taxrate/2;
  }
  getsgst(purchase:Purchase): number {
    return purchase.taxrate/2;
  }
  getigst(purchase:Purchase): number {
    return purchase.taxrate;
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
    const gstAmount = (discount / 100)*basicrate*quantity;
    const netrate = basicrate + taxrate;
    this.myform.get('netrate')?.setValue(netrate);
  }
  goBack() {
    this.router.navigate(["/transcationdashboard"])
  }
}