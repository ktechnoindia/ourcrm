import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonPopover, IonicModule, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EncryptionService } from '../services/encryption.service';
import { ExecutiveService } from '../services/executive.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { GsttypeService } from '../services/gsttype.service';
import { FormValidationService } from '../form-validation.service';
import { AdditemService } from '../services/additem.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
import { HsrpoutService, hsrpout } from '../services/hsrpout.service';
import { SalesService } from '../services/sales.service';
import { HsrpinService } from '../services/hsrpin.service';

interface Hsrpout {
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
  selector: 'app-hsrpout',
  templateUrl: './hsrpout.page.html',
  styleUrls: ['./hsrpout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class HsrpoutPage implements OnInit {
  @ViewChild('popover', { static: false })
  popover!: IonPopover;
  selectedItemAttributes = [
    { attributes: ['attr1', 'attr2', 'attr3', 'attr3', 'attr5', 'attr5', 'attr6', 'attr7', 'attr8'] },
    // Add more objects as needed
  ];
  myform: FormGroup;
  itemcode: number = 0;
  engineframenumber:string='';
  billformate: number = 0
  billno: string = '';
  hsrpdate: string = '';
  custcode: string = '';
  custname: number = 0;
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
  executive$: Observable<any>;
  selectGst$: Observable<any>;
  navCtrl: any;
  cdr: any;
  isOpen = false;
  hsrpoutdata: Hsrpout[] = [{
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

  isQuantityPopoverOpen: boolean = false;
  itemid: number = 0;
  customers$: Observable<any[]>
  cust: any;

  purchasebyid$ :Observable<any[]>

  constructor(private hsrpinservice : HsrpinService,private saleService: SalesService,private hsrpoutservice : HsrpoutService,private formService: FormValidationService,private itemService: AdditemService,private popoverController: PopoverController,private router : Router,private formBuilder: FormBuilder,private GstService:GsttypeService,private custService:CustomerService,private encService: EncryptionService,private executiveService:ExecutiveService) { 
    const compid='1';
  
    this.customers$ = this.custService.fetchallCustomer(encService.encrypt(compid), '', '');
    this.executive$ = this.executiveService.getexecutive();
    this.selectGst$ = this.GstService.getgsttype();
    this.itemnames$ = this.itemService.getAllItems();
    this.hsrpdate = new Date().toISOString().split('T')[0];
    this.refdate = new Date().toISOString().split('T')[0];
    this.purchasebyid$=new Observable;

   
    this.myform = formBuilder.group({
      billformate: [''],
      billno: [''],
      engineframenumber:[''],
      hsrpdate: [''],
      custcode: [''],
    custname: [''],
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
      customername: [''],
    })
  }
  async ionViewWillEnter() {
    //   const userid = await this.session.getValue('userid');
    //   if (userid == null || userid == 'undefined' || userid == '') {
    //     this.router.navigate(['/login']);
    //   }
    //  this.setlangvals();
    this.hsrpoutdata = [{
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
  }
 
  getCustomers(event: any) {
    const compid = '1';
    const identifier = this.cust ? 'custcode' : 'custname';
    const value = this.cust;

    this.custService.fetchallCustomer(compid, '', value).subscribe(
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
  onItemSelect(hsrpout: Hsrpout) {
    this.itemnames$.subscribe((items) => {
      const selectedItem = items.find((item) => item.tid === hsrpout.itemname);
      if (selectedItem) {
        hsrpout.selectedItemId = selectedItem; // Store the selected item
        hsrpout.selectedItemAttributes = Object.values(selectedItem.attributes);
      }
    });
  }

  removehsrpout(index: number, hsrpout: Hsrpout) {
    this.ttotal = this.ttotal - this.saleService.total;
    this.hsrpoutdata.splice(index, 1);
  }

  openQuantityPopover(hsrpout: Hsrpout) {
    this.purchasebyid$ = this.saleService.fetchallPurchaseById(this.itemcode,1);
    this.purchasebyid$.subscribe(data => {
      console.log('puchase data',data); // Log the data to the console to verify if it's being fetched
      // this.totalItems = data.length;
        });
    this.hsrpoutdata[0].quantityPopoverData = new Array(hsrpout.quantity).fill({})
      .map(() => ({ attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '',companyid:0,itemcode:0 }));
    this.isQuantityPopoverOpen = true;
  }
  closeQuantityPopover() {
    this.isQuantityPopoverOpen = false;
  }
  addHsrpout() {
    console.log('addquotewww' + this.hsrpoutdata.length);
    // You can initialize the new row data here
    let newRow: hsrpout = {
      barcode:'',
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
      engineframenumber:'',
      hsrpdate: '',
      custcode: '',
      custname: 0,
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
      quantityPopoverData: this.hsrpoutdata[0].quantityPopoverData.map(attr => ({ ...attr })),
      frame: 0,
      engine_no: 0,
      vehicle_reg_no: 0,
      vehicle_reg_date: 0
    };


    this.hsrpoutdata.push();
    // Reset newRow back to an empty object to prepare for the next iteration

  }
  getItems(hsrpout: any) {
    const compid = 1;
    const identifier = hsrpout.selectedItemId ? 'itemname' : 'itemcode';
    const value = hsrpout.selectedItemId || hsrpout.itemcode;
    const grate = [0, 3, 5, 12, 18, 28, 0, 0, 0];
    this.itemnames$.subscribe(items => {
      const selectedItem = items.find(item => item.tid === hsrpout.itemname);

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
          hsrpout.itemcode = itemDetails.itemCode;
          hsrpout.itemname = itemDetails.itemDesc;
          hsrpout.barcode = itemDetails.barcode.toString();
          hsrpout.unitname = itemDetails.unitname;
          hsrpout.hunitname = itemDetails.unitid;
          hsrpout.taxrate = grate[itemDetails.selectGst];
          hsrpout.taxrate1 = grate[itemDetails.selectGst];
          hsrpout.mrp = itemDetails.mrp;
          hsrpout.basicrate = itemDetails.basicrate;
          hsrpout.netrate = itemDetails.netrate;
          hsrpout.attribute1 = itemDetails.attr1,
          hsrpout.attribute2 = itemDetails.attr2,
          hsrpout.attribute3 = itemDetails.attr3,
          hsrpout.attribute4 = itemDetails.attr4,
          hsrpout.attribute5 = itemDetails.attr5,
          hsrpout.attribute6 = itemDetails.attr6,
          hsrpout.attribute7 = itemDetails.attr7,
          hsrpout.attribute8 = itemDetails.attr8,

            // Update form control values
            this.myform.patchValue({
              itemcode: hsrpout.itemcode,
              itemname: hsrpout.itemname,
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
  // updateRows(hsrpout: hsrpout) {
  //   // Open the popover when quantity changes
  //   if (hsrpout.quantity > 0) {
  //     this.presentPopover(hsrpout);
  //   }
 // }
  async onSubmit(form: FormGroup, hsrpoutdata: Hsrpout[]) {
    const fields = {custcode: this.custcode, custname: this.custname ,itemname: this.itemname, quantity: this.quantity, description: this.description }
    console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(hsrpoutdata));

    //const isValid = await this.formService.validateForm(fields);

    if (await this.formService.validateForm(fields)) {
      let hsrpoutdatas: hsrpout[] = [];

      for (const element of hsrpoutdata) {
        element.grossrate = element.basicrate * element.quantity;
        // element.netrate = element.basicrate + element.totaltax;
        element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = (element.quantity * (element.taxrate1 / 100 * element.basicrate))
        this.totalquantity= element.total + +element.quantity;
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
          companyid: attr.companyid,
          itemcode: attr.itemcode,
        }))
       let hsrpoutdata: hsrpout = {
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
          engineframenumber:this.myform.value.engineframenumber,
          hsrpdate: this.myform.value.hsrpdate,
          custcode: this.myform.value.custcode,
          custname: this.myform.value.custname,
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

        hsrpoutdatas.push(hsrpoutdata);
      }
      this.hsrpoutservice.createhsrpout(hsrpoutdatas, '', '').subscribe(
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
    this.hsrpoutdata[0].quantityPopoverData = Array.from({ length: this.quantity }, () => ({
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
  // async presentPopover(hsrpout: Hsrpout) {
  //   const popover = await this.popoverController.create({
  //     component: QuantitypopoverPage,
  //     cssClass: 'popover-content',
  //     componentProps: {
  //       quantity: hsrpout.quantity,
  //       selectedItem: hsrpout.selectedItemId,
  //     },
  //     translucent: true,
  //   });
  //   return await popover.present();
  // }



  getTotaltax(hsrpout: Hsrpout): number {
    return ((((hsrpout.quantity * hsrpout.basicrate) + ((this.pretax) / this.hsrpoutdata.length) - hsrpout.discountamt) * hsrpout.taxrate1 / 100));
  }
  getTotalamt(hsrpout: Hsrpout[]): number {
    let totalAmount = 0;

    hsrpout.forEach(hsrpout => {
      const pretaxPerItem = ((this.pretax / this.hsrpoutdata.length)); // Divide pretax equally among items

      const subtotal = (hsrpout.quantity * hsrpout.basicrate) + pretaxPerItem;
      const discount = ((hsrpout.discount / 100) * hsrpout.basicrate * hsrpout.quantity);
      const taxAmount = ((((hsrpout.quantity * hsrpout.basicrate) + pretaxPerItem) - hsrpout.discountamt) * hsrpout.taxrate1 / 100);

      const itemTotalAmount = subtotal + taxAmount - discount;
      totalAmount += itemTotalAmount;
    });

    return totalAmount;
  }
  getnetrate(hsrpout: Hsrpout): number {
    return hsrpout.basicrate + hsrpout.totaltax;
  }
  getgrossrate(hsrpout: Hsrpout): number {
    return hsrpout.quantity * hsrpout.basicrate;
  }
  getTotalQuantity(): number {
    this.totalquantity = this.hsrpoutdata.reduce((total, hsrpout) => total + +hsrpout.quantity, 0);
    return this.totalquantity;
  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.hsrpoutdata.reduce((total, hsrpout) => {
      const grossAmount = (hsrpout.quantity * hsrpout.basicrate);
      return total + grossAmount;
    }, 0);

    return this.totalgrossamt = totalGrossAmount;
  }
  getTotalDiscountAmount(): number {
    this.totaldiscountamt = this.hsrpoutdata.reduce((total, hsrpout) => total + (hsrpout.discount / 100) * hsrpout.basicrate * hsrpout.quantity, 0);
    return this.totaldiscountamt;
  }
  getTotalTaxAmount(): number {
    return this.hsrpoutdata.reduce((total, hsrpout) => {
      const subtotal = ((hsrpout.quantity * hsrpout.basicrate) + ((this.pretax) / this.hsrpoutdata.length)) - hsrpout.discountamt;
      const taxAmount = subtotal * (hsrpout.taxrate1 / 100);
      return this.totaltaxamount = total + taxAmount;
    }, 0);
  }
  getTaxableAmount(): number {
    const taxableAmount = this.hsrpoutdata.reduce((total, hsrpout) => {
      // Assuming getgrossrate is a function that calculates gross rate based on quote
      const grossRate = this.getgrossrate(hsrpout);

      // Assuming pretax, discount, and taxamt are properties of your quote object

      const discount = hsrpout.discountamt || 0;
      const taxamt = hsrpout.totaltax || 0;

      // Calculate the taxable amount for the current quote
      const quoteTaxableAmount = (grossRate - discount + (this.pretax / this.hsrpoutdata.length)) + taxamt;

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
    const grandTotal = this.hsrpoutdata.reduce((total, hsrpout) => {
      const gtotal = this.getTaxableAmount() + this.getTotalTaxAmount() + this.posttax;
      return gtotal;
    }, 0);

    return grandTotal;
  }
  getcgst(hsrpout: Hsrpout): number {
    return this.getTotaltax(hsrpout) / 2;
  }

  getsgst(hsrpout: Hsrpout): number {
    return this.getTotaltax(hsrpout) / 2;
  }

  getigst(hsrpout: Hsrpout): number {
    return this.getTotaltax(hsrpout);
  }
 
 
}
