import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
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

interface Hsrpout {
  part: number;
  frame: number;
  engine_no: number;
  vehicle_no: number;
  vehicle_reg_no: number;
  vehicle_reg_date: number;
  hsrp_front: number;
  hsrp_rear: number;
  description: string;
  hsn_code: string;
  quantity: number;
  basic_rate: number;
  gst_type: number;
  tax_amt: number;
  tcs_value: number;
  itemname:number;
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
  myform: FormGroup;

  billformate: number = 0
  billno: string = '';
  hsrpdate: string = '';
  suppliercode: string = '';
  customertype: number = 0;
  refrence: string = '';
  refdate: string = '';
  executive_name: number = 0;
  part: number = 0;
  frame: number = 0;
  itemname:number=0;
  engine_no: number = 0;
  vehicle_no: number = 0;
  vehicle_reg_no: number = 0;
  vehicle_reg_date: number = 0;
  hsrp_front: number = 0;
  hsrp_rear: number = 0;
  description: string = '';
  hsn_code: string = '';
  quantity: number = 0;
  basic_rate: number = 0;
  gst_type: number = 0;
  tax_amt: number = 0;
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
  executive$: Observable<any[]>;
  customers$: Observable<any>;
  selectGst$: Observable<any>;
  navCtrl: any;
  cdr: any;
  isOpen = false;
  hsrpoutdata: Hsrpout[] = [{
    part: 0,
    frame: 0,
    engine_no: 0,
    vehicle_no: 0,
    vehicle_reg_no: 0,
    vehicle_reg_date:0,
    hsrp_front:0,
    hsrp_rear: 0,
    description: '',
    hsn_code: '',
    quantity:0,
    basic_rate:0,
    gst_type:0,
    tax_amt: 0,
    tcs_value: 0,
    itemname:0,
  }];
  rows = [
    { part: null, frame: null, engine_no: null, vehicle_no: null, vehicle_reg_no: null, vehicle_reg_date: null, hsrp_front: null, hsrp_rear: null, description: null, hsn_code: null, quantity: null, basic_rate: null, gst_type: null, tax_amt: null, tcs_value: null, itemname: null },
    // Add more rows as needed
  ];
  
  itemnames$: Observable<any[]>;
  firstInvalidInput: any;
  constructor(private hsrpoutservice : HsrpoutService,private formService: FormValidationService,private itemService: AdditemService,private popoverController: PopoverController,private router : Router,private formBuilder: FormBuilder,private GstService:GsttypeService,private custService:CustomerService,private encService: EncryptionService,private executiveService:ExecutiveService) { 
    const compid='1';
    this.customers$ = this.custService.fetchallCustomer(encService.encrypt(compid), '', '');
    this.executive$ = this.executiveService.getexecutive();
    this.selectGst$ = this.GstService.getgsttype();
    this.itemnames$ = this.itemService.getAllItems();

    this.myform = formBuilder.group({
      billformate: [''],
      billno: [''],
      hsrpdate: [''],
      suppliercode: [''],
      customertype: [''],
      refrence: [''],
      refdate: [''],
      executive_name: [''],
      part: [''],
      frame: [''],
      itemname:[''],
      engine_no: [''],
      vehicle_no: [''],
      vehicle_reg_no: [''],
      vehicle_reg_date: [''],
      hsrp_front: [''],
      hsrp_rear: [''],
      description: [''],
      hsn_code: [''],
      quantity: [''],
      basic_rate: [''],
      gst_type: [''],
      tax_amt: [''],
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
    })
  }
  async onSubmit(form: FormGroup, hsrpoutdata: Hsrpout[]) {
    const fields = {itemname: this.itemname, quantity: this.quantity, description: this.description }
     const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(hsrpoutdata));

      let hsrpoutdatas: hsrpout[] = [];

      for (const element of hsrpoutdata) {
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

        const hsrpoutdata: hsrpout = {
          billformate:  this.myform.value.billformate,
          billno: this.myform.value.billno,
          hsrpdate: this.myform.value.hsrpdate,
          suppliercode: this.myform.value.suppliercode,
          spler:  this.myform.value.spler,
          refrence:  this.myform.value.refrence,
          refdate:  this.myform.value.refdate,
          executive_name:  this.myform.value.executive_name,
          part:  this.myform.value.part,
          frame:  this.myform.value.frame,
          engine_no:  this.myform.value.engine_no,
          vehicle_no:  this.myform.value.vehicle_no,
          vehicle_reg_no:  this.myform.value.vehicle_reg_date,
          vehicle_reg_date:  this.myform.value.vehicle_reg_date,
          hsrp_front:  this.myform.value.hsrp_front,
          hsrp_rear:  this.myform.value.hsrp_rear,
          description:  this.myform.value.description,
          hsn_code:  this.myform.value.hsn_code,
          quantity:  this.myform.value.quantity,
          basic_rate:  this.myform.value.basic_rate,
          gst_type:  this.myform.value.gst_type,
          tax_amt:  this.myform.value.tax_amt,
          tcs_value:  this.myform.value.tcs_value,
          totalitemno:  this.myform.value.totalitemno,
          totalquantity:  this.myform.value.totalquantity,
          totalgrossamt:  this.myform.value.totalgrossamt,
          deliverydate:  this.myform.value.deliverydate,
          deliveryplace:  this.myform.value.deliveryplace,
          openingbalance:  this.myform.value.opening_balance,
          debit:  this.myform.value.debit,
          closingbalance:  this.myform.value.closingbalance,
          credit:  this.myform.value.credit,
          totaldiscountamt:  this.myform.value.totaldiscountamt,
          totaltaxamount:  this.myform.value.totaltaxamount,
          roundoff:  this.myform.value.roundoff,
          pretax:  this.myform.value.pretax,
          posttax:  this.myform.value.posttax,
          totalnetamount:  this.myform.value.totalnetamount,
          mrp:  this.myform.value.mrp,
          netrate:  this.myform.value.netrate
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
  }
  goBack() {
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }
  presentPopovers(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  async presentPopover(quote: any) {
    const popover = await this.popoverController.create({
      component: QuantitypopoverPage,
      cssClass: 'popover-content',
      componentProps: {
        quantity: quote.quantity, // Pass the quantity to the popup component
      },
      translucent: true,
    });
    return await popover.present();
  }



  updateRows(hsrpout: hsrpout) {
    // Open the popover when quantity changes
    if (hsrpout.quantity > 0) {
      this.presentPopover(hsrpout);
    }
  }
  getItems(hsrpout: any) {
    const compid = 1;
    const identifier = hsrpout.selectedItemId ? 'itemname' : 'itemcode';
    const value = hsrpout.selectedItemId || hsrpout.itemcode;
    const grate = [0, 3, 5, 12, 18, 28, 0, 0, 0];
    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];
          hsrpout
          // Update the quote properties
          hsrpout.itemcode = itemDetails.itemCode;
          hsrpout.itemname = itemDetails.itemDesc;
          hsrpout.barcode = itemDetails.barcode.toString();
          hsrpout.unitname = itemDetails.unitname;
          hsrpout.hunitname = itemDetails.unitid;
          hsrpout.taxrate = grate[itemDetails.selectGst];
          hsrpout.taxrate1 = grate[itemDetails.selectGst];
          hsrpout.basicrate = itemDetails.basicrate;
          hsrpout.mrp = itemDetails.mrp;
          hsrpout.basicrate = itemDetails.basic_rate;
          hsrpout.netrate = itemDetails.net_rate;


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

}
