import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface pay{
  voucherNumber:string;
  paymentdate:string;
  ledgername:number;
  suppliername:number;
  outstanding:string;
  paymentmade:string;
  paymentway:string;
  debit:string;
  cradit:string;
  total:string;
  balance:string;

  total_payment:string;
  billtype:number;
  selectdrcr:number;
  particular:string;
  datetype:string;
  reference:string;
  oriamount:string;
  balanceamt:string;
  sale_person:string;
  totalamt:string;
  billno:string;
  receiveamt:string;
  pendingamt:string;
}

@Injectable({
  providedIn: 'root'
})


export class PaymentService {

  constructor(private httpclient:HttpClient) { }

  createPayment(payment:pay,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addpayment,payment,{headers:{'key':key,'user':user}})
  }

  fetchAllPayment(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiacturl+environment.fetchpayment+'?p='+companyid,{headers:{'key':key,'user':user}})
  }

}
