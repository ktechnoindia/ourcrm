import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonPopover, IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { PurchaseService, purchasestore } from '../services/purchase.service';
import { ExecutiveService } from '../services/executive.service';
import { AdditemService } from '../services/additem.service';
import { VendorService, vend } from '../services/vendor.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
import { DistrictsService } from '../services/districts.service';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';

interface Purchase {
  barcode: string;
  itemcode: number;
  itemname: string,
  description: string;
  quantity: number;
  unitname: string;
  hunitname:number;
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
  itemid: number;
  selectedItemId:number;
}
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.page.html',
  styleUrls: ['./add-purchase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  gstin: string='';
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
  totalitemno:  number = 0;
  totalquantity:  number = 0;
  totalgrossamt:  number = 0;
  totaldiscountamt: number = 0;
  totaltaxamount: number = 0;
  totalnetamount:  number = 0;

  roundoff:  number = 0;
  pretax:  number = 0;
  posttax:  number = 0;
  deliverydate: string = '';
  deliveryplace: string = '';
  openingbalance: number = 0;
  closingbalance: number = 0;
  debit:  number = 0;
  credit: number = 0;
  executive: number = 0;
  purchaseData: Purchase[] = [{
    barcode: '',
    itemcode: 0,
    itemname: '',
    description: '',
    quantity: 0,
    hunitname:0,
    unitname: '',
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
    itemid: 0,
    selectedItemId:0
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
 

  name: string = '';
  vendor_code: string = '';
  mobile:string='';
  country: number = 0;
  state: number = 0;
  district: number = 0;
  pincode: string = '';
  address: string = '';

  countries$: Observable<any[]>
  states$: Observable<any[]>;
  districts$: Observable<any[]>
  vendorpop: FormGroup;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  @ViewChild('popover', { static: false })
  popover!: IonPopover;

isOpen = false;
  vend: any;


  constructor(private navCtrl: NavController,private popoverController:PopoverController ,private encService: EncryptionService, private vendname1: VendorService, private formBuilder: FormBuilder, private itemService: AdditemService, private execut: ExecutiveService, private purchaseService: PurchaseService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private formService: FormValidationService,private vendService: VendorService, private countryservice: CountryService, private stateservice: StateService, private districtservice: DistrictsService,) {
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
      vendcode: ['', Validators.required].toString(),
      supplier: ['', Validators.required],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      ponumber: [''],
      gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      payment: [''],
      executive: [''],

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
      //executive:1,
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
    });

    
    this.vendorpop = this.formBuilder.group({
      name: ['', [Validators.required]],
      vendor_code: ['', [Validators.required, Validators.maxLength(10)]],
      gstin: [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)],
      mobile: ['', [Validators.maxLength(10)]],
      country: [''],
      state: [''],
      district: [''],
      pincode: [''],
      address: [''],
    });

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryservice.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Dismiss the popover before navigating
        this.closePopover();
      }
    });

  }
  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  onCountryChange() {
    console.log('selected value' + this.country);
    this.states$ = this.stateservice.getStates(1);
  }
  onStateChange() {
    console.log('selected value' + this.state);
    this.districts$ = this.districtservice.getDistricts(this.state);
  }

  closePopover() {
    // Close the popover and pass data back to the parent component
    this.popoverController.dismiss({

    });
  }

  async presentPopover(purchase: any) {
    const popover = await this.popoverController.create({
      component: QuantitypopoverPage,
      cssClass:'popover-content',
      componentProps: {
        quantity: purchase.quantity, // Pass the quantity to the popup component
      },
      translucent: true,
    });
    return await popover.present();
  }


  updateRows(purchase:Purchase) {
    // Open the popover when quantity changes
    if (purchase.quantity > 0) {
      this.presentPopover(purchase);
    }
  }

  async onSubmit(form: FormGroup, purchaseData: Purchase[]) {
    const fields = { billNumber: this.billNumber, supplier: this.supplier, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    let quotedatas: purchasestore[] = [];


    if (await this.formService.validateForm(fields)) {
      for (const element of purchaseData) {

        element.grossrate = element.basicrate * element.quantity;
       // element.netrate = element.basicrate + element.taxrate1;
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
          taxrate$: this.myform.value.taxrate$,
          refrence: this.myform.value.refrence,
          refdate: this.myform.value.refdate,
          vendcode: this.myform.value.vendcode.toString(),
          orderDate: this.myform.value.orderDate,
          orderNumber: this.myform.value.orderNumber,
          ponumber: this.myform.value.ponumber,

          barcode: element.barcode,
          itemcode: element.itemcode,
          itemname: element.itemname,
          description: element.description,
          quantity: element.quantity,
          unitname: element.hunitname,
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
          pretax:this.myform.value.pretax,
          posttax: this.myform.value.posttax,
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          openingbalance: this.myform.value.openingbalance,
          closingbalance: this.myform.value.closingbalance,
          debit: this.myform.value.debit,
          credit: this.myform.value.credit,
          itemid: element.itemid,
          companyid: companyid,
          userid: userid,
          executive: this.myform.value.executive,
          exicutive: 0
        };

        purchases.push(purchasedata);
        this.purchaseService.createpurchase(purchases, '', '').subscribe(
          (response: any) => {
            console.log('Purchase Post successful', response);
            setTimeout(() => {
              this.formService.showSuccessAlert();
            }, 1000);
            this.formService.showSaveLoader();
            // this.form.reset();
            location.reload()
          },
          (error: any) => {
            console.log('Purchase Post failed', error);
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

  async ionViewWillEnter() {
    //   const userid = await this.session.getValue('userid');
    //   if (userid == null || userid == 'undefined' || userid == '') {
    //     this.router.navigate(['/login']);
    //   }
    //  this.setlangvals();
    this.purchaseData = [{
      barcode: '',
      itemcode: 0,
      itemname: '',
      description: '',
      quantity: 0,
      unitname: '',
      hunitname:0,
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
      itemid: 0,
      selectedItemId:0
    }];
    }
  getVendors(event: any) {
    const compid = '1';
    const identifier = this.vend ? 'custcode' : 'custname';
    const value = this.vend;

    this.vendname1.fetchallVendor(compid, '', value).subscribe(
      (data) => {


        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.vendcode = itemDetails.vendor_code;
          event.supplier = itemDetails. name;
          event.gstin = itemDetails.gstin;



          // Update form control values
          this.myform.patchValue({
            vendcode: itemDetails.vendor_code,
            supplier: itemDetails.supplier,
            gstin: itemDetails.gstin,

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

  getItems(purchase: any) {
    const compid = 1;
    const identifier = purchase.selectedItemId ? 'itemname' : 'itemcode';
    const value = purchase.selectedItemId ||purchase.itemcode;
    const grate=[0,3,5,12,18,28,0,0,0];

    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          purchase.itemcode = itemDetails.itemCode;
          purchase.itemname = itemDetails.itemDesc;
          purchase.barcode = itemDetails.barcode.toString();
          purchase.unitname = itemDetails.unitname;
          purchase.hunitname=itemDetails.unitid;
          purchase.taxrate = grate[itemDetails.selectGst];
          purchase.taxrate1 = grate[itemDetails.selectGst];
          purchase.basicrate = itemDetails.basicrate;
          purchase.mrp = itemDetails.mrp;
          purchase.basicrate=itemDetails.basic_rate;
          purchase.netrate=itemDetails.net_rate;

          // Update form control values
          this.myform.patchValue({
            itemcode: purchase.itemcode,
            itemname: purchase.itemname,
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
    const identifier = this.vend ? 'suppliertype' : 'vendcode';
    const value = this.vend;

    this.vendname1.fetchallVendor(compid, value, '').subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.vendcode = itemDetails.vendor_code;
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
      itemname: '',
      description: '',
      quantity: 0,
      unitname: '',
      hunitname:0,
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
      itemid:0,
      selectedItemId:0
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
    this.totalquantity= this.purchaseData.reduce((total, purchase) => total + +purchase.quantity, 0);
    return  this.totalquantity;
  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.purchaseData.reduce((total, purchase) => {
      const grossAmount = purchase.quantity * purchase.basicrate;
      return total + grossAmount;
    }, 0);

    return this.totalgrossamt= totalGrossAmount;
  }
  getTaxableAmount(): number {
    const taxableAmount = this.purchaseData.reduce((total, purchase) => {
      // Assuming getgrossrate is a function that calculates gross rate based on quote
      const grossRate = this.getgrossrate(purchase);
  
      // Assuming pretax, discount, and taxamt are properties of your quote object
   
      const discount = purchase.discountamt || 0;
      const taxamt = purchase.totaltax || 0;
  
      // Calculate the taxable amount for the current quote
      const quoteTaxableAmount = (grossRate - discount+(this.pretax/ this.purchaseData.length)) + taxamt;
  
      // Add the taxable amount of the current quote to the total
      total += quoteTaxableAmount;
  
      return total;
    }, 0);
  
    return this.totalnetamount= taxableAmount;
  }
  getTotalnetAmount(): number {
    return this.purchaseData.reduce((total, purchase) => total + (((purchase.basicrate * purchase.quantity) + purchase.taxrate1) - purchase.discount), 0)
  }
  getGrandTotal(): number {
    const grandTotal = this.purchaseData.reduce((total, purchase) => {
      const gtotal = this.getTaxableAmount() + this.getTotalTaxAmount()+this.posttax;
      return gtotal;
    }, 0);

    return grandTotal;
  }
  getTotalTaxAmount(): number {
    return this.purchaseData.reduce((total, purchase) => {
      const subtotal = ((purchase.quantity * purchase.basicrate)+((this.pretax)/this.purchaseData.length))- purchase.discountamt;
      const taxAmount = subtotal * (purchase.taxrate1 / 100) ;
      return this.totaltaxamount= total + taxAmount ;
  }, 0);  }
  getTotalDiscountAmount(): number {
    this.totaldiscountamt= this.purchaseData.reduce((total, purchase) => total + (purchase.discount / 100) * purchase.basicrate * purchase.quantity, 0);
    return this.totaldiscountamt;
  }
  getRoundoff(): number {
    const roundedTotalAmount = this.getTaxableAmount() + this.getTotalTaxAmount()+this.posttax // Change 2 to the desired number of decimal places

    return this.roundoff= roundedTotalAmount;
  }
  //table formaula
  getnetrate(purchase: Purchase): number {
    return purchase.basicrate + purchase.totaltax;
  }
  getTotaltax(purchase: Purchase): number {
    return ((((purchase.quantity * purchase.basicrate)+((this.pretax)/this.purchaseData.length)-purchase.discountamt)*purchase.taxrate1 / 100));
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
  getTotalamt(purchase: Purchase[]): number {
    let totalAmount = 0;

    purchase.forEach(purchase => {
        const pretaxPerItem = ((this.pretax  / this.purchaseData.length)); // Divide pretax equally among items

        const subtotal = (purchase.quantity * purchase.basicrate) + pretaxPerItem;
        const discount = ((purchase.discount / 100) * purchase.basicrate * purchase.quantity);
        const taxAmount = ((((purchase.quantity * purchase.basicrate) + pretaxPerItem) - purchase.discountamt) * purchase.taxrate1 / 100);

        const itemTotalAmount = subtotal + taxAmount - discount;
        totalAmount += itemTotalAmount;
    });

    return totalAmount;
}
getcgst(purchase: Purchase): number {
  return this.getTotaltax(purchase) / 2;
}

getsgst(purchase: Purchase): number {
  return this.getTotaltax(purchase) / 2;
}

getigst(purchase: Purchase): number {
  return this.getTotaltax(purchase);
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


  async onVendorSubmit() {
    const fields = { name: this.name, vendor_code: this.vendor_code, }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', this.myform.value);
      const venddata: vend = {
        name: this.vendorpop.value.name,
        customer_code: this.vendorpop.value.vendor_code,
        gstin: this.vendorpop.value.gstin,
        mobile: this.vendorpop.value.mobile,
        country: this.vendorpop.value.country,
        state: this.vendorpop.value.state,
        district: this.vendorpop.value.district,
        pincode: this.vendorpop.value.pincode,
        address: this.vendorpop.value.address,
        select_group: 0,
        opening_balance: 0,
        closing_balance: 0,
        whatsapp_number: '',
        email: '',
        tdn: '',
        aadhar_no: '',
        pan_no: '',
        udhyog_aadhar: '',
        account_number: '',
        ifsc_code: '',
        bank_name: '',
        branch_name: '',
        credit_period: 0,
        credit_limit: 0,
        select_sales_person: '',
        card_number: '',
        opening_point: 0,
        closing_point: 0,
        selectedSalutation: '',
        companyName: '',
        country1: 0,
        state1: 0,
        district1: 0,
        pincode1: '',
        address1: '',
        discount: 0
      };

      this.vendService.createVendor(venddata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);

          this.formService.showSaveLoader()
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
}
