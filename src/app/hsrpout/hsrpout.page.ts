import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EncryptionService } from '../services/encryption.service';
import { ExecutiveService } from '../services/executive.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { GsttypeService } from '../services/gsttype.service';

@Component({
  selector: 'app-hsrpout',
  templateUrl: './hsrpout.page.html',
  styleUrls: ['./hsrpout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class HsrpoutPage implements OnInit {

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
  constructor(private router : Router,private formBuilder: FormBuilder,private GstService:GsttypeService,private custService:CustomerService,private encService: EncryptionService,private executiveService:ExecutiveService) { 
    const compid='1';
    this.customers$ = this.custService.fetchallCustomer(encService.encrypt(compid), '', '');
    this.executive$ = this.executiveService.getexecutive();
    this.selectGst$ = this.GstService.getgsttype();

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
onSubmit(){

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
}
