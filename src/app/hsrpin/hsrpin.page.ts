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
import { HsrpinService, hsrpin } from '../services/hsrpin.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
import { AdditemService } from '../services/additem.service';
import { FormValidationService } from '../form-validation.service';
import { SalesService } from '../services/sales.service';

interface Hsrpin {
  selectedItemAttributes: unknown[];
  part: number;
  frame: number;
  engine_no: number;
  vehicle_no: number;
  vehicle_reg_no: number;
  vehicle_reg_date: number;
  hsrp_front: number;
  hsrp_rear: number;
  mrp: string;
  netrate: string;
  description: string;
  hsn_code: string;
  quantity: number;
  basicrate: number;
  totaltax: number;
  taxrate: number;
  tcs_value: number;
  itemname: number;
  itemcode: number,

  selectedItem: any; // New property to store the selected item
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
    netrate: '',
    quantity: 0,
    basicrate: 0,
    totaltax: 0,
    taxrate: 0,
    tcs_value: 0,
    itemname: 0,
    itemcode: 0,
    selectedItem: 0,// New property to store the selected item
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
  rows = [
    { part: null, frame: null, engine_no: null, vehicle_no: null, vehicle_reg_no: null, vehicle_reg_date: null, hsrp_front: null, hsrp_rear: null, description: null, hsn_code: null, quantity: null, basicrate: null, totaltax: null, taxrate: null, tcs_value: null, itemname: null },
    // Add more rows as needed
  ];
  ttotal!: number;
  itemnames$: Observable<any[]>;
  firstInvalidInput: any;
  isQuantityEntered = false;

  purchasebyid$: Observable<any[]>
  isQuantityPopoverOpen: boolean = false;
  constructor(private saleService: SalesService, private hsrpinservice: HsrpinService, private formService: FormValidationService, private itemService: AdditemService, private popoverController: PopoverController, private router: Router, private formBuilder: FormBuilder, private vendorService: VendorService, private encService: EncryptionService, private executiveService: ExecutiveService, private GstService: GsttypeService) {
    const compid = '1';
    this.supplier$ = this.vendorService.fetchallVendor(encService.encrypt(compid), '', '');
    this.executive$ = this.executiveService.getexecutive();
    this.selectGst$ = this.GstService.getgsttype();
    this.itemnames$ = this.itemService.getAllItems();

    this.purchasebyid$ = this.saleService.fetchallPurchaseById(this.itemcode, 1);
    this.purchasebyid$.subscribe(data => {
      console.log('puchase data', data); // Log the data to the console to verify if it's being fetched
      // this.totalItems = data.length;
    });
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
      netrate: '',
      quantity: 0,
      basicrate: 0,
      totaltax: 0,
      taxrate: 0,
      tcs_value: 0,
      itemname: 0,
      itemcode: 0,
      selectedItem: 0,// New property to store the selected item
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

  onItemSelect(hsrpin: Hsrpin) {
    this.itemnames$.subscribe((items) => {
      const selectedItem = items.find((item) => item.tid === hsrpin.itemname);
      if (selectedItem) {
        hsrpin.selectedItem = selectedItem; // Store the selected item
        hsrpin.selectedItemAttributes = Object.values(selectedItem.attributes);
      }
    });
  }

  openQuantityPopover(hsrpin: Hsrpin) {
    this.hsrpindata[0].quantityPopoverData = new Array(hsrpin.quantity).fill({})
      .map(() => ({ attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', companyid: 0, itemcode: 0 }));
    this.isQuantityPopoverOpen = true;
  }
  closeQuantityPopover() {
    this.isQuantityPopoverOpen = false;
  }

  addHsrp() {
    console.log('addquotewww' + this.hsrpindata.length);
    // You can initialize the new row data here
    let newRow: hsrpin = {
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
      netrate: '',
      quantity: 0,
      totaltax: 0,
      taxrate: 0,
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
      basicrate: 0,
    };


    this.hsrpindata.push();
    // Reset newRow back to an empty object to prepare for the next iteration

  }
  async onSubmit(form: FormGroup, hsrpindata: Hsrpin[]) {
    const fields = { itemname: this.itemname, quantity: this.quantity, description: this.description }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(hsrpindata));

      let hsrpindatas: hsrpin[] = [];

      for (const element of hsrpindata) {
        // element.grossrate = element.basicrate * element.quantity;
        // // element.netrate = element.basicrate + element.totaltax;
        // element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        // element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        // element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        // element.total = element.totaltax + element.grossrate;
        // element.totaltax = (element.quantity * (element.taxrate1 / 100 * element.basicrate))
        // this.totalquantity= element.total + +element.quantity;
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
        const hsrpindata: hsrpin = {
          // itemcode: element.itemcode,
          // itemname: element.itemname,
          description: element.description,
          quantity: element.quantity,
          mrp: element.mrp,
          basicrate: element.basicrate,
          netrate: element.netrate,
          taxrate: element.taxrate,
          totaltax: element.totaltax,
          hsn_code: element.hsn_code,
          tcs_value: element.tcs_value,
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
          vehicle_no: 0,
          vehicle_reg_no: 0,
          vehicle_reg_date: 0,
          hsrp_front: 0,
          hsrp_rear: 0
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
  removeHsrpin(index: number, hsrpin: hsrpin) {
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
  }
  goBack() {
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }

  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  async presentPopover(hsrpin: Hsrpin) {
    const popover = await this.popoverController.create({
      component: QuantitypopoverPage,
      cssClass: 'popover-content',
      componentProps: {
        quantity: hsrpin.quantity,
        selectedItem: hsrpin.selectedItem,
      },
      translucent: true,
    });
    return await popover.present();
  }




  updateRows(hsrpin: Hsrpin) {
    // Open the popover when quantity changes
    if (hsrpin.quantity > 0) {
      this.presentPopover(hsrpin);
    }
  }
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
          hsrpin.itemcode = itemDetails.itemCode;
          hsrpin.itemname = itemDetails.itemDesc;
          hsrpin.barcode = itemDetails.barcode.toString();
          hsrpin.unitname = itemDetails.unitname;
          hsrpin.hunitname = itemDetails.unitid;
          hsrpin.taxrate = grate[itemDetails.selectGst];
          hsrpin.taxrate1 = grate[itemDetails.selectGst];
          hsrpin.basicrate = itemDetails.basicrate;
          hsrpin.mrp = itemDetails.mrp;
          hsrpin.basicrate = itemDetails.basicrate;
          hsrpin.netrate = itemDetails.net_rate;
          hsrpin.attribute1 = itemDetails.attr1,
            hsrpin.attribute2 = itemDetails.attr2,
            hsrpin.attribute3 = itemDetails.attr3,
            hsrpin.attribute4 = itemDetails.attr4,
            hsrpin.attribute5 = itemDetails.attr5,
            hsrpin.attribute6 = itemDetails.attr6,
            hsrpin.attribute7 = itemDetails.attr7,
            hsrpin.attribute8 = itemDetails.attr8,

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
