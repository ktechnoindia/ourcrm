import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../services/encryption.service';
import { ExecutiveService } from '../services/executive.service';
import { GsttypeService } from '../services/gsttype.service';
interface Hsrp {
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
}

@Component({
  selector: 'app-hsrpin',
  templateUrl: './hsrpin.page.html',
  styleUrls: ['./hsrpin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HsrpinPage implements OnInit {

  myform: FormGroup;

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
  supplier$: Observable<any[]>;
  executive$: Observable<any>;
  selectGst$: Observable<any>;

  constructor(private router: Router, private formBuilder: FormBuilder, private vendorService: VendorService, private encService: EncryptionService,private executiveService:ExecutiveService,private GstService:GsttypeService) {
    const compid = '1';
    this.supplier$ = this.vendorService.fetchallVendor(encService.encrypt(compid), '', '');
    this.executive$ = this.executiveService.getexecutive();
    this.selectGst$ = this.GstService.getgsttype();

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

  onSubmit() {

  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/transcationdashboard']); // Navigate back to the previous page
  }
}
