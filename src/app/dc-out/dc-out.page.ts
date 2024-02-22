import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonPopover, IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcoutService, dcoutstore } from '../services/dcout.service';
import { NgForm } from '@angular/forms';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { AdditemService } from '../services/additem.service';
import { EncryptionService } from '../services/encryption.service';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
import { CustomerService, cust } from '../services/customer.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { DistrictsService } from '../services/districts.service';
import { SalesService } from '../services/sales.service';

interface Dcout {
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
  selectedItemId: 0;
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
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcOutPage implements OnInit {
  voucherformat: number = 0;
  voucherNumber: string = '';
  datetype: string = '';
  vendcode: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate: string = '';
  ponumber: string = '';
  itemcode: number = 0;

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

  dcoutData: Dcout[] = [{
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
    taxrate: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
    discount: 0,
    discountamt: 0,
    totaltax: 0,
    total: 0,
    taxrate1: 0,
    itemid: 0,// Calculate grossrate after other properties
    grossrate: 0,
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
  companyid: number = 0;
  userid: number = 0;
  myform: FormGroup;
  ttotal!: number;
  supplier$: any;
  totalItemNo: number = 0;
  totalQuantity: number = 0;
  totalGrossAmt: number = 0;
  totalDiscountAmt: number = 0;
  totalTaxAmt: number = 0;
  totalNetAmt: number = 0;
  itemnames$: Observable<any[]>;
  // unitname$: Observable<any[]>;
  taxrate$: Observable<any[]>;
  customer$: any;

  name: string = '';
  customercode: string = '';
  customer_code: string = '';
  mobile: string = '';
  address: string = '';
  gstin: string = '';
  country: number = 0;
  state: number = 0;
  district: number = 0;
  pincode: string = '';
  countries$: Observable<any[]>
  states$: Observable<any[]>
  districts$: Observable<any[]>
  customerpop: FormGroup;
  @ViewChild('popover', { static: false })
  popover!: IonPopover;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  isOpen: boolean = false;
  vend: any;
  purchasebyid$: Observable<any[]>
  isQuantityPopoverOpen: boolean = false;
  quantity: number = 0;
  printThisPage() {
    window.print();
  }
  attdata:any[]=[];

  constructor(private saleService: SalesService, private navCtrl: NavController, private popoverController: PopoverController, private custname1: CustomerService, private vendname1: VendorService, private encService: EncryptionService, private formBuilder: FormBuilder, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private dcout: DcoutService, private formService: FormValidationService, private countryService: CountryService, private stateservice: StateService, private districtservice: DistrictsService, private myService: CustomerService,) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    // this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    this.datetype = new Date().toISOString().split('T')[0];
    this.refdate = new Date().toISOString().split('T')[0];
    this.deliverydate = new Date().toISOString().split('T')[0];
    this.purchasebyid$ = new Observable;

    this.myform = this.formBuilder.group({
      voucherformat: [''],
      voucherNumber: ['', Validators.required],
      datetype: [''],
      vendcode: ['', Validators.required].toString(),
      suppliertype: ['', Validators.required],
      referenceNumber: [''],
      refdate: [''],
      ponumber: [''],

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

      ttotal: [''],
      itemid: [''],
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
  }

  async presentPopover(dcin: any) {
    const popover = await this.popoverController.create({
      component: QuantitypopoverPage,
      cssClass: 'popover-content',
      componentProps: {
        quantity: dcin.quantity, // Pass the quantity to the popup component
      },
      translucent: true,
    });
    return await popover.present();
  }
  openQuantityPopover(dcout: Dcout) {
    this.purchasebyid$ = this.saleService.fetchallPurchaseById(dcout.itemcode, 1);
    this.purchasebyid$.subscribe((data: any) => {
      this.attdata = data.purchase_att;
      console.log('purchase Data', this.attdata);
    // this.dcoutData[0].quantityPopoverData = new Array(dcout.quantity).fill({})
    //   .map(() => ({ attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', companyid: 0, itemcode: 0 }));
    // this.isQuantityPopoverOpen = true;
    setTimeout(() => {
      this.isQuantityPopoverOpen = true;
    }, 500);
  });

  }
  closeQuantityPopover() {
    this.isQuantityPopoverOpen = false;
  }
  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  updateRows(dcout: Dcout) {
    // Open the popover when quantity changes
    if (dcout.quantity > 0) {
      this.presentPopover(dcout);
    }
  }


  async onSubmit(form: FormGroup, dcoutData: Dcout[]) {
    const htmlForm = document.getElementById('myForm') as HTMLFormElement;

    htmlForm.addEventListener('keydown', (event) => {
      // Prevent the default behavior for Enter key
      if (event.key === 'Enter') {
          event.preventDefault();
      }
  });
    const fields = { voucherNumber: this.voucherNumber, suppliertype: this.suppliertype, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(dcoutData));
      let dcoutdatas: dcoutstore[] = [];
      for (const element of dcoutData) {

        element.grossrate = element.basicrate * element.quantity;
        // element.netrate = element.basicrate + element.taxrate1;
        element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = element.quantity * (element.taxrate1 / 100 * element.basicrate);

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
          companyid: companyid,
          itemcode: element.itemcode,
        }))
        let dcoutdata: dcoutstore = {
          voucherformat: this.myform.value.voucherformat,
          voucherNumber: this.myform.value.voucherNumber,
          datetype: this.myform.value.datetype,
          vendcode: this.myform.value.vendcode.toString(),
          suppliertype: this.myform.value.suppliertype,
          referenceNumber: this.myform.value.referenceNumber,
          refdate: this.myform.value.refdate,

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
          companyid: companyid,
          userid: userid,
          taxrate1: element.taxrate1,
          ponumber: this.myform.value.ponumber,
          quantityPopoverData: attributesArray,

        };

        dcoutdatas.push(dcoutdata);
      }
      this.dcout.createdcout(dcoutdatas, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
          this.formService.showSaveLoader();
          this.myform.reset();
          // location.reload()
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
  async ionViewWillEnter() {
    //   const userid = await this.session.getValue('userid');
    //   if (userid == null || userid == 'undefined' || userid == '') {
    //     this.router.navigate(['/login']);
    //   }
    //  this.setlangvals();
    this.dcoutData = [{
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

  addDcout() {
    console.log('addrowwww' + this.dcoutData.length);
    // You can initialize the new row data here
    const newRow: Dcout = {
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
      taxrate: 0,
      CGST: 0,
      SGST: 0,
      IGST: 0,
      discount: 0,
      discountamt: 0,
      totaltax: 0,
      total: 0,
      taxrate1: 0,
      itemid: 0,// Calculate grossrate after other properties
      grossrate: 0,
      selectedItemId: 0,
      quantityPopoverData: this.dcoutData[0].quantityPopoverData.map(attr => ({ ...attr })),
      attribute1: '',
      attribute2: '',
      attribute3: '',
      attribute4: '',
      attribute5: '',
      attribute6: '',
      attribute7: '',
      attribute8: '',
      // Add more properties as needed
    };
    this.dcoutData.push(newRow);
  }
  tatts: number = 0;

  getItems(dcout: any) {
    const compid = 1;
    const identifier = dcout.selectedItemId ? 'itemname' : 'itemcode';
    const value = dcout.selectedItemId || dcout.itemcode;
    const grate = [0, 3, 5, 12, 18, 28, 0, 0, 0];
    this.itemcode=dcout.itemcode;

    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          dcout.itemcode = itemDetails.itemCode;
          dcout.itemname = itemDetails.itemDesc;
          dcout.barcode = itemDetails.barcode.toString();
          dcout.unitname = itemDetails.unitname;
          dcout.hunitname = itemDetails.unitid;
          dcout.taxrate = grate[itemDetails.selectGst];
          dcout.taxrate1 = grate[itemDetails.selectGst];
          dcout.basicrate = itemDetails.basicrate;
          dcout.mrp = itemDetails.mrp;
          dcout.basicrate = itemDetails.basic_rate;
          dcout.netrate = itemDetails.net_rate;
          if (itemDetails.attr2 !== '') {
            this.tatts++;
          }
          if (itemDetails.attr3 !== '') {
            this.tatts++;
          }
          if (itemDetails.attr4 !== '') {
            this.tatts++;
          }
          if (itemDetails.attr5 !== '') {
            this.tatts++;
          }
          if (itemDetails.attr6 !== '') {
            this.tatts++;
          }
          if (itemDetails.attr7 !== '') {
            this.tatts++;
          }
          if (itemDetails.attr8 !== '') {
            this.tatts++;
          }
          dcout.attribute1 = itemDetails.attr1,
            dcout.attribute2 = itemDetails.attr2,
            dcout.attribute3 = itemDetails.attr3,
            dcout.attribute4 = itemDetails.attr4,
            dcout.attribute5 = itemDetails.attr5,
            dcout.attribute6 = itemDetails.attr6,
            dcout.attribute7 = itemDetails.attr7,
            dcout.attribute8 = itemDetails.attr8,
            // Update form control values
            this.myform.patchValue({
              itemcode: dcout.itemcode,
              itemname: dcout.itemname,
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
  };

  getCustomers(event: any) {
    const compid = '1';
    const identifier = this.vend ? 'suppliertype' : 'vendcode';
    const value = this.vend;

    this.custname1.fetchallCustomer(compid, '', value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.vendcode = itemDetails.customer_code;
          event.suppliertype = itemDetails.name;


          // Update form control values
          this.myform.patchValue({
            vendcode: itemDetails.customer_code,
            suppliertype: itemDetails.suppliertype,
            // Other form controls...
          });
          this.vendcode = itemDetails.customer_code;
        } else {
          console.error('No data found for the selected item.');
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }



  onNew() {
    location.reload();
  }

  removeDcout(index: number, row: Dcout) {
    this.ttotal = this.ttotal - this.dcout.total;
    this.dcoutData.splice(index, 1);
  }
  getAllRows() {
    console.log('Number of Rows:', this.dcoutData.length);

    for (let i = 0; i < this.dcoutData.length; i++) {
      const quote = this.dcoutData[i];
      console.log('Row:', quote);
    }
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.dcoutData) {
      sum += this.dcout.total;
    }
    this.ttotal = sum;
  }



  calculateTotals() {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.dcoutData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.dcoutData.reduce((total, dcout) => total + dcout.quantity, 0);
    this.totalGrossAmt = this.dcoutData.reduce((total, dcout) => total + dcout.grossrate, 0);

    // Add similar calculations for other totals
  }

  getTotalQuantity(): number {
    this.totalquantity = this.dcoutData.reduce((total, dcout) => total + +dcout.quantity, 0);
    return this.totalquantity;
  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.dcoutData.reduce((total, dcout) => {
      const grossAmount = (dcout.quantity * dcout.basicrate);
      return total + grossAmount;
    }, 0);

    return this.totalgrossamt = totalGrossAmount;
  }
  getTaxableAmount(): number {
    const taxableAmount = this.dcoutData.reduce((total, dcout) => {
      // Assuming getgrossrate is a function that calculates gross rate based on quote
      const grossRate = this.getgrossrate(dcout);

      // Assuming pretax, discount, and taxamt are properties of your quote object

      const discount = dcout.discountamt || 0;
      const taxamt = dcout.totaltax || 0;

      // Calculate the taxable amount for the current quote
      const quoteTaxableAmount = (grossRate - discount + (this.pretax / this.dcoutData.length)) + taxamt;

      // Add the taxable amount of the current quote to the total
      total += quoteTaxableAmount;

      return total;
    }, 0);

    return this.totalnetamount = taxableAmount;
  }
  getTotalnetAmount(): number {
    return this.dcoutData.reduce((total, dcout) => total + (((dcout.basicrate * dcout.quantity) + (dcout.quantity * (dcout.taxrate1 / 100 * dcout.basicrate)) + dcout.totaltax) - ((dcout.discount / 100) * dcout.basicrate * dcout.quantity)), 0)
  }
  getGrandTotal(): number {
    const grandTotal = this.dcoutData.reduce((total, dcout) => {
      const gtotal = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax;
      return gtotal;

    }, 0);

    return grandTotal;
  }
  getTotalTaxAmount(): number {
    return this.dcoutData.reduce((total, dcout) => {
      const subtotal = ((dcout.quantity * dcout.basicrate) + ((this.pretax) / this.dcoutData.length)) - dcout.discountamt;
      const taxAmount = subtotal * (dcout.taxrate1 / 100);
      return this.totaltaxamount = total + taxAmount;
    }, 0);
  }
  getTotalDiscountAmount(): number {
    this.totaldiscountamt = this.dcoutData.reduce((total, dcout) => total + (dcout.discount / 100) * dcout.basicrate * dcout.quantity, 0);;
    return this.totaldiscountamt;
  }
  getRoundoff(): number {
    // Calculate the total amount without rounding
    const roundedTotalAmount = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax // Change 2 to the desired number of decimal places
    return this.roundoff = roundedTotalAmount;
  }
  //table formaula
  getnetrate(quote: Dcout): number {
    return quote.basicrate + quote.totaltax;
  }
  getTotaltax(dcout: Dcout): number {
    return ((((dcout.quantity * dcout.basicrate) + ((this.pretax) / this.dcoutData.length) - dcout.discountamt) * dcout.taxrate1 / 100));
    //return this.quoteData.reduce((total, quote) => total + (+quote.basicrate * +quote.taxrate1 / 100 * + quote.quantity), 0);
  }
  getdiscountp(dcout: Dcout) {
    const discountPercentage = dcout.discount || 0; // assuming discount is a property in your dcin object
    const basicrate = dcout.basicrate || 0; // handle null/undefined values
    const quantity = dcout.quantity || 0; // handle null/undefined values

    // calculate discount amount based on the entered percentage
    const discountAmt = (discountPercentage / 100) * basicrate * quantity;

    // update discount amount
    dcout.discountamt = discountAmt;

    // return discount amount for display
    return discountAmt;
  }
  getgrossrate(dcout: Dcout): number {
    return dcout.quantity * dcout.basicrate;
  }

  getdiscountamt(dcout: Dcout): number {
    const discountamt = dcout.discountamt || 0; // handle null/undefined values
    const basicrate = dcout.basicrate || 0; // handle null/undefined values
    const quantity = dcout.quantity || 0; // handle null/undefined values
    // calculate discount percentage
    const discount = (discountamt / (basicrate * quantity)) * 100;
    // update discount percentage
    dcout.discount = discount;
    // return discount amount for display
    return discountamt;
  }
  calculateDiscountAmount(dcout: Dcout): number {
    const discountType = this.myform.get('discountType')?.value;
    const basicrate = +dcout.basicrate || 0;
    const quantity = +dcout.quantity || 0;

    if (isNaN(basicrate) || isNaN(quantity)) {
      return 0;
    }

    if (discountType === 'amount') {
      return dcout.discountamt || 0;
    } else if (discountType === 'percentage') {
      const discountPercentage = dcout.discount || 0;
      return (discountPercentage / 100) * basicrate * quantity;
    }

    return 0;
  }
  getTotalamt(dcout: Dcout[]): number {
    let totalAmount = 0;

    dcout.forEach(dcout => {
      const pretaxPerItem = ((this.pretax / this.dcoutData.length)); // Divide pretax equally among items

      const subtotal = (dcout.quantity * dcout.basicrate) + pretaxPerItem;
      const discount = ((dcout.discount / 100) * dcout.basicrate * dcout.quantity);
      const taxAmount = ((((dcout.quantity * dcout.basicrate) + pretaxPerItem) - dcout.discountamt) * dcout.taxrate1 / 100);

      const itemTotalAmount = subtotal + taxAmount - discount;
      totalAmount += itemTotalAmount;
    });

    return totalAmount;
  }
  getcgst(dcout: Dcout): number {
    return this.getTotaltax(dcout) / 2;
  }

  getsgst(dcout: Dcout): number {
    return this.getTotaltax(dcout) / 2;
  }

  getigst(dcout: Dcout): number {
    return this.getTotaltax(dcout);
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Reset form data when navigating away from the page
        this.myform.reset();
      }
    });

    this.dcoutData[0].quantityPopoverData = Array.from({ length: this.quantity }, () => ({
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
  calculateDiscountPercentage() {
    // Calculate discount percentage based on discountamt
    const discountamt = this.myform.get('discountamt')?.value ?? 0;
    const basicrate = this.myform.get('basicrate')?.value ?? 0;
    const quantity = this.myform.get('quantity')?.value ?? 0;

    const discountPercentage = (discountamt / (basicrate * quantity)) * 100;
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
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
  }
  goBack() {
    this.router.navigate(["/transcationdashboard"])
  }
  onSelectChange(select: HTMLSelectElement, dcout: Dcout) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      dcout.taxrate1 = numericValue;

      // Use numericValue as needed
    } else {
      dcout.taxrate1 = 0;

      console.error('Selected text does not represent a valid number.');
    }
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
  onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for up and down arrow keys
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }
}
