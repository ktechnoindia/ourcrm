import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, PopoverController, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
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
import { CustomerService } from '../services/customer.service';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';
interface Dcout {
  posttax: number;
  pretax: number;
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
  itemid: number;
}
@Component({
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
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

  dcoutData: Dcout[] = [{
    barcode: '',
    itemcode: 0,
    itemname: 0,
    description: '',
    quantity: 0,
    unitname: 0,
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
    pretax: 0,
    posttax: 0,
    itemid: 0,// Calculate grossrate after other properties
    grossrate: 0,
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
  unitname$: Observable<any[]>;
  taxrate$: Observable<any[]>;
  customer$: any;

  @ViewChild('firstInvalidInput') firstInvalidInput: any;

  constructor( private navCtrl:NavController,private popoverController:PopoverController,private custname1: CustomerService,private vendname1: VendorService, private encService: EncryptionService, private formBuilder: FormBuilder, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private dcout: DcoutService, private formService: FormValidationService) {
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
    this.datetype = new Date().toISOString().split('T')[0];
    this.refdate = new Date().toISOString().split('T')[0];
    this.deliverydate = new Date().toISOString().split('T')[0];

    this.myform = this.formBuilder.group({
      voucherformat: [''],
      voucherNumber: ['', Validators.required],
      datetype: [''],
      vendcode: ['', Validators.required],
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
        basicrate:0,
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
        itemid:['']
    })
  }

  async presentPopover(dcin: any) {
    const popover = await this.popoverController.create({
      component: QuantitypopoverPage,
      cssClass:'popover-content',
      componentProps: {
        quantity: dcin.quantity, // Pass the quantity to the popup component
      },
      translucent: true,
    });
    return await popover.present();
  }


  updateRows(dcout:Dcout) {
    // Open the popover when quantity changes
    if (dcout.quantity > 0) {
      this.presentPopover(dcout);
    }
  }


  async onSubmit(form: FormGroup, dcoutData: Dcout[]) {

    const fields = { voucherNumber: this.voucherNumber, suppliertype: this.suppliertype, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(dcoutData));

      for (const element of dcoutData) {

        element.grossrate = element.basicrate * element.quantity;
        element.netrate = element.basicrate + element.taxrate1;
        element.CGST= ((element.taxrate1 / 100 * element.basicrate)*element.quantity)/2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate)*element.quantity)/2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate)*element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = element.quantity * (element.taxrate1 / 100 * element.basicrate);

        console.log(element);
        const companyid = 1;
        const userid = 1;
        let dcoutdatas: dcoutstore[] = [];

        let dcoutdata: dcoutstore = {
          voucherformat: this.myform.value.voucherformat,
          voucherNumber: this.myform.value.voucherNumber,
          datetype: this.myform.value.datetype,
          vendcode: this.myform.value.vendcode,
          suppliertype: this.myform.value.suppliertype,
          referenceNumber: this.myform.value.referenceNumber,
          refdate: this.myform.value.refdate,

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
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          roundoff: this.myform.value.roundoff,
          pretax: element.pretax,
          posttax: element.posttax,
          openingbalance: this.myform.value.openingbalance,
          closingbalance: this.myform.value.closingbalance,
          debit: this.myform.value.debit,
          credit: this.myform.value.credit,
          companyid: companyid,
          userid: userid,
          taxrate1: element.taxrate1,
          ponumber: this.myform.value.ponumber
        };

        dcoutdatas.push(dcoutdata);

        this.dcout.createdcout(dcoutdatas, '', '').subscribe(
          (response: any) => {
            console.log('POST request successful', response);
            setTimeout(() => {
              this.formService.showSuccessAlert();
            }, 1000);
            this.formService.showSaveLoader();
            this.myform.reset();
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
  }

  addDcout() {
    console.log('addrowwww' + this.dcoutData.length);
    // You can initialize the new row data here
    const newRow: Dcout = {
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description: '',
      quantity: 0,
      unitname: 0,
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
      pretax: 0,
      posttax: 0,
      itemid: 0,// Calculate grossrate after other properties
      grossrate: 0,

      // Add more properties as needed
    };
    this.dcoutData.push(newRow);
  }

  getItems(dcout: any) {
    const compid = 1;
    const identifier = dcout.itemcode ? 'itemname' : 'itemcode';
    const value = dcout.itemcode;

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
          dcout.taxrate = itemDetails.selectGst;

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
    const identifier = this.vendcode ? 'custname' : 'vendcode';
    const value = this.vendcode;

    this.custname1.fetchallCustomer(compid, value, '').subscribe(
      (data) => {
        console.log('Data received:', data);

        if (data && data.length > 0) {
          const itemDetails = data[0];

          // Update the quote properties
          event.custcode = itemDetails.customer_code;
          event.custname = itemDetails.name;


          // Update form control values
          this.myform.patchValue({
            custcode: itemDetails.vendcode,
            custname: itemDetails.custcode,
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
    return this.dcoutData.reduce((total, dcout) => total + +dcout.quantity, 0);
  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.dcoutData.reduce((total, dcout) => {
      const grossAmount = dcout.quantity * dcout.basicrate;
      return total + grossAmount;
    }, 0);

    return totalGrossAmount;
  }
  getTotalnetAmount(): number {
    return this.dcoutData.reduce((total, dcout) => total + (((dcout.basicrate * dcout.quantity) + (dcout.quantity * (dcout.taxrate1 / 100 * dcout.basicrate)) + dcout.totaltax) - ( (dcout.discount / 100) * dcout.basicrate * dcout.quantity)), 0)
  }
  getGrandTotal(): number {
    const grandTotal = this.dcoutData.reduce((total, dcout) => {
      const itemTotal = (((dcout.basicrate * dcout.quantity) + ((dcout.taxrate1 / 100 * dcout.basicrate) * dcout.quantity)) - ( (dcout.discount / 100) * dcout.basicrate * dcout.quantity));
      return total + itemTotal;
    }, 0);

    return grandTotal;
  }
  getTotalTaxAmount(): number {
    return this.dcoutData.reduce((total, dcout) => total + (dcout.taxrate1 / 100 * dcout.basicrate) * dcout.quantity, 0);
  }
  getTotalDiscountAmount(): number {
    return this.dcoutData.reduce((total, dcout) => total + (dcout.discount / 100) * dcout.basicrate * dcout.quantity, 0);;
  }
  getRoundoff(): number {
    // Calculate the total amount without rounding
    const totalAmount = this.dcoutData.reduce((total, dcout) => total + (((dcout.basicrate * dcout.quantity) + ((dcout.taxrate1 / 100 * dcout.basicrate) * dcout.quantity)) - ( (dcout.discount / 100) * dcout.basicrate * dcout.quantity)), 0);

    // Use the toFixed method to round off the total to the desired number of decimal places
    const roundedTotalAmount = +totalAmount.toFixed(2); // Change 2 to the desired number of decimal places

    return roundedTotalAmount;
  }
  //table formaula
  getnetrate(quote: Dcout): number {
    return quote.basicrate + quote.totaltax;
  }
  getTotaltax(dcout: Dcout): number {
    return dcout.quantity * (dcout.taxrate1 / 100 * dcout.basicrate);
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
  getTotalamt(dcout: Dcout): number {
    return (dcout.basicrate * dcout.quantity) + (dcout.quantity * (dcout.taxrate1 / 100 * dcout.basicrate)) - this.calculateDiscountAmount(dcout);
  }
  getcgst(dcout: Dcout): number {
    return ((dcout.taxrate1 / 100 * dcout.basicrate)*dcout.quantity)/2;
  }
  getsgst(dcout: Dcout): number {
    return ((dcout.taxrate1 / 100 * dcout.basicrate)*dcout.quantity)/2;
  }
  getigst(dcout: Dcout): number {
    return ((dcout.taxrate1 / 100 * dcout.basicrate)*dcout.quantity);
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
}
