import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcoutService, dcoutstore } from '../services/dcout.service';
import { NgForm } from '@angular/forms';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { quotestore } from '../services/quotation.service';
import { AdditemService } from '../services/additem.service';
import { EncryptionService } from '../services/encryption.service';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs';
import { FormValidationService } from '../form-validation.service';
interface Dcout {
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
}
@Component({
  selector: 'app-dc-out',
  templateUrl: './dc-out.page.html',
  styleUrls: ['./dc-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class DcOutPage implements OnInit {
  voucherformat: number = 0;
  voucherNumber: string = '';
  datetype: string = '';
  vendcode: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate: string = '';
  // ponumber: string = '';

  //table data
  barcode: string = '';
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
  total: string = '';
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
    grossrate: 0,
    taxrate: 0,
    CGST: 0,
    SGST: 0,
    IGST: 0,
    discount: 0,
    discountamt: 0,
    totaltax: 0,
    total: 0,
  }];
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

  @ViewChild('firstInvalidInput') firstInvalidInput: any;
  
  constructor(private vendname1:VendorService,private encService: EncryptionService,private formBuilder: FormBuilder,private itemService:AdditemService,private unittype: UnitnameService, private gstsrvs: GsttypeService,private router: Router, private toastCtrl: ToastController,private dcout: DcoutService,private formService: FormValidationService) { 
    const compid = '1';
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$ = this.unittype.getunits();
    this.itemnames$ = this.itemService.getAllItems();
    this.supplier$ = this.vendname1.fetchallVendor(encService.encrypt(compid), '', '');
    this.datetype= new Date().toLocaleDateString();
    this.refdate=  new Date().toLocaleDateString();
    this.deliverydate= new Date().toLocaleDateString();

    this.myform = this.formBuilder.group({
      voucherformat: [''],
      voucherNumber: ['',Validators.required],
      datetype: [''],
      vendcode: ['',Validators.required],
      suppliertype: ['',Validators.required],
      referenceNumber: [''],
      refdate: [''],
      // ponumber: [''],

      //table
      barcode: [''],
      itemcode: [''],
      itemname: [''],
      description: [''],
      quantity: [''],
      unitname: [''],
      mrp: [''],
      basicrate: [''],
      netrate: [''],
      grossrate: [''],
      taxrate: [''],
      IGST: [''],
      CGST: [''],
      SGST: [''],
      discount: [''],
      discountamt: [''],
      totaltax: [''],
      total: [''],

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

    })
  }

 
  async onSubmit() {

    const fields = { voucherNumber: this.voucherNumber, suppliertype: this.suppliertype, vendcode: this.vendcode }
    const isValid = await this.formService.validateForm(fields);
    if (await this.formService.validateForm(fields)) {
      console.log('Your form data : ', this.myform.value);

      let dcoutdata: dcoutstore = {
        voucherformat: this.myform.value.voucherformat,
        voucherNumber: this.myform.value.voucherNumber,
        datetype: this.myform.value.datetype,
        vendcode: this.myform.value.vendcode,
        suppliertype: this.myform.value.suppliertype,
        referenceNumber: this.myform.value.referenceNumber,
        refdate: this.myform.value.refdate,
        // ponumber: this.myform.value.ponumber,

        barcode: this.myform.value.barcode,
        itemcode: this.myform.value.itemcode,
        itemname: this.myform.value.itemname,
        description: this.myform.value.description,
        quantity: this.myform.value.quantity,
        unitname: this.myform.value.unitname,
        mrp: this.myform.value.mrp,
        basicrate: this.myform.value.basicrate,
        netrate: this.myform.value.netrate,
        grossrate: this.myform.value.grossrate,
        taxrate: this.myform.value.taxrate,
        CGST: this.myform.value.CGST,
        SGST: this.myform.value.SGST,
        IGST: this.myform.value.IGST,
        discount: this.myform.value.discount,
        discountamt: this.myform.value.discountamt,
        totaltax: this.myform.value.totaltax,
        total: this.myform.value.total,
        totalitemno: this.myform.value.totalitemno,
        totalquantity: this.myform.value.totalquantity,
        totalgrossamt: this.myform.value.totalgrossamt,
        totaldiscountamt: this.myform.value.totaldiscountamt,
        totaltaxamount: this.myform.value.totaltaxamount,
        totalnetamount: this.myform.value.totalnetamount,
        roundoff: this.myform.value.roundoff,
        pretax: this.myform.value.pretax,
        posttax: this.myform.value.posttax,
        deliverydate: this.myform.value.deliverydate,
        deliveryplace: this.myform.value.deliveryplace,
        openingbalance: this.myform.value.openingbalance,
        closingbalance: this.myform.value.closingbalance,
        debit: this.myform.value.debit,
        credit: this.myform.value.credit,

      };

      this.dcout.createdcout(dcoutdata, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          setTimeout(() => {
            this.formService.showSuccessAlert();
            this.myform.reset();
          }, 1000);
          this.formService.showSaveLoader();

        },
        (error:any) =>{
         console.log('POST request failed',error);
         setTimeout(() => {
          this.formService.showFailedAlert();
         }, 1000);
         this.formService.shoErrorLoader();
        }
      );
    }  else {
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
      console.log('addrowwww'+this.dcoutData.length);
      // You can initialize the new row data here
      const newRow :Dcout= {
        barcode: '',
        itemcode: 0,
        itemname: 0,
        description:'',
        quantity:0,
        unitname:0,
        mrp:0,
        basicrate:0,
        netrate:0,
        grossrate:0,
        taxrate:0,
        CGST:0,
        SGST:0,
        IGST:0,
        discount:0,
        discountamt:0,
        totaltax:0,
        total:0,
        // Add more properties as needed
      };
      this.dcoutData.push(newRow);
    }
    removeDcout(index: number,row:Dcout) {
      this.ttotal=this.ttotal-this.dcout.total;
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
      this.ttotal= sum;
    }
  
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
      return this.dcoutData.reduce((total, dcout) => total + (+dcout.grossrate * +dcout.quantity), 0);
    }
  
    getTotalnetAmount(): number {
      return this.dcoutData.reduce((total, dcout) => total + (((dcout.basicrate * dcout.quantity) + dcout.taxrate)  - dcout.discount), 0)
    }
    getTotalTaxAmount(): number {
      return this.dcoutData.reduce((total, dcout) => total + (+dcout.totaltax* +dcout.quantity), 0);
    }
    getTotalDiscountAmount(): number {
      return this.dcoutData.reduce((total, dcout) => total + (+dcout.grossrate * dcout.discount / 100), 0);
    }
   //table formaula
    getnetrate(quote: Dcout): number {
     return quote.basicrate  + quote.totaltax;
     }
    getTotaltax(): number {
      return this.dcoutData.reduce((total, dcout) => total + (+dcout.basicrate * +dcout.taxrate/100 * + dcout.quantity), 0);
    }
    getgrossrate(dcout: Dcout): number {
      return dcout.quantity * dcout.basicrate;
    }
   
    getdiscountamt(dcout: Dcout): number {
      return (dcout.discount/100) * dcout.basicrate * dcout.quantity;
    }
    
    getTotalamt(dcout:Dcout): number {
      return dcout.basicrate * dcout.quantity + dcout.totaltax - dcout.discountamt;
    }
    getcgst(dcout:Dcout): number {
      return dcout.taxrate/2;
    }
    getsgst(dcout:Dcout): number {
      return dcout.taxrate/2;
    }
    getigst(dcout:Dcout): number {
      return dcout.taxrate;
    }
    ngOnInit() {
      // Other initialization logic...
    
      // Subscribe to value changes of basicrate, taxrate, and discount
      this.myform.get('basicrate')?.valueChanges.subscribe(() => this.calculateNetRate());
      this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
      this.myform.get('discount')?.valueChanges.subscribe(() => this.calculateNetRate());
      this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
    }
    
    calculateNetRate() {
      // Add your logic to calculate netrate based on basicrate, taxrate, and discount
      const basicrate = this.myform.get('basicrate')?.value ?? 0; // Use the nullish coalescing operator to provide a default value if null
      const taxrate = this.myform.get('taxrate')?.value ?? 0;
      const discount = this.myform.get('discount')?.value ?? 0;
      const grossrate = this.myform.get('grossrate')?.value ?? 0;
      const quantity = this.myform.get('quantity')?.value ?? 0;
  
      // Perform the calculation and update the netrate in the form
      const gstAmount = (discount / 100)*basicrate*quantity;
      const netrate = basicrate + taxrate;
      this.myform.get('netrate')?.setValue(netrate);
    }
  goBack() {
    this.router.navigate(["/transcationdashboard"])
  }
}
