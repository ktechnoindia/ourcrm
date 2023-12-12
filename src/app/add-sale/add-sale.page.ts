import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SalesService, salesstore } from '../services/sales.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { AdditemService } from '../services/additem.service';
import { CustomerService } from '../services/customer.service';
import { EncryptionService } from '../services/encryption.service';
import { ExecutiveService } from '../services/executive.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
// import { quotestore } from '../services/quotation.service';

interface Sales {
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
  selector: 'app-add-sale',
  templateUrl: './add-sale.page.html',
  styleUrls: ['./add-sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AddSalePage implements OnInit {
  billformate: number = 0;
  billNumber: number = 0;
  billDate: string = '';
  custcode: string = '';
  custname: number = 0;
  refrence: string = '';
  refdate: string = '';
  orderDate: string = '';
  orderNumber: string = '';
  // ponumber: string = '';
  gstin: number = 0;
  salePerson: number = 0;
  payment: number = 0;

  //table data
  /*barcode: string = '';
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
  salesData: Sales[] = [{
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
  ttotal:  number = 0;
  myform: FormGroup;
 

  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;
  customer$: any;
  executive$: any;
  itemnames$: Observable<any[]>; 
  unitname$: Observable<any[]>; 
  taxrate$: Observable<any[]>; 

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private execut: ExecutiveService,private custname1:CustomerService, private encService: EncryptionService,private formBuilder: FormBuilder,private itemService:AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private saleService: SalesService, private formService: FormValidationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.executive$ = this.execut.getexecutive();
    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    this.billDate= new Date().toLocaleDateString();
    this.refdate=  new Date().toLocaleDateString();
    this.deliverydate= new Date().toLocaleDateString();
    this.orderDate= new Date().toLocaleDateString();

    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: ['',Validators.required],
      billDate: [''],
      custcode: ['',Validators.required],
      custname: ['',Validators.required],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      // ponumber: [''],
      gstin: [''],
      salePerson: [''],
      payment: [''],

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
    const fields = {billNumber:this.billNumber,custcode:this.custcode,custname:this.custname }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.myform.value);
    let saledata: salesstore = {
      billformate: this.myform.value.billformate,
      billNumber: this.myform.value.billNumber,
      billDate: this.myform.value.billDate,
      custcode: this.myform.value.custcode,
      custname: this.myform.value.custname,
      refdate: this.myform.value.refdate,
      refrence: this.myform.value.refrence,
      orderDate: this.myform.value.orderDate,
      orderNumber: this.myform.value.orderNumber,
      // ponumber: this.myform.value.ponumber,
      gstin: this.myform.value.gstin,
      salePerson: this.myform.value.salePerson,
      payment: this.myform.value.payment,

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
      ttotal: this.myform.value.ttotal,

    };
    this.saleService.createsale(saledata, '', '').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        setTimeout(() => {
          this.formService.showSuccessAlert();
        }, 1000);
        this.formService.showSaveLoader();
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
  const companyId = 1; // Replace with your actual dynamic value
  const itemIds = this.salesData.map(dcin => dcin.itemcode);

  this.itemService.getItems(companyId, itemIds).subscribe(
    (data) => {
      // Handle the data and update your component properties
      console.log('response', data);

      data.forEach((item, index) => {
        const matchingDcin = this.salesData.find(dcin => dcin.itemcode === item.itemCode);

        if (matchingDcin) {
          matchingDcin.itemname = item.itemDesc;
          matchingDcin.itemcode = item.itemCode;
          matchingDcin.taxrate = item.selectGst;
          matchingDcin.unitname = item.selectunitname;
          matchingDcin.barcode = item.barcode;
          // Update other properties as needed
        }
      });
    },
    (error) => {
      console.error('Error fetching data', error);
    }
  );
}

  addSales() {
    console.log('addrowwww' + this.salesData.length);
    // You can initialize the new row data here
    const newRow: Sales = {
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

      // Add more properties as needed
    };
    this.salesData.push(newRow);
  }
  calculateTotal(sales: Sales) {
    sales.total = sales.totaltax + sales.grossrate;
    this.calculateTotals();
  }
  removeSales(index: number, sales: Sales) {
    this.ttotal = this.ttotal - this.saleService.total;
    this.salesData.splice(index, 1);
  }
  calculateTotals(): void {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.salesData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.salesData.reduce((total, sale) => total + sale.quantity, 0);
    this.totalGrossAmt = this.salesData.reduce((total, sale) => total + sale.grossrate, 0);

    // Add similar calculations for other totals
  }

  getAllRows() {
    console.log('Number of Rows:', this.salesData.length);
  
    for (let i = 0; i < this.salesData.length; i++) {
      const quote = this.salesData[i];
      console.log('Row:', quote);
    }
  }
  // calculateTotalSum() {
  //   let sum = 0;
  //   for (const sales of this.salesData) {
  //     sum += sales.total;

  //   }
  //   this.ttotal = sum;
    
  // }

  // if (this.form.valid) {
  //   console.log('Selected Value' + this.form.value);
  // } else {
  //   Object.keys(this.form.controls).forEach(controlName => {
  //     const control = this.form.get(controlName);
  //     if (control.invalid) {
  //       control.markAsTouched();
  //     }
  //   })
  // }
 
  getTotalQuantity(): number {
    return this.salesData.reduce((total, sale) => total + +sale.quantity, 0);
  }

  getTotalGrossAmount(): number {
    return this.salesData.reduce((total, sale) => total + (+sale.grossrate * +sale.quantity), 0);
  }

  getTotalnetAmount(): number {
    return this.salesData.reduce((total, sale) => total + (((sale.basicrate * sale.quantity) + sale.taxrate1)  - sale.discount), 0)
  }
  getTotalTaxAmount(): number {
    return this.salesData.reduce((total, sale) => total + (+sale.totaltax* +sale.quantity), 0);
  }
  getTotalDiscountAmount(): number {
    return this.salesData.reduce((total, sale) => total + (+sale.grossrate * sale.discount / 100), 0);
  }
 //table formaula
  getnetrate(sale: Sales): number {
   return sale.basicrate  + sale.totaltax;
   }
  getTotaltax(sale:Sales): number {
    return sale.quantity *(sale.taxrate1/100*sale.basicrate);
  }
  getgrossrate(sale: Sales): number {
    return sale.quantity * sale.basicrate;
  }
 
  getdiscountamt(sale: Sales): number {const discountamt = sale.discountamt || 0; // handle null/undefined values
  const basicrate = sale.basicrate || 0; // handle null/undefined values
  const quantity = sale.quantity || 0; // handle null/undefined values
  // calculate discount percentage
  const discount = (discountamt / (basicrate * quantity)) * 100;
  // update discount percentage
  sale.discount = discount;
  // return discount amount for display
  return discountamt;
}
  getdiscountp(sale: Sales) {
    const discountPercentage = sale.discount || 0; // assuming discount is a property in your dcin object
    const basicrate = sale.basicrate || 0; // handle null/undefined values
    const quantity = sale.quantity || 0; // handle null/undefined values
  
    // calculate discount amount based on the entered percentage
    const discountAmt = (discountPercentage / 100) * basicrate * quantity;
  
    // update discount amount
    sale.discountamt = discountAmt;
  
    // return discount amount for display
    return discountAmt;
  }
  calculateDiscountAmount(sale: Sales): number {
    const discountType = this.myform.get('discountType')?.value;
    const basicrate = +sale.basicrate || 0;
    const quantity = +sale.quantity || 0;
  
    if (isNaN(basicrate) || isNaN(quantity)) {
      return 0;
    }
  
    if (discountType === 'amount') {
      return sale.discountamt || 0;
    } else if (discountType === 'percentage') {
      const discountPercentage = sale.discount || 0;
      return (discountPercentage / 100) * basicrate * quantity;
    }
  
    return 0;
  }
  getTotalamt(sale:Sales): number {
    return (sale.basicrate * sale.quantity)+ (sale.quantity * (sale.taxrate1/100*sale.basicrate))- this.calculateDiscountAmount(sale);
  }
  getcgst(sale:Sales): number {
    return sale.taxrate1/2;
  }
  getsgst(sale:Sales): number {
    return sale.taxrate1/2;
  }
  getigst(sale:Sales): number {
    return sale.taxrate1;
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
    calculateDiscountPercentage() {
      // Calculate discount percentage based on discountamt
    const discountamt = this.myform.get('discountamt')?.value ?? 0;
    const basicrate = this.myform.get('basicrate')?.value ?? 0;
    const quantity = this.myform.get('quantity')?.value ?? 0;
  
    const discountPercentage = (discountamt / (basicrate * quantity)) * 100;
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
  onSelectChange(select: HTMLSelectElement,sale:Sales) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      sale.taxrate1=numericValue;

      // Use numericValue as needed
    } else {
      sale.taxrate1=0;

      console.error('Selected text does not represent a valid number.');
    }
  }
}
