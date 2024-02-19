import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonPopover, IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SalesService, salesstore } from '../services/sales.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { AdditemService } from '../services/additem.service';
import { CustomerService, cust } from '../services/customer.service';
import { EncryptionService } from '../services/encryption.service';
import { ExecutiveService } from '../services/executive.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { InvoicePage } from "../invoice/invoice.page";
import { SessionService } from '../services/session.service';
import { CreatecompanyService } from '../services/createcompany.service';
// import { quotestore } from '../services/quotation.service';

interface Sales {
  barcode: string;
  itemcode: number;
  itemname: string,
  description: string;
  quantity: number;
  unitname: string;
  hunitname: number;
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
  selectedItemId: number;
  quantityPopoverData: {
    attr1: string;
    attr2: string;
    attr3: string;
    attr4: string;
    attr5: string;
    attr6: string;
    attr7: string;
    attr8: string
    companyid: number,
    itemcode: number,
  }[],
  attribute1: string,
  attribute2: string,
  attribute3: string,
  attribute4: string,
  attribute5: string,
  attribute6: string,
  attribute7: string,
  attribute8: string,

}
@Component({
    selector: 'app-add-sale',
    templateUrl: './add-sale.page.html',
    styleUrls: ['./add-sale.page.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, InvoicePage]
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
  ponumber: string = '';
  gstin: string = '';
  salePerson: number = 0;
  payment: number = 0;
  //table data
  /*barcode: string = '';

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

  totalitemno: number = 0;
  totalquantity: number = 0;
  totalgrossamt: number = 0;
  totaldiscountamt: number = 0;
  totaltaxamount: number = 0;
  totalnetamount: number = 0;

  roundoff: number = 0;
  pretax: number = 0;
  posttax: number = 0;
  deliverydate: string = '';
  deliveryplace: string = '';
  openingbalance: number = 0;
  closingbalance: number = 0;
  debit: number = 0;
  credit: number = 0;
  salesData: Sales[] = [{
    barcode: '',
    itemcode: 0,
    itemname: '',
    description: '',
    quantity: 0,
    hunitname: 0,
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
    selectedItemId: 0,
    quantityPopoverData: [{
      attr1: '',
      attr2: '',
      attr3: '',
      attr4: '',
      attr5: '',
      attr6: '',
      attr7: '',
      attr8: '',
      companyid: 0,
      itemcode: 0,
    }],
    attribute1: '',
    attribute2: '',
    attribute3: '',
    attribute4: '',
    attribute5: '',
    attribute6: '',
    attribute7: '',
    attribute8: '',
  }];
  ttotal: number = 0;
  myform: FormGroup;
  userid: number = 0;
  companyid: number = 0;
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
  itemcode: number = 0;
  name: string = '';
  customercode: string = '';
  customer_code: string = '';
  mobile: string = '';
  address: string = '';

  country: number = 0;
  state: number = 0;
  district: number = 0;
  pincode: string = '';
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  customerpop: FormGroup;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  @ViewChild('popover', { static: false })
  popover!: IonPopover;

  isOpen = false;
  cust: any;
  purchasebyid$: Observable<any[]>
  isQuantityPopoverOpen: boolean = false;

  attr1: string = '';
  attr2: string = '';
  attr3: string = '';
  attr4: string = '';
  attr5: string = '';
  attr6: string = '';
  attr7: string = '';
  attr8: string = '';
  quantity: number = 0;

  printThisPage() {
    window.print();
  }

  company$: Observable<any[]>
  customers$: Observable<any[]>
  compid: number = 0;
  sales$: Observable<any[]>
  totalAmount: number = 0;
  discountAmount: number = 0;
  grandTotal: number = 0;
  taxAmount: number = 0;
  cgstamt: number = 0;
  sgstamt: number = 0;
  igstamt: number = 0;
  pretaxAmount: number = 0;
  posttaxAmount: number = 0;
  totalitem:number=0;

  rows: any[] = [];

  constructor(public session: SessionService, private companyService: CreatecompanyService,private navCtrl: NavController, private popoverController: PopoverController, private execut: ExecutiveService, private custname1: CustomerService, private encService: EncryptionService, private formBuilder: FormBuilder, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private saleService: SalesService, private formService: FormValidationService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private myService: CustomerService) {
 const compid = this.session.getValue('userid')?.valueOf() as number;
    const companyid = '1';
        this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.executive$ = this.execut.getexecutive();
    // this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    this.billDate = new Date().toISOString().split('T')[0];
    this.refdate = new Date().toISOString().split('T')[0];
    this.deliverydate = new Date().toISOString().split('T')[0];
    this.orderDate = new Date().toISOString().split('T')[0];
    this.purchasebyid$=new Observable;

   
    //Invoice 
    this.company$ = this.companyService.fetchallcompany(compid, '', '');
    this.customers$ = this.custname1.fetchallCustomer(encService.encrypt(companyid), '', '');
    this.sales$ = this.saleService.fetchallSales(encService.encrypt(companyid), '', '');

    this.myform = this.formBuilder.group({
      billformate: [''],
      billNumber: ['', Validators.required],
      billDate: [''],
      custcode: ['', Validators.required],
      custname: ['', Validators.required],
      refrence: [''],
      refdate: [''],
      orderDate: [''],
      orderNumber: [''],
      // ponumber: [''],
      gstin: [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)],
      salePerson: [''],
      payment: [''],

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

      ttotal: [''],
      itemid: [''],
      ponumber: ['1'],

      attr1: [''],
      attr2: [''],
      attr3: [''],
      attr4: [''],
      attr5: [''],
      attr6: [''],
      attr7: [''],
      attr8: [''],
      attribute1: [''],
      attribute2: [''],
      attribute3: [''],
      attribute4: [''],
      attribute5: [''],
      attribute6: [''],
      attribute7: [''],
      attribute8: [''],
    });

    this.customerpop = this.formBuilder.group({

      customer_code: ['', Validators.required],
      name: ['', Validators.required],
      gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
      mobile: [''],
      country: [''],
      state: [''],
      district: [''],
      pincode: [''],
      address: [''],
    })

    this.states$ = new Observable<any[]>(); // Initialize the property in the constructor
    this.countries$ = this.countryService.getCountries();
    this.districts$ = this.districtservice.getDistricts(1);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Dismiss the popover before navigating
        this.closePopover();
      }
    });

  };

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

  // openQuantityPopover(sale: Sales) {
  //   this.purchasebyid$ = this.saleService.fetchallPurchaseById(sale.itemcode, 1);
  //   this.purchasebyid$.subscribe(data => {
  //     console.log('puchase data', data); // Log the data to the console to verify if it's being fetched
  //     // this.totalItems = data.length;
  //   });
  //   this.salesData[0].quantityPopoverData = new Array(sale.quantity).fill({})
  //     .map(() => ({ attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', companyid: 0, itemcode: 0 }));
  //   this.isQuantityPopoverOpen = true;
  // }
  openQuantityPopover(sale: Sales) {
    this.salesData[0].quantityPopoverData = new Array(sale.quantity).fill({})
      .map(() => ({ attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', companyid: 0, itemcode: 0 }));
    this.isQuantityPopoverOpen = true;
  }
  closeQuantityPopover() {
    this.isQuantityPopoverOpen = false;
  }

  async onSubmit(form: FormGroup, salesData: Sales[]) {
    const fields = { billNumber: this.billNumber, custcode: this.custcode, custname: this.custname }

    console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(salesData));
    let salesdatas: salesstore[] = [];

    if (await this.formService.validateForm(fields)) {

      for (const element of salesData) {
        element.grossrate = element.basicrate * element.quantity;
        element.netrate = element.basicrate + element.taxrate1;
        element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = element.quantity * (element.taxrate1 / 100 * element.basicrate)

        console.log(element);
        const companyid = 1;
        const userid = 1;
        let attributesArray = element.quantityPopoverData.map(attr => ({
          attr1: attr.attr1,
          attr2: attr.attr2,
          attr3: attr.attr3,
          attr4: attr.attr4,
          attr5: attr.attr5,
          attr6: attr.attr6,
          attr7: attr.attr7,
          attr8: attr.attr8,
          companyid:attr.companyid,
          itemcode: attr.itemcode,
        }))
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
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          roundoff: this.myform.value.roundoff,
          pretax: this.myform.value.pretax,
          posttax: this.myform.value.posttax,
          openingbalance: this.myform.value.openingbalance,
          closingbalance: this.myform.value.closingbalance,
          debit: this.myform.value.debit,
          credit: this.myform.value.credit,
          ponumber: this.myform.value.ponumber,
          ttotal: 0,
          companyid: companyid,
          userid: userid,
          quantityPopoverData: attributesArray,

        };

        salesdatas.push(saledata);
      }
        this.saleService.createsale(salesdatas, '', '').subscribe(
          (response: any) => {
            console.log('POST request successful', response);
            setTimeout(() => {
              this.formService.showSuccessAlert();
            }, 1000);
            this.formService.showSaveLoader();
            this.myform.reset();
            //location.reload()
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
    this.salesData = [{
      barcode: '',
      itemcode: 0,
      itemname: '',
      description: '',
      quantity: 0,
      unitname: '',
      hunitname: 0,
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
      selectedItemId: 0,
      quantityPopoverData: [{
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: '',
        attr5: '',
        attr6: '',
        attr7: '',
        attr8: '',
        companyid: 0,
        itemcode: 0,
      }],
      attribute1: '',
      attribute2: '',
      attribute3: '',
      attribute4: '',
      attribute5: '',
      attribute6: '',
      attribute7: '',
      attribute8: '',
    }];
  }
  tatts:number=0;

  getItems(sales: any) {
    const compid = 1;
    const identifier = sales.selectedItemId ? 'itemname' : 'itemcode';
    const value = sales.selectedItemId || sales.itemcode;
    const grate = [0, 3, 5, 12, 18, 28, 0, 0, 0];
    this.itemcode=sales.itemcode;

    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          sales.itemcode = itemDetails.itemCode;
          sales.itemname = itemDetails.itemDesc;
          sales.barcode = itemDetails.barcode.toString();
          sales.unitname = itemDetails.unitname;
          sales.hunitname = itemDetails.unitid;
          sales.taxrate = grate[itemDetails.selectGst];
          sales.taxrate1 = grate[itemDetails.selectGst];
          sales.basicrate = itemDetails.basicrate;
          sales.mrp = itemDetails.mrp;
          sales.basicrate = itemDetails.basic_rate;
          sales.netrate = itemDetails.net_rate;
          if (!(itemDetails.attr2 === '')) {
            this.tatts = 1;
        } else if (!(itemDetails.attr3 === '')) {
            this.tatts = 2;
        } else if (!(itemDetails.attr4 === '')) {
            this.tatts = 3;
        } else if (!(itemDetails.attr5 === '')) {
            this.tatts = 4;
        } else if (!(itemDetails.attr6 === '')) {
            this.tatts = 5;
        } else if (!(itemDetails.attr7 === '')) {
            this.tatts = 6;
        } else if (!(itemDetails.attr8 === '')) {
            this.tatts = 7;
        }
          sales.attribute1 = itemDetails.attr1,
            sales.attribute2 = itemDetails.attr2,
            sales.attribute3 = itemDetails.attr3,
            sales.attribute4 = itemDetails.attr4,
            sales.attribute5 = itemDetails.attr5,
            sales.attribute6 = itemDetails.attr6,
            sales.attribute7 = itemDetails.attr7,
            sales.attribute8 = itemDetails.attr8,

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

  getCustomers(event: any) {
    const compid = '1';
    const identifier = this.cust ? 'custcode' : 'custname';
    const value = this.cust;

    this.custname1.fetchallCustomer(compid, '', value).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.custcode = itemDetails.customer_code;
          event.custname = itemDetails.name;
          event.gstin = itemDetails.gstin,

            // Update form control values
            this.myform.patchValue({
              custcode: itemDetails.customer_code,
              custname: itemDetails.custname,
              gstin: itemDetails.gstin,
              // Other form controls...
            });
          this.custcode = itemDetails.customer_code;

        } else {
          console.error('No data found for the selected item.');
        }
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
      itemname: '',
      description: '',
      quantity: 0,
      unitname: '',
      hunitname: 0,
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
      selectedItemId: 0,
      quantityPopoverData: this.salesData[0].quantityPopoverData.map(attr => ({ ...attr })),
      attribute1: '',
      attribute2: '',
      attribute3: '',
      attribute4: '',
      attribute5: '',
      attribute6: '',
      attribute7: '',
      attribute8: '',
    };
    this.salesData.push(newRow);
  }

  onNew() {
    location.reload();
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
  getTaxableAmount(): number {
    const taxableAmount = this.salesData.reduce((total, sales) => {
      // Assuming getgrossrate is a function that calculates gross rate based on quote
      const grossRate = this.getgrossrate(sales);

      // Assuming pretax, discount, and taxamt are properties of your quote object

      const discount = sales.discountamt || 0;
      const taxamt = sales.totaltax || 0;

      // Calculate the taxable amount for the current quote
      const quoteTaxableAmount = (grossRate - discount + (this.pretax / this.salesData.length)) + taxamt;

      // Add the taxable amount of the current quote to the total
      total += quoteTaxableAmount;

      return total;
    }, 0);

    return this.totalnetamount = taxableAmount;
  }
  getTotalQuantity(): number {
    this.totalquantity = this.salesData.reduce((total, sale) => total + +sale.quantity, 0);
    return this.totalquantity;
  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.salesData.reduce((total, sale) => {
      const grossAmount = (sale.quantity * sale.basicrate);
      return total + grossAmount;
    }, 0);

    return this.totalgrossamt = totalGrossAmount;
  }
  getTotalnetAmount(): number {
    return this.salesData.reduce((total, sale) => total + (((sale.basicrate * sale.quantity) + sale.taxrate1) - sale.discount), 0)
  }
  getGrandTotal(): number {
    const grandTotal = this.salesData.reduce((total, sale) => {
      const gtotal = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax;
      return gtotal;
    }, 0);

    return grandTotal;
  }
  getTotalTaxAmount(): number {
    return this.salesData.reduce((total, sale) => {
      const subtotal = ((sale.quantity * sale.basicrate) + ((this.pretax) / this.salesData.length)) - sale.discountamt;
      const taxAmount = subtotal * (sale.taxrate1 / 100);
      return this.totaltaxamount = total + taxAmount;
    }, 0);
  }
  getTotalDiscountAmount(): number {
    this.totaldiscountamt = this.salesData.reduce((total, sale) => total + (sale.discount / 100) * sale.basicrate * sale.quantity, 0);
    return this.totaldiscountamt;
  }
  getRoundoff(): number {
    // Calculate the total amount without rounding
    const roundedTotalAmount = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax // Change 2 to the desired number of decimal places

    return this.roundoff = roundedTotalAmount;
  }
  //table formaula
  getnetrate(sale: Sales): number {
    return sale.basicrate + sale.totaltax;
  }
  getTotaltax(sale: Sales): number {
    return ((((sale.quantity * sale.basicrate) + ((this.pretax) / this.salesData.length) - sale.discountamt) * sale.taxrate1 / 100));
  }
  getgrossrate(sale: Sales): number {
    return sale.quantity * sale.basicrate;
  }

  getdiscountamt(sale: Sales): number {
    const discountamt = sale.discountamt || 0; // handle null/undefined values
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
  getTotalamt(sale: Sales[]): number {
    let totalAmount = 0;

    sale.forEach(sale => {
      const pretaxPerItem = ((this.pretax / this.salesData.length)); // Divide pretax equally among items

      const subtotal = (sale.quantity * sale.basicrate) + pretaxPerItem;
      const discount = ((sale.discount / 100) * sale.basicrate * sale.quantity);
      const taxAmount = ((((sale.quantity * sale.basicrate) + pretaxPerItem) - sale.discountamt) * sale.taxrate1 / 100);

      const itemTotalAmount = subtotal + taxAmount - discount;
      totalAmount += itemTotalAmount;
    });

    return totalAmount;
  }
  getcgst(sale: Sales): number {
    return this.getTotaltax(sale) / 2;
  }

  getsgst(sale: Sales): number {
    return this.getTotaltax(sale) / 2;
  }

  getigst(sale: Sales): number {
    return this.getTotaltax(sale);
  }
  ngOnInit() {
    this.salesData[0].quantityPopoverData = Array.from({ length: this.quantity }, () => ({
      attr1: '',
      attr2: '',
      attr3: '',
      attr4: '',
      attr5: '',
      attr6: '',
      attr7: '',
      attr8: '',
      companyid: 0,
      itemcode: 0
      // Add more properties as needed
    }));
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
    const gstAmount = (discount / 100) * basicrate * quantity;
    const netrate = basicrate + taxrate;
    this.myform.get('netrate')?.setValue(netrate);
  }

  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  goBack() {
    this.router.navigate(["/transcationdashboard"])
  }
  onSelectChange(select: HTMLSelectElement, sale: Sales) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      sale.taxrate1 = numericValue;

      // Use numericValue as needed
    } else {
      sale.taxrate1 = 0;

      console.error('Selected text does not represent a valid number.');
    }
  }

  async onCustSubmit() {
    const fields = { name: this.name, }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      const companyid = 1;
      console.log('Your form data : ', this.customerpop.value);
      let custdata: cust = {
        name: this.customerpop.value.name,
        customer_code: this.customerpop.value.customer_code,
        gstin: this.customerpop.value.gstin,
        companyid: companyid,
        selectedSalutation: '',
        companyName: '',
        state: this.customerpop.value.state,
        district: this.customerpop.value.district,
        country: this.customerpop.value.country,
        opening_balance: 0,
        closing_balance: 0,
        mobile: this.customerpop.value.mobile,
        whatsapp_number: '',
        address: this.customerpop.value.address,
        email: '',
        select_sales_person: '',
        pincode: '',
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
        card_number: '',
        opening_point: 0,
        closing_point: 0,
        select_group: 0,
        discount: 0,
        selectedOption1: 0,
        selectedState1: 0,
        selectedDistrict1: 0,
        pincode1: '',
        address1: ''
      };

      this.myService.createCustomer(custdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);

          this.formService.showSaveLoader()
          // location.reload()
          //this.myform.reset();

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
  onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for up and down arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
}
