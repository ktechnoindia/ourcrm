import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { PurchaseService, purchasestore } from '../services/purchase.service';
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
  taxrate1: number;
  posttax: number;
  pretax: number;
  itemid: number;
}
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})


export class AddPurchasePage implements OnInit {

  form: any;
  billformate: number = 0;
  billNumber: number = 0;
  billDate: string = '';
  vendcode: string = '';
  supplier: number = 0;
  refrence: string = '';
  refdate: string = '';
  orderDate: string = '';
  orderNumber: string = '';
  ponumber: string = '';
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
  executivename: number = 0;
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
    taxrate1: 0,
    pretax: 0,
    posttax: 0,
    itemid: 0
  }];
  ttotal!: number;
  itemid: number = 0;
  companyid:number=0;
  userid:number=0;
  purchase: any;
  executive$: any;
  myform: FormGroup;
  supplier$: any;
  itemnames$: Observable<any[]>;
  unitname$: Observable<any[]>;
  taxrate$: Observable<any[]>;
  otalItemNo: number = 0;
  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor(private navCtrl: NavController, private encService: EncryptionService, private vendname1: VendorService, private formBuilder: FormBuilder, private itemService: AdditemService, private execut: ExecutiveService, private purchaseService: PurchaseService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private formService: FormValidationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.executive$ = this.execut.getexecutive();
    this.itemnames$ = this.itemService.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    this.billDate = new Date().toISOString().split('T')[0];
    this.refdate = new Date().toISOString().split('T')[0];
    this.deliverydate = new Date().toISOString().split('T')[0];
    this.orderDate = new Date().toISOString().split('T')[0];

    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: ['', Validators.required],
      billDate: [''],
      vendcode: ['', Validators.required],
      supplier: ['', Validators.required],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      ponumber: [''],
      gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      payment: [''],
      // executive$: ['', Validators.required],
      executivename: [''],

      //table
      barcode: [''],
      itemcode: 0,
      itemname: [''],
      description: [''],
      quantity: 0,
      unitname: 0,
      mrp: 0,
      basicrate: 0,
      netrate: 0,
      grossrate: 0,
      taxrate: 0,
      IGST: 0,
      CGST: 0,
      SGST: 0,
      discount: 0,
      discountamt: 0,
      totaltax: 0,
      total: 0,
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
      itemid: [0],
      ttotal: [''],
      companyid: [0],
      userid: [0],
    })
  }

  async onSubmit(form: FormGroup, purchaseData: Purchase[]) {
    const fields = { billNumber: this.billNumber, supplier: this.supplier, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);


    if (await this.formService.validateForm(fields)) {
      for (const element of purchaseData) {

        element.grossrate = element.basicrate * element.quantity;
        element.netrate = element.basicrate + element.taxrate1;
        element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = element.quantity * (element.taxrate1 / 100 * element.basicrate)
        console.log('Your form data : ', this.myform.value);
        const companyid = 1;
        const userid = 1;
        let purchases: purchasestore[] = [];

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

          barcode: element.barcode,
          itemcode: element.itemcode,
          itemname: element.itemname,
          description: element.description,
          quantity: element.quantity,
          unitname: element.unitname,
          mrp: element.mrp,
          basicrate: element.basicrate,
          netrate: element.netrate,
          grossrate: element.grossrate, // Add grossrate
          taxrate: element.taxrate,
          IGST: element.IGST,
          CGST: element.CGST,
          SGST: element.SGST,
          discount: element.discount,
          discountamt: element.discountamt,
          totaltax: element.totaltax,
          total: element.total,
          totalitemno: this.myform.value.totalitemno,
          totalquantity: this.myform.value.totalquantity,
          totalgrossamt: this.myform.value.totalgrossamt,
          totaldiscountamt: this.myform.value.totaldiscountamt,
          totaltaxamount: this.myform.value.totaltaxamount,
          totalnetamount: this.myform.value.totalnetamount,
          roundoff: this.myform.value.roundoff,
          pretax: element.pretax,
          posttax: element.posttax,
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          openingbalance: this.myform.value.openingbalance,
          closingbalance: this.myform.value.closingbalance,
          debit: this.myform.value.debit,
          credit: this.myform.value.credit,
          itemid: element.itemid,
          companyid: companyid,
          userid: userid,
        };

        purchases.push(purchasedata);
        this.purchaseService.createpurchase(purchases, '', '').subscribe(
          (response: any) => {
            console.log('POST request successful', response);
            setTimeout(() => {
              this.formService.showSuccessAlert();
            }, 1000);
            this.formService.showSaveLoader();
            this.form.reset();
          },
          (error: any) => {
            console.log('POST request failed', error);
            setTimeout(() => {
              this.formService.showFailedAlert();
            }, 1000);
            this.formService.shoErrorLoader();
          }
        );
      }
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
  };


  getItems(sales: any) {
    const compid = 1;
    const identifier = sales.itemcode ? 'itemname' : 'itemcode';
    const value = sales.itemcode;

    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          sales.itemid = itemDetails.tid;
          sales.itemcode = itemDetails.itemCode;
          sales.itemname = itemDetails.itemDesc.valueOf();
          sales.barcode = itemDetails.barcode.toString();
          sales.unitname = itemDetails.unitname;
          sales.taxrate = itemDetails.selectGst;

          // Update form control values
          this.myform.patchValue({
            itemcode: sales.itemcode,
            itemname: sales.itemname,
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

  getSuppliers(event: any) {
    const compid = '1';
    const identifier = this.vendcode ? 'suppliertype' : 'vendcode';
    const value = this.vendcode;

    this.vendname1.fetchallVendor(compid, value, '').subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.vendcode = itemDetails.vendor_code.toString();
          event.suppliertype = itemDetails.name;


          // Update form control values
          this.myform.patchValue({
            vendcode: itemDetails.vendcode,
            suppliertype: itemDetails.suppliertype,
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
      taxrate1: 0,
      pretax: 0,
      posttax: 0,
      itemid:0
      // Add more properties as needed
    };
    this.purchaseData.push(newRow);
  };

  onNew() {
    location.reload();
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }

  removePurchase(index: number, row: Purchase) {
    this.ttotal = this.ttotal - this.purchase.total;
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
    this.ttotal = sum;
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
    const totalGrossAmount = this.purchaseData.reduce((total, purchase) => {
      const grossAmount = purchase.quantity * purchase.basicrate;
      return total + grossAmount;
    }, 0);

    return totalGrossAmount;
  }
  getTotalnetAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (((purchase.basicrate * purchase.quantity) + purchase.taxrate1) - purchase.discount), 0)
  }
  getGrandTotal(): number {
    const grandTotal = this.purchaseData.reduce((total, purchase) => {
      const itemTotal = (((+purchase.pretax + purchase.posttax) + (purchase.basicrate * purchase.quantity) + purchase.taxrate1) - purchase.discount);
      return total + itemTotal;
    }, 0);

    return grandTotal;
  }
  getTotalTaxAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (purchase.taxrate1 / 100 * purchase.basicrate) * purchase.quantity, 0);
  }
  getTotalDiscountAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (purchase.discount / 100) * purchase.basicrate * purchase.quantity, 0);
  }
  getRoundoff(): number {
    // Calculate the total amount without rounding
    const totalAmount = this.purchaseData.reduce((total, purchase) => total + (((purchase.basicrate * purchase.quantity) + purchase.taxrate1) - purchase.discount), 0);

    // Use the toFixed method to round off the total to the desired number of decimal places
    const roundedTotalAmount = +totalAmount.toFixed(2); // Change 2 to the desired number of decimal places

    return roundedTotalAmount;
  }
  //table formaula
  getnetrate(purchase: Purchase): number {
    return purchase.basicrate + purchase.totaltax;
  }
  getTotaltax(purchase: Purchase): number {
    return purchase.quantity * (purchase.taxrate1 / 100 * purchase.basicrate);
  }
  getgrossrate(purchase: Purchase): number {
    return purchase.quantity * purchase.basicrate;
  }

  getdiscountamt(purchase: Purchase): number {
    const discountamt = purchase.discountamt || 0; // handle null/undefined values
    const basicrate = purchase.basicrate || 0; // handle null/undefined values
    const quantity = purchase.quantity || 0; // handle null/undefined values
    // calculate discount percentage
    const discount = (discountamt / (basicrate * quantity)) * 100;
    // update discount percentage
    purchase.discount = discount;
    // return discount amount for display
    return discountamt;
  }
  calculateDiscountAmount(purchase: Purchase): number {
    const discountType = this.myform.get('discountType')?.value;
    const basicrate = +purchase.basicrate || 0;
    const quantity = +purchase.quantity || 0;

    if (isNaN(basicrate) || isNaN(quantity)) {
      return 0;
    }

    if (discountType === 'amount') {
      return purchase.discountamt || 0;
    } else if (discountType === 'percentage') {
      const discountPercentage = purchase.discount || 0;
      return (discountPercentage / 100) * basicrate * quantity;
    }

    return 0;
  }
  getdiscountp(purchase: Purchase) {
    const discountPercentage = purchase.discount || 0; // assuming discount is a property in your dcin object
    const basicrate = purchase.basicrate || 0; // handle null/undefined values
    const quantity = purchase.quantity || 0; // handle null/undefined values

    // calculate discount amount based on the entered percentage
    const discountAmt = (discountPercentage / 100) * basicrate * quantity;

    // update discount amount
    purchase.discountamt = discountAmt;

    // return discount amount for display
    return discountAmt;
  }
  getTotalamt(purchase: Purchase): number {
    return (purchase.basicrate * purchase.quantity) + (purchase.quantity * (purchase.taxrate1 / 100 * purchase.basicrate)) - this.calculateDiscountAmount(purchase);
  }
  getcgst(quote: Purchase): number {
    return ((quote.taxrate1 / 100 * quote.basicrate) * quote.quantity) / 2;
  }

  getsgst(quote: Purchase): number {
    return ((quote.taxrate1 / 100 * quote.basicrate) * quote.quantity) / 2;
  }

  getigst(quote: Purchase): number {
    return (quote.taxrate1 / 100 * quote.basicrate) * quote.quantity;
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
    const gstAmount = (discount / 100) * basicrate * quantity;
    const netrate = basicrate + taxrate;
    this.myform.get('netrate')?.setValue(netrate);
  }
  goBack() {
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }
  onSelectChange(select: HTMLSelectElement, purchase: Purchase) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      purchase.taxrate1 = numericValue;

      // Use numericValue as needed
    } else {
      purchase.taxrate1 = 0;

      console.error('Selected text does not represent a valid number.');
    }
  }
}
