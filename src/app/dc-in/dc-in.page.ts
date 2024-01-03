import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcinService, dcinstore } from '../services/dcin.service';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../form-validation.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { NgForm } from '@angular/forms';
import { AdditemService } from '../services/additem.service';
import { VendorService } from '../services/vendor.service';
import { EncryptionService } from '../services/encryption.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { QuantitypopoverPage } from '../quantitypopover/quantitypopover.page';


interface Dcin {
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
  selectedItemId:number;
}
@Component({
  selector: 'app-dc-in',
  templateUrl: './dc-in.page.html',
  styleUrls: ['./dc-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule]
})
export class DcInPage implements OnInit {

  voucherformat: number = 0;
  voucherNumber: string = '';
  datetype: string = '';
  vendcode: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate: string = '';
  ponumber: string = '';

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

  dcinData: Dcin[] = [{
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
    itemid: 0,
    selectedItemId:0
  }];

  ttotal!: number;
  myform: FormGroup;
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
 

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  supper: any;

  constructor(private navCtrl: NavController,private popoverController:PopoverController, private encService: EncryptionService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private vendname1: VendorService, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private dcinService: DcinService, private formService: FormValidationService) {
    const compid = '1';
    const id=1;
    const companyid=1
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
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
      itemid: ['']


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


  updateRows(dcin:Dcin) {
    // Open the popover when quantity changes
    if (dcin.quantity > 0) {
      this.presentPopover(dcin);
    }
  }
  


  async onSubmit(form: FormGroup, dcinData: Dcin[]) {

    const fields = { voucherNumber: this.voucherNumber, suppliertype: this.suppliertype, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {

      console.log('Your form data : ', JSON.stringify(this.myform.value) + '    -> ' + JSON.stringify(dcinData));

      for (const element of dcinData) {

        element.grossrate = element.basicrate * element.quantity;
        element.netrate = element.basicrate + element.taxrate1;
        element.CGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.SGST = ((element.taxrate1 / 100 * element.basicrate) * element.quantity) / 2;
        element.IGST = (element.taxrate1 / 100 * element.basicrate) * element.quantity;
        element.total = element.totaltax + element.grossrate;
        element.totaltax = element.quantity * (element.taxrate1 / 100 * element.basicrate);

        console.log(element);

        const companyid = 1;
        const userid = 1;
        let decindatas: dcinstore[] = [];

        let dcindata: dcinstore = {
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
          grossrate: element.grossrate,
          taxrate: element.taxrate,
          IGST: element.IGST,
          CGST: element.CGST,
          SGST: element.SGST,
          discount: element.discount,
          discountamt: element.discountamt,
          totaltax: element.totaltax,
          total: element.total,
          taxrate1: element.taxrate1,
          pretax: element.pretax,
          posttax: element.posttax,
          totalitemno: this.myform.value.totalitemno,
          totalquantity: this.myform.value.totalquantity,
          totalgrossamt: this.myform.value.totalgrossamt,
          totaldiscountamt: this.myform.value.totaldiscountamt,
          totaltaxamount: this.myform.value.totaltaxamount,
          totalnetamount: this.myform.value.totalnetamount,
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          roundoff: this.myform.value.roundoff,
          openingbalance: this.myform.value.openingbalance,
          closingbalance: this.myform.value.closingbalance,
          debit: this.myform.value.debit,
          credit: this.myform.value.credit,
          companyid: companyid,
          userid: userid,
          ponumber: this.myform.value.ponumber,
        }
        decindatas.push(dcindata);

        this.dcinService.createdcin(decindatas, '', '').subscribe(
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
  
  getItems(dcin: any) {
    const compid = 1;
    const identifier = dcin.selectedItemId ? 'itemname' : 'itemcode'; // Update this line
    const value = dcin.selectedItemId || dcin.itemcode; // Update this line
  
    this.itemService.getItems(compid, value).subscribe(
      (data) => {
        console.log('Data received:', data);
  
        if (data && data.length > 0) {
          const itemDetails = data[0];
  
          // Update the quote properties
          dcin.itemcode = itemDetails.itemCode;
          dcin.itemname = itemDetails.itemDesc;
          dcin.barcode = itemDetails.barcode.toString();
          dcin.unitname = itemDetails.unitname;
          dcin.taxrate = itemDetails.selectGst;
  
          // Update form control values
          this.myform.patchValue({
            itemcode: dcin.itemcode,
            itemname: dcin.itemname,
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
    const identifier = event.supper ? 'suppliertype' : 'vendcode';
    const value = event.supper || event.vendcode;
  
    this.vendname1.fetchallVendor(compid, value, '').subscribe(
      (data) => {
        console.log('Data received:', data);
  
        if (data && data.length > 0) {
          const itemDetails = data[0];
  
          // Update the form control values based on the identifier
          this.myform.patchValue({
            [identifier]: itemDetails.vendor_code,
            suppliertype: itemDetails.name,
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
  
  

  addDcin() {
    console.log('addrowwww' + this.dcinData.length);
    // You can initialize the new row data here
    const newRow: Dcin = {
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
      itemid: 0,
      selectedItemId:0
      // Add more properties as needed
    };
    this.dcinData.push(newRow);
  }

  onNew() {
    location.reload();
  }

  removeDcin(index: number, row: Dcin) {
    this.ttotal = this.ttotal - this.dcinService.total;
    this.dcinData.splice(index, 1);
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.dcinData) {
      sum += this.dcinService.total;
    }
    this.ttotal = sum;
  }
  calculateTotals() {
    // Add your logic to calculate totals based on the salesData array
    this.totalItemNo = this.dcinData.length;

    // Example calculation for total quantity and gross amount
    this.totalQuantity = this.dcinData.reduce((total, dcin) => total + dcin.quantity, 0);
    this.totalGrossAmt = this.dcinData.reduce((total, dcin) => total + dcin.grossrate, 0);

    // Add similar calculations for other totals
  }

  getTotaltax(quote: Dcin): number {
    return quote.quantity * (quote.taxrate / 100 * quote.basicrate);
    //return this.quoteData.reduce((total, quote) => total + (+quote.basicrate * +quote.taxrate1 / 100 * + quote.quantity), 0);
  }
  getAllRows() {
    console.log('Number of Rows:', this.dcinData.length);

    for (let i = 0; i < this.dcinData.length; i++) {
      const quote = this.dcinData[i];
      console.log('Row:', quote);
    }
  }
  getTotalQuantity(): number {
    return this.dcinData.reduce((total, dcin) => total + +dcin.quantity, 0);

  }

  getTotalGrossAmount(): number {
    const totalGrossAmount = this.dcinData.reduce((total, dcin) => {
      const grossAmount = dcin.quantity * dcin.basicrate;
      return total + grossAmount;
    }, 0);

    return totalGrossAmount;
  }

  getTotalnetAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (((dcin.basicrate * dcin.quantity) + (dcin.quantity * (dcin.taxrate1 / 100 * dcin.basicrate)) + dcin.totaltax) - ((dcin.discount / 100) * dcin.basicrate * dcin.quantity)), 0)
  }
  getGrandTotal(): number {
    const grandTotal = this.dcinData.reduce((total, dcin) => {
      const itemTotal = (((dcin.basicrate * dcin.quantity) + ((dcin.taxrate1 / 100 * dcin.basicrate) * dcin.quantity)) - ((dcin.discount / 100) * dcin.basicrate * dcin.quantity))
      return total + itemTotal;
    }, 0);

    return grandTotal;
  }
  getTotalTaxAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (dcin.taxrate1 / 100 * dcin.basicrate) * dcin.quantity, 0);
  }
  getTotalDiscountAmount(): number {
    return this.dcinData.reduce((total, dcin) => total + (dcin.discount / 100) * dcin.basicrate * dcin.quantity, 0);
  }
  getRoundoff(): number {
    // Calculate the total amount without rounding
    const totalAmount = this.dcinData.reduce((total, dcin) => total + (((dcin.basicrate * dcin.quantity) + ((dcin.taxrate1 / 100 * dcin.basicrate) * dcin.quantity)) - ((dcin.discount / 100) * dcin.basicrate * dcin.quantity)), 0);
    // Use the toFixed method to round off the total to the desired number of decimal places
    const roundedTotalAmount = +totalAmount.toFixed(2); // Change 2 to the desired number of decimal places

    return roundedTotalAmount;
  }
  //table formaula
  getnetrate(dcin: Dcin): number {
    return dcin.basicrate + (dcin.taxrate1 / 100 * dcin.basicrate);
  }

  getgrossrate(dcin: Dcin): number {
    return dcin.quantity * dcin.basicrate;
  }

  getdiscountamt(dcin: Dcin): number {
    const discountamt = dcin.discountamt || 0; // handle null/undefined values
    const basicrate = dcin.basicrate || 0; // handle null/undefined values
    const quantity = dcin.quantity || 0; // handle null/undefined values
    // calculate discount percentage
    const discount = (discountamt / (basicrate * quantity)) * 100;
    // update discount percentage
    dcin.discount = discount;
    // return discount amount for display
    return discountamt;
  }
  // getdiscountp(dcin: Dcin) {
  //   dcin.discountamt = dcin.total * (dcin.discount / 100);
  //   dcin.total = dcin.total - dcin.total * (dcin.discount / 100)
  // }
  getdiscountp(dcin: any): number {
    const discountPercentage = dcin.discount || 0; // assuming discount is a property in your dcin object
    const basicrate = dcin.basicrate || 0; // handle null/undefined values
    const quantity = dcin.quantity || 0; // handle null/undefined values

    // calculate discount amount based on the entered percentage
    const discountAmt = (discountPercentage / 100) * basicrate * quantity;

    // update discount amount
    dcin.discountamt = discountAmt;

    // return discount amount for display
    return discountAmt;
  }



  calculateDiscountAmount(dcin: Dcin): number {
    const discountType = this.myform.get('discountType')?.value;
    const basicrate = +dcin.basicrate || 0;
    const quantity = +dcin.quantity || 0;

    if (isNaN(basicrate) || isNaN(quantity)) {
      return 0;
    }

    if (discountType === 'amount') {
      return dcin.discountamt || 0;
    } else if (discountType === 'percentage') {
      const discountPercentage = dcin.discount || 0;
      return (discountPercentage / 100) * basicrate * quantity;
    }

    return 0;
  }


  getTotalamt(dcin: Dcin): number {

    return (dcin.basicrate * dcin.quantity) + (dcin.quantity * (dcin.taxrate1 / 100 * dcin.basicrate)) - this.calculateDiscountAmount(dcin);
  }
  // getcgst(dcin: Dcin): number {
  //   return ((dcin.taxrate1 / 100 * dcin.basicrate) * dcin.quantity) / 2;
  // }
  // getsgst(dcin: Dcin): number {
  //   return ((dcin.taxrate1 / 100 * dcin.basicrate) * dcin.quantity) / 2;
  // }
  // getigst(dcin: Dcin): number {
  //   return (dcin.taxrate1 / 100 * dcin.basicrate) * dcin.quantity;
  // }
  ngOnInit() {
    this.myform.get('basicrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());

    this.myform.get('discount')?.valueChanges.subscribe(() => {
      // this.calculateDiscount();
    });
    this.myform.get('discountamt')?.valueChanges.subscribe(() => {
      // this.calculateDiscountPercentage();
    });

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
  onSelectChange(select: HTMLSelectElement, dcin: Dcin) {
    const selectedValue = select.value;
    const selectedIndex = select.selectedIndex;
    const selectedText = select.options[selectedIndex].text;

    console.log('Selected value:', selectedValue);
    console.log('Selected text:', selectedText);

    // Extracting a number from the selectedText using parseFloat
    const numericValue = parseFloat(selectedText);

    if (!isNaN(numericValue)) {
      console.log('Numeric value:', numericValue);
      dcin.taxrate1 = numericValue;
      this.calculateCGST(numericValue,dcin)
      // Use numericValue as needed
    } else {
      dcin.taxrate1 = 0;

      console.error('Selected text does not represent a valid number.');
    }
  }

  // Add a function to calculate igst, cgst, and sgst based on the selected taxrate
calculateGST(dcin: Dcin) {
  // Implement your logic here to calculate igst, cgst, and sgst based on the selected taxrate
  // You can access the selected taxrate using dcin.taxrate
  const selectedTaxRate = dcin.taxrate;

  // Update igst, cgst, and sgst values based on the selectedTaxRate
  dcin.CGST = this.calculateCGST(selectedTaxRate,dcin);
  dcin.SGST = this.calculateSGST(selectedTaxRate,dcin);
  dcin.IGST = this.calculateIGST(selectedTaxRate,dcin);
}

// Implement your own logic for calculating cgst, sgst, and igst
calculateCGST(taxRate: number,dcin:Dcin): number {
  // Replace the following line with your actual logic to calculate CGST
  return ((taxRate / 100 * dcin.basicrate) * dcin.quantity) / 2; 
}

calculateSGST(taxRate: number,dcin:Dcin): number {
  // Replace the following line with your actual logic to calculate SGST
  return ((taxRate / 100 * dcin.basicrate) * dcin.quantity) / 2; 
}

calculateIGST(taxRate: number,dcin:Dcin): number {
  // Replace the following line with your actual logic to calculate IGST
  return ((taxRate / 100 * dcin.basicrate) * dcin.quantity); 
}


}
