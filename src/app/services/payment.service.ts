import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



export interface pay{
  voucherNumber:string;
  paymentdate:string;
  ledgername:number;
  companyname:number;
  debit:string;
  credit:string;
  total:string;
  balance:string;

  total_payment:string;
  billtype:number;
  selectdrcr:number;
  particular:string;
  datetype:string;
  refrence:string;
  oriamount:string;
  balanceamt:string;
  sale_person:string;
}

@Injectable({
  providedIn: 'root'
})


export class PaymentService {

  constructor(private httpclient:HttpClient) { }

  createPayment(payment:pay,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpayment,payment,{headers:{'key':key,'user':user}})
  }
}
