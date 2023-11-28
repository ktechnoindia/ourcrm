import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RecepitService,rec } from '../services/recepit.service'; 
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [DatePipe],

})
export class ReceiptPage implements OnInit {
  @ViewChild('popover') popover:any
  voucherNumber:string='';
  paymentdate:string='';
  ledgername:number=0;
  companyname:number=0;
  debit:string='';
  credit:string='';
  total:string='';
  balance:string='';

  ledger_name:string='';
  total_payment:string='';
  billtype:number=0;
  date:string='';
  selectdrcr:number=0;
  particular:string='';
  datetype:string='';
  refrence:string='';
  oriamount:string='';
  balanceamt:string='';
  sale_person:string='';
  debittype:string='';
  credittype:string='';
  totalamt:string='';

  myform:FormGroup;
  isOpen = false;

  constructor(private datePipe: DatePipe,private router: Router,private formBuilder:FormBuilder,private recepitService:RecepitService) { 
this.myform= this.formBuilder.group({
  voucherNumber:[''],
  paymentdate:[''],
  ledgername:[''],
  companyname:[''],
  debit:[''],
  credit:[''],
  total:[''],
  balance:[''],
  total_payment:[''],
  billtype:[''],
  selectdrcr:[''],
  particular:[''],
  datetype:[''],
  refrence:[''],
  oriamount:[''],
  balanceamt:[''],
  sale_person:[''],
})
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  onSubmit(){
    const paymentdata:rec ={
     voucherNumber:this.myform.value.voucherNumber,paymentdate:this.myform.value.paymentdate,ledgername:this.myform.value.ledgername,companyname:this.myform.value.companyname,debit:this.myform.value.debit,credit:this.myform.value.credit,total:this.myform.value.total,balance:this.myform.value.balance, total_payment:this.myform.value.total_payment,billtype:this.myform.value.billtype,selectdrcr:this.myform.value.selectdrcr,particular:this.myform.value.particular,datetype:this.myform.value.datetype,refrence:this.myform.value.refrence,oriamount:this.myform.value.oriamount,balanceamt:this.myform.value.balanceamt,sale_person:this.myform.value.sale_person,
    }
    this.recepitService.createRecepit(paymentdata,'','').subscribe(
     (response: any) => {
       console.log('POST request successful', response);
       // Handle the response as needed
     },
     (error: any) => {
       console.error('POST request failed', error);
       // Handle the error as needed
     }
   );
   
 }

  ngOnInit() {
    this.paymentdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

  }

  goBack() {
    this.router.navigate(['/accountdashboard']); // Navigate back to the previous page
  }

}
