import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,NgForm,ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { PurchaseService,purchasestore } from '../services/purchase.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';
import { VendorService } from '../services/vendor.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
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
  taxrate1:number;

}
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})


export class AddPurchasePage implements OnInit {

form:any;
billformate:number=0;
  billNumber: number = 0;
  billDate: string = '';
  vendcode:string='';
  supplier: number = 0;
  refrence:string='';
  refdate:string='';
  orderDate:string='';
  orderNumber:string='';
  ponumber:string='';
  gstin: number = 0;
  payment: number = 0;

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
  totaltax: number = 0;
  total: string = '';
  */
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
  executivename:number=0;
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
    taxrate1:0,

  }];
  ttotal!: number;
 
  purchase: any;
  executive$: any;
  myform: FormGroup;
  supplier$: any;
  itemnames$: Observable<any[]>; 
  unitname$: Observable<any[]>; 
  taxrate$: Observable<any[]>; 
  otalItemNo: number = 0;
  totalItemNo:number=0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private encService: EncryptionService,private vendname1:VendorService,private formBuilder: FormBuilder,private itemService:AdditemService,private execut: ExecutiveService,private purchaseService:PurchaseService,private unittype: UnitnameService, private gstsrvs: GsttypeService,private router: Router, private toastCtrl: ToastController,private formService: FormValidationService) { 
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.executive$ = this.execut.getexecutive();
    this.itemnames$ = this.itemService.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    this.billDate= new Date().toLocaleDateString();
    this.refdate=  new Date().toLocaleDateString();
    this.deliverydate= new Date().toLocaleDateString();
    this.orderDate= new Date().toLocaleDateString();

    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: ['',Validators.required],
      billDate:  [''],
      vendcode: ['',Validators.required],
      supplier: ['',Validators.required],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      ponumber: [''],
      gstin:  [''],
      payment:  [''],
      // executive$: ['', Validators.required],
      executivename:[''],
      
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

  async onSubmit(purchaseData: any) {
    const fields = { billNumber:this.billNumber,supplier:this.supplier,vendcode:this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.myform.value);
    let purchasedata: purchasestore = {
      billNumber: this.myform.value.billNumber,
      billDate: this.myform.value.billDate,
      billformate: this.myform.value.billformate,
      payment: this.myform.value.payment,
      supplier: this.myform.value.supplier,
      gstin: this.myform.value.gstin,
      executive$: this.myform.value.executive$,
      taxrate$: this.myform.value.taxrate$,
      refrence: this.myform.value.refrence,
      refdate: this.myform.value.refdate,
      vendcode: this.myform.value.vendcode,
      orderDate: this.myform.value.orderDate,
      orderNumber: this.myform.value.orderNumber,
      ponumber: this.myform.value.ponumber,


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
    this.purchaseService.createpurchase(purchasedata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        setTimeout(() => {
          this.formService.showSuccessAlert();
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

  getItems() {
    const compid = 1; // Replace with your actual dynamic value
    const itemid = 1;  
    this.itemService.getItems(compid,itemid).subscribe(
      (data) => {
        // Handle the data and update your component properties
        console.log('response',data);

          this.purchaseData[0].itemcode = data[0].itemCode;
          this.purchaseData[0].itemname = data[0].itemDesc;
          this.purchaseData[0].unitname = data[0].selectunitname;
          this.purchaseData[0].taxrate = data[0].selectGst;
          this.purchaseData[0].barcode = data[0].barcode;
        
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  addPurchase() {
    console.log('addrowwww'+this.purchaseData.length);
    // You can initialize the new row data here
    const newRow :Purchase= {
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description:'',
      quantity:0,
      unitname:0,
      mrp:0,
      basicrate:0,
      netrate:0,
      grossrate:0,
      taxrate:0,
      CGST:0,
      SGST:0,
      IGST:0,
      discount:0,
      discountamt:0,
      totaltax:0,
      total:0,
      taxrate1:0,

      // Add more properties as needed
    };
    this.purchaseData.push(newRow);
  }
  removePurchase(index: number,row:Purchase) {
    this.ttotal=this.ttotal-this.purchase.total;
    this.purchaseData.splice(index, 1);
  }
  getAllRows() {
    console.log('Number of Rows:', this.purchaseData.length);
  
    for (let i = 0; i < this.purchaseData.length; i++) {
      const quote = this.purchaseData[i];
      console.log('Row:', quote);
    }
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.purchaseData) {
      sum += this.purchase.total;
    }
    this.ttotal= sum;
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
    return this.purchaseData.reduce((total, purchase) => total + (((purchase.basicrate * purchase.quantity) + purchase.taxrate1)  - purchase.discount), 0)
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
  getTotaltax(purchase:Purchase): number {
    return purchase.quantity *(purchase.taxrate1/100*purchase.basicrate);
  }
  getgrossrate(purchase: Purchase): number {
    return purchase.quantity * purchase.basicrate;
  }
 
  getdiscountamt(purchase: Purchase): number {const discountamt = purchase.discountamt || 0; // handle null/undefined values
  const basicrate = purchase.basicrate || 0; // handle null/undefined values
  const quantity = purchase.quantity || 0; // handle null/undefined values
  // calculate discount percentage
  const discount = (discountamt / (basicrate * quantity)) * 100;
  // update discount percentage
  purchase.discount = discount;
  // return discount amount for display
  return discountamt;
  }
  getdiscountp(purchase: Purchase) {
    purchase.discountamt=purchase.total*(purchase.discount/100);
    purchase.total=purchase.total-purchase.total*(purchase.discount/100) 
  }
  getTotalamt(purchase:Purchase): number {
    return purchase.basicrate * purchase.quantity + purchase.totaltax - purchase.discountamt;
  }
  getcgst(purchase:Purchase): number {
    return purchase.taxrate1/2;
  }
  getsgst(purchase:Purchase): number {
    return purchase.taxrate1/2;
  }
  getigst(purchase:Purchase): number {
    return purchase.taxrate1;
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
   calculateDiscountAmt() {
    // Calculate discountamt based on discount percentage
    const discount = this.myform.get('discount')?.value ?? 0;
    const basicrate = this.myform.get('basicrate')?.value ?? 0;
    const quantity = this.myform.get('quantity')?.value ?? 0;
  
    const discountamt = (discount / 100) * basicrate * quantity;
  
    // Update the discountamt in the form
    this.myform.get('discount')?.setValue(discountamt, { emitEvent: false }); // Avoid triggering an infinite loop
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
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }
  onSelectChange(select: HTMLSelectElement,purchase:Purchase) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      purchase.taxrate1=numericValue;

      // Use numericValue as needed
    } else {
      purchase.taxrate1=0;

      console.error('Selected text does not represent a valid number.');
    }
  }
}
