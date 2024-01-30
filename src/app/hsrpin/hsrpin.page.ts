import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder } from '@angular/forms';
import { IonPopover, IonicModule, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { ExecutiveService } from '../services/executive.service';
import { GsttypeService } from '../services/gsttype.service';
import { dcinstore } from '../services/dcin.service';
import { HsrpinService, hsrpinstore } from '../services/hsrpin.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
import { AdditemService } from '../services/additem.service';
import { FormValidationService } from '../form-validation.service';
import { SalesService } from '../services/sales.service';

interface Hsrpin {
  selectedItemAttributes: unknown[];
  barcode: string;
  part: number;
  frame: number;
  engine_no: number;
  vehicle_no: number;
  vehicle_reg_no: number;
  vehicle_reg_date: number;
  hsrp_front: number;
  hsrp_rear: number;
  mrp: string;
  netrate: number;
  description: string;
  hsn_code: string;
  quantity: number;
  basicrate: number;
  totaltax: number;
  taxrate: number;
  tcs_value: number;
  itemname: string;
  itemcode: number,
  taxrate1: number;
  discountamt: 0,
  discount: number;
  selectedItemId: number;
  itemid: number;
  CGST: number;
  SGST: number;
  IGST: number;
  total: number;
  grossrate: number;
  engineframenumber: string;
  customername: string;
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
  selector: 'app-hsrpin',
  templateUrl: './hsrpin.page.html',
  styleUrls: ['./hsrpin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class HsrpinPage implements OnInit {
  @ViewChild('popover', { static: false })
  popover!: IonPopover;
  selectedItemAttributes = [
    { attributes: ['attr1', 'attr2', 'attr3', 'attr3', 'attr5', 'attr5', 'attr6', 'attr7', 'attr8'] },
    // Add more objects as needed
  ];
  myform: FormGroup;
  itemcode: number = 0;

  billformate: number = 0
  billno: string = '';
  hsrpdate: string = '';
  suppliercode: string = '';
  spler: number = 0;
  refrence: string = '';
  refdate: string = '';
  executive_name: number = 0;
  part: number = 0;
  frame: number = 0;
  itemname: number = 0;
  engine_no: number = 0;
  vehicle_no: number = 0;
  vehicle_reg_no: number = 0;
  vehicle_reg_date: number = 0;
  hsrp_front: number = 0;
  hsrp_rear: number = 0;
  description: string = '';
  hsn_code: string = '';
  quantity: number = 0;
  basicrate: number = 0;
  totaltax: number = 0;
  taxrate: number = 0;
  tcs_value: number = 0;
  totalitemno: number = 0;
  totalquantity: number = 0;
  totalgrossamt: number = 0;
  deliverydate: string = '';
  deliveryplace: string = '';
  openingbalance: number = 0;
  debit: number = 0;
  closingbalance: number = 0;
  credit: number = 0;
  totaldiscountamt: number = 0;
  totaltaxamount: number = 0;
  roundoff: number = 0;
  pretax: number = 0;
  posttax: number = 0;
  totalnetamount: number = 0;
  supplier$: Observable<any[]>;
  executive$: Observable<any>;
  selectGst$: Observable<any>;
  navCtrl: any;
  cdr: any;
  isOpen = false;
  hsrpindata: Hsrpin[] = [{
    barcode: '',
    itemcode: 0,
    itemid: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
    total: 0,
    grossrate: 0,

    part: 0,
    frame: 0,
    engine_no: 0,
    vehicle_no: 0,
    vehicle_reg_no: 0,
    vehicle_reg_date: 0,
    hsrp_front: 0,
    hsrp_rear: 0,
    description: '',
    hsn_code: '',
    mrp: '',
    netrate: 0,
    quantity: 0,
    basicrate: 0,
    totaltax: 0,
    taxrate: 0,
    tcs_value: 0,
    itemname: '',
    selectedItemId: 0,
    taxrate1: 0,
    discountamt: 0,
    discount: 0,
    engineframenumber: '',
    customername: '',
    selectedItemAttributes: [''],
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

  rows = [
    { part: null, frame: null, engine_no: null, vehicle_no: null, vehicle_reg_no: null, vehicle_reg_date: null, hsrp_front: null, hsrp_rear: null, description: null, hsn_code: null, quantity: null, basicrate: null, totaltax: null, taxrate: null, tcs_value: null, itemname: null },
    // Add more rows as needed
  ];
  ttotal!: number;
  itemnames$: Observable<any[]>;
  firstInvalidInput: any;
  isQuantityEntered = false;
  vend: any;

  purchasebyid$: Observable<any[]>
  isQuantityPopoverOpen: boolean = false;
  itemid: number = 0;

  constructor(private saleService: SalesService, private hsrpinservice: HsrpinService, private formService: FormValidationService, private itemService: AdditemService, private popoverController: PopoverController, private router: Router, private formBuilder: FormBuilder, private vendorService: VendorService, private encService: EncryptionService, private executiveService: ExecutiveService, private GstService: GsttypeService) {
    const compid = '1';
    this.supplier$ = this.vendorService.fetchallVendor(encService.encrypt(compid), '', '');
    this.executive$ = this.executiveService.getexecutive();
    this.selectGst$ = this.GstService.getgsttype();
    this.itemnames$ = this.itemService.getAllItems();
    this.hsrpdate = new Date().toISOString().split('T')[0];
    this.refdate = new Date().toISOString().split('T')[0];
    this.purchasebyid$ = new Observable;



    this.myform = formBuilder.group({
      billformate: [''],
      billno: [''],
      hsrpdate: [''],
      suppliercode: [''],
      spler: [''],
      refrence: [''],
      refdate: [''],
      executive_name: [''],
      part: [''],
      frame: [''],
      itemname: [''],
      engine_no: [''],
      vehicle_no: [''],
      vehicle_reg_no: [''],
      vehicle_reg_date: [''],
      hsrp_front: [''],
      hsrp_rear: [''],
      description: [''],
      hsn_code: [''],
      quantity: [''],
      basicrate: [''],
      totaltax: [''],
      taxrate: [''],
      tcs_value: [''],
      totalitemno: [''],
      totalquantity: [''],
      totalgrossamt: [''],
      deliverydate: [''],
      deliveryplace: [''],
      openingbalance: [''],
      debit: [''],
      closingbalance: [''],
      credit: [''],
      totaldiscountamt: [''],
      totaltaxamount: [''],
      roundoff: [''],
      posttax: [''],
      pretax: [''],
      totalnetamount: [''],
      ttotal: [''],
      attribute1: [''],
      attribute2: [''],
      attribute3: [''],
      attribute4: [''],
      attribute5: [''],
      attribute6: [''],
      attribute7: [''],
      attribute8: [''],
      itemcode: 0,
      IGST: 0,
      CGST: 0,
      SGST: 0,
      engineframenumber: [''],
      customername: [''],

    })
  }
  async ionViewWillEnter() {
    //   const userid = await this.session.getValue('userid');
    //   if (userid == null || userid == 'undefined' || userid == '') {
    //     this.router.navigate(['/login']);
    //   }
    //  this.setlangvals();
    this.hsrpindata = [{
      part: 0,
      frame: 0,
      engine_no: 0,
      vehicle_no: 0,
      vehicle_reg_no: 0,
      vehicle_reg_date: 0,
      hsrp_front: 0,
      hsrp_rear: 0,
      description: '',
      hsn_code: '',
      mrp: '',
      netrate: 0,
      quantity: 0,
      basicrate: 0,
      totaltax: 0,
      taxrate: 0,
      tcs_value: 0,
      itemname: '',
      itemcode: 0,
      selectedItemId: 0,
      taxrate1: 0,
      discountamt: 0,
      discount: 0,
      barcode: '',
      itemid: 0,
      CGST: 0,
      SGST: 0,
      IGST: 0,
      total: 0,
      grossrate: 0,
      selectedItemAttributes: [''],
      engineframenumber: '',
      customername: '',
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

  onItemSelect(hsrpin: Hsrpin) {
    this.itemnames$.subscribe((items) => {
      const selectedItem = items.find((item) => item.tid === hsrpin.itemname);
      if (selectedItem) {
        hsrpin.selectedItemId = selectedItem; // Store the selected item
        hsrpin.selectedItemAttributes = Object.values(selectedItem.attributes);
      }
    });
  }

  getVendors(event: any) {
    const compid = '1';
    const identifier = this.vend ? 'custcode' : 'custname';
    const value = this.vend;

    this.vendorService.fetchallVendor(compid, '', value).subscribe(
      (data) => {


        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.vendcode = itemDetails.vendor_code;
          event.supplier = itemDetails.name;
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
  removehsrpin(index: number, hsrpin: Hsrpin) {
    this.ttotal = this.ttotal - this.saleService.total;
    this.hsrpindata.splice(index, 1);
  }
  openQuantityPopover(hsrpin: Hsrpin) {
    this.purchasebyid$ = this.saleService.fetchallPurchaseById(this.itemcode, 1);
    this.purchasebyid$.subscribe(data => {
      console.log('puchase data', data); // Log the data to the console to verify if it's being fetched
      // this.totalItems = data.length;
    });
    this.hsrpindata[0].quantityPopoverData = new Array(hsrpin.quantity).fill({})
      .map(() => ({ attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', companyid: 0, itemcode: 0 }));
    this.isQuantityPopoverOpen = true;
  }
  closeQuantityPopover() {
    this.isQuantityPopoverOpen = false;
  }

  addHsrpin() {
    console.log('addquotewww' + this.hsrpindata.length);
    // You can initialize the new row data here
    let newRow: hsrpinstore = {
      barcode: '',
      itemcode: 0,
      itemname: '',
      description: '',
      quantity: 0,
      mrp: '',
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
      part: 0,
      vehicle_no: 0,
      hsrp_front: 0,
      hsrp_rear: 0,
      hsn_code: '',
      tcs_value: 0,
      billformate: 0,
      billno: '',
      hsrpdate: '',
      suppliercode: '',
      spler: 0,
      refrence: '',
      refdate: '',
      executive_name: 0,
      totalitemno: 0,
      totalquantity: 0,
      totalgrossamt: 0,
      deliverydate: '',
      deliveryplace: '',
      openingbalance: 0,
      debit: 0,
      closingbalance: 0,
      credit: 0,
      totaldiscountamt: 0,
      totaltaxamount: 0,
      roundoff: 0,
      pretax: 0,
      posttax: 0,
      totalnetamount: 0,
      ttotal: 0,
      quantityPopoverData: this.hsrpindata[0].quantityPopoverData.map(attr => ({ ...attr })),
      frame: 0,
      engine_no: 0,
      vehicle_reg_no: 0,
      vehicle_reg_date: 0
    };


    this.hsrpindata.push();
    // Reset newRow back to an empty object to prepare for the next iteration

  }
  async onSubmit(form: FormGroup, hsrpindata: Hsrpin[]) {
    const fields = { itemname: this.itemname, quantity: this.quantity, description: this.description }
    // const isValid = await this.formService.validateForm(fields);
    console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(hsrpindata));

    if (await this.formService.validateForm(fields)) {
      let hsrpindatas: hsrpinstore[] = [];

      for (const element of hsrpindata) {
        element.grossrate = element.basicrate * element.quantity;
        element.netrate = element.basicrate + element.totaltax;
        element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = (element.quantity * (element.taxrate1 / 100 * element.basicrate));
        this.totalquantity = element.total + +element.quantity;

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
        let hsrpindata: hsrpinstore = {
          barcode: element.barcode,
          itemcode: element.itemcode,
          itemname: element.itemname,
          description: element.description,
          quantity: element.quantity,
          mrp: element.mrp,
          basicrate: element.basicrate,
          netrate: element.netrate,
          grossrate: element.grossrate, // Add grossrate
          taxrate: element.taxrate,
          IGST: element.IGST,
          CGST: element.CGST,
          SGST: element.SGST,
          totaltax: element.totaltax,
          total: element.total,
          hsn_code: element.hsn_code,
          tcs_value: element.tcs_value,
          vehicle_no: element.vehicle_no,
          hsrp_front: element.hsrp_front,
          hsrp_rear: element.hsrp_rear,
          billformate: this.myform.value.billformate,
          billno: this.myform.value.billno,
          hsrpdate: this.myform.value.hsrpdate,
          suppliercode: this.myform.value.suppliercode,
          spler: this.myform.value.spler,
          refrence: this.myform.value.refrence,
          refdate: this.myform.value.refdate,
          executive_name: this.myform.value.executive_name,
          totalitemno: this.myform.value.totalitemno,
          totalquantity: this.myform.value.totalquantity,
          totalgrossamt: this.myform.value.totalgrossamt,
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          openingbalance: this.myform.value.opening_balance,
          debit: this.myform.value.debit,
          closingbalance: this.myform.value.closingbalance,
          credit: this.myform.value.credit,
          totaldiscountamt: this.myform.value.totaldiscountamt,
          totaltaxamount: this.myform.value.totaltaxamount,
          roundoff: this.myform.value.roundoff,
          pretax: this.myform.value.pretax,
          posttax: this.myform.value.posttax,
          totalnetamount: this.myform.value.totalnetamount,
          ttotal: 0,
          quantityPopoverData: attributesArray,
          part: 0,
          frame: 0,
          engine_no: 0,
          vehicle_reg_no: 0,
          vehicle_reg_date: 0,
          discount: 0,
          discountamt: 0,
          taxrate1: 0,
          itemid: 0,
          selectedItemId: 0
        };

        hsrpindatas.push(hsrpindata);
      }
      this.hsrpinservice.createhsrpin(hsrpindatas, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
          }, 1000);
          this.formService.showSaveLoader();
          // this.myform.reset();
          location.reload()
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
  removeHsrpin(index: number, hsrpin: hsrpinstore) {
    this.ttotal = this.ttotal - hsrpin.ttotal;
    this.hsrpindata.splice(index, 1);
  }
  onButtonClick() {
    // Add any additional logic you may need before closing the page
    this.navCtrl.back(); // This will navigate back to the previous page
    this.cdr.detectChanges();

  }
  onNew() {
    location.reload();
  }
  ngOnInit() {
    this.quantity = 1; // Set an initial value for quantity

    console.log('selectedItemAttributes', this.selectedItemAttributes);
    this.hsrpindata[0].quantityPopoverData = Array.from({ length: this.quantity }, () => ({
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
  goBack() {
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }

  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  // async presentPopover(hsrpin: Hsrpin) {
  //   const popover = await this.popoverController.create({
  //     component: QuantitypopoverPage,
  //     cssClass: 'popover-content',
  //     componentProps: {
  //       quantity: hsrpin.quantity,
  //       selectedItem: hsrpin.selectedItemId,
  //     },
  //     translucent: true,
  //   });
  //   return await popover.present();
  // }



  getTotaltax(hsrpin: Hsrpin): number {
    return ((((hsrpin.quantity * hsrpin.basicrate) + ((this.pretax) / this.hsrpindata.length) - hsrpin.discountamt) * hsrpin.taxrate1 / 100));
  }
  getTotalamt(hsrpin: Hsrpin[]): number {
    let totalAmount = 0;

    hsrpin.forEach(hsrpin => {
      const pretaxPerItem = ((this.pretax / this.hsrpindata.length)); // Divide pretax equally among items

      const subtotal = (hsrpin.quantity * hsrpin.basicrate) + pretaxPerItem;
      const discount = ((hsrpin.discount / 100) * hsrpin.basicrate * hsrpin.quantity);
      const taxAmount = ((((hsrpin.quantity * hsrpin.basicrate) + pretaxPerItem) - hsrpin.discountamt) * hsrpin.taxrate1 / 100);

      const itemTotalAmount = subtotal + taxAmount - discount;
      totalAmount += itemTotalAmount;
    });

    return totalAmount;
  }
  getnetrate(hsrpin: Hsrpin): number {
    return hsrpin.basicrate + hsrpin.totaltax;
  }
  getgrossrate(hsrpin: Hsrpin): number {
    return hsrpin.quantity * hsrpin.basicrate;
  }
  getTotalQuantity(): number {
    this.totalquantity = this.hsrpindata.reduce((total, hsrpin) => total + +hsrpin.quantity, 0);
    return this.totalquantity;
  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.hsrpindata.reduce((total, hsrpin) => {
      const grossAmount = (hsrpin.quantity * hsrpin.basicrate);
      return total + grossAmount;
    }, 0);

    return this.totalgrossamt = totalGrossAmount;
  }
  getTotalDiscountAmount(): number {
    this.totaldiscountamt = this.hsrpindata.reduce((total, hsrpin) => total + (hsrpin.discount / 100) * hsrpin.basicrate * hsrpin.quantity, 0);
    return this.totaldiscountamt;
  }
  getTotalTaxAmount(): number {
    return this.hsrpindata.reduce((total, hsrpin) => {
      const subtotal = ((hsrpin.quantity * hsrpin.basicrate) + ((this.pretax) / this.hsrpindata.length)) - hsrpin.discountamt;
      const taxAmount = subtotal * (hsrpin.taxrate1 / 100);
      return this.totaltaxamount = total + taxAmount;
    }, 0);
  }
  getTaxableAmount(): number {
    const taxableAmount = this.hsrpindata.reduce((total, hsrpin) => {
      // Assuming getgrossrate is a function that calculates gross rate based on quote
      const grossRate = this.getgrossrate(hsrpin);

      // Assuming pretax, discount, and taxamt are properties of your quote object

      const discount = hsrpin.discountamt || 0;
      const taxamt = hsrpin.totaltax || 0;

      // Calculate the taxable amount for the current quote
      const quoteTaxableAmount = (grossRate - discount + (this.pretax / this.hsrpindata.length)) + taxamt;

      // Add the taxable amount of the current quote to the total
      total += quoteTaxableAmount;

      return total;
    }, 0);

    return this.totalnetamount = taxableAmount;
  }

  getRoundoff(): number {
    // Calculate the total amount without rounding
    const roundedTotalAmount = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax // Change 2 to the desired number of decimal places

    return this.roundoff = roundedTotalAmount;
  }
  getGrandTotal(): number {
    const grandTotal = this.hsrpindata.reduce((total, hsrpin) => {
      const gtotal = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax;
      return gtotal;
    }, 0);

    return grandTotal;
  }
  getcgst(hsrpin: Hsrpin): number {
    return this.getTotaltax(hsrpin) / 2;
  }

  getsgst(hsrpin: Hsrpin): number {
    return this.getTotaltax(hsrpin) / 2;
  }

  getigst(hsrpin: Hsrpin): number {
    return this.getTotaltax(hsrpin);
  }
  // updateRows(hsrpin: Hsrpin) {
  //   // Open the popover when quantity changes
  //   if (hsrpin.quantity > 0) {
  //     this.presentPopover(hsrpin);
  //   }
  // }
  getItems(hsrpin: any) {
    const compid = 1;
    const identifier = hsrpin.selectedItemId ? 'itemname' : 'itemcode';
    const value = hsrpin.selectedItemId || hsrpin.itemcode;
    const grate = [0, 3, 5, 12, 18, 28, 0, 0, 0];
    this.itemnames$.subscribe(items => {
      const selectedItem = items.find(item => item.tid === hsrpin.itemname);

      if (selectedItem) {
        this.selectedItemAttributes = selectedItem.attributes;
      } else {
        this.selectedItemAttributes = [];
      }
    });
    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          hsrpin.name = itemDetails.customername;

          hsrpin.itemcode = itemDetails.itemCode;
          hsrpin.itemname = itemDetails.itemDesc;
          hsrpin.barcode = itemDetails.barcode.toString();
          hsrpin.unitname = itemDetails.unitname;
          hsrpin.hunitname = itemDetails.unitid;
          hsrpin.taxrate = grate[itemDetails.selectGst];
          hsrpin.taxrate1 = grate[itemDetails.selectGst];
          hsrpin.mrp = itemDetails.mrp;
          hsrpin.basicrate = itemDetails.basicrate;
          hsrpin.netrate = itemDetails.netrate;
          hsrpin.attribute1 = itemDetails.attr1,
            hsrpin.attribute2 = itemDetails.attr2,
            hsrpin.attribute3 = itemDetails.attr3,
            hsrpin.attribute4 = itemDetails.attr4,
            hsrpin.attribute5 = itemDetails.attr5,
            hsrpin.attribute6 = itemDetails.attr6,
            hsrpin.attribute7 = itemDetails.attr7,
            hsrpin.attribute8 = itemDetails.attr8,
            hsrpin.GST = grate[itemDetails.GSTType];
          hsrpin.taxrate1 = grate[itemDetails.GSTType];
          hsrpin.hsn_code = itemDetails.hsn_code;
          hsrpin.description = itemDetails.itemDesc;
          hsrpin.mrp = itemDetails.mrp;
          hsrpin.netrate = itemDetails.price;
          hsrpin.basicrate = itemDetails.price;
          // Update form control values
          this.myform.patchValue({
            itemcode: hsrpin.itemcode,
            itemname: hsrpin.itemname,
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
}
