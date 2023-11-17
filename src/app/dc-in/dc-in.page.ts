import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DcinService, dcinstore } from '../services/dcin.service';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../form-validation.service';
import { UnitnameService } from '../services/unitname.service';
import { GsttypeService } from '../services/gsttype.service';
import { NgForm } from '@angular/forms';
import { quotestore } from '../services/quotation.service';
interface Dcin {
  barcode: string;
  itemcode: number;
  itemname: number,
  description: string;
  quantity: number;
  unitname$: number;
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
  selector: 'app-dc-in',
  templateUrl: './dc-in.page.html',
  styleUrls: ['./dc-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule]
})
export class DcInPage implements OnInit {
  voucherformat:number=0;
  voucherNumber: string = '';
  datetype: string = '';
  suppliertype: number = 0;
  referenceNumber: number = 0;
  refdate:string='';
  vendcode:string='';
  ponumber:string='';
  dcinData: Dcin[] = [{
    barcode: '',
    itemcode: 0,
    itemname: 0,
    description: '',
    quantity: 0,
    unitname$: 0,
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
  unitname$: any;
taxrate$:any;
ttotal!: number;

  constructor(private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private dcin: DcinService, private formService: FormValidationService) {
    this.taxrate$ = this.gstsrvs.getgsttype();
    this.unitname$=this.unittype.getunits();

   
  }

  onSubmit(myform: NgForm, dcinData: any) {
    console.log('Your form data : ', myform.value);
    let dcindata: dcinstore = {
     voucherformat:myform.value.voucherformat,voucherNumber:myform.value.voucherNumber,datetype:myform.value.datetype,
     suppliertype:myform.value.suppliertype,referenceNumber:myform.value.referenceNumber,refdate:myform.value.refdate,vendcode:myform.value.vendcode,ponumber:myform.value.ponumber,
    };
  
      this.dcin.createdcin(dcinData, '', '').subscribe(
        (response: any) => {
          console.log('POST request successful', response);
          this.formService.showSuccessAlert();
        },
        (error: any) => {
          console.error('POST request failed', error);
          this.formService.showFailedAlert();
        }
      );
    }
  
  addDcin() {
    console.log('addrowwww'+this.dcinData.length);
    // You can initialize the new row data here
    const newRow :Dcin= {
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description:'',
      quantity:0,
      unitname$:0,
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
    this.dcinData.push(newRow);
  }
  removeDcin(index: number,row:Dcin) {
    this.ttotal=this.ttotal-this.dcin.total;
    this.dcinData.splice(index, 1);
  }
  calculateTotalSum() {
    let sum = 0;
    for (const row of this.dcinData) {
      sum += this.dcin.total;
    }
    this.ttotal= sum;
  }
  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["/challan-manager"])
  }
}
