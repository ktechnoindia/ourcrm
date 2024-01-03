import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface pay {
  voucherNumber: string;
  paymentdate: string;
  ledger: number;
  outstanding: number;
  paymentmade: number;
  pendingamt: number;
  paymentway: string;
  total: number;
  ledger_name: string;
  total_payment: number;
  billno: string;
  totalamt: number;
  receiveamt: number;
  currentamt: number;
  billpendingamt: number;
  ledgername: string;
suppliername:string;
  companyname: string;
 userid: number;
  vendorid: number;
}

@Injectable({
  providedIn: 'root'
})


export class PaymentService {
  filter(arg0: (payment: any) => boolean): any {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient: HttpClient) { }

  createPayment(payment: pay, key: string, user: string) {
    return this.httpclient.post(environment.apiacturl + environment.addpayment, payment, { headers: { 'key': key, 'user': user } })
  }

  fetchAllPayment(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiacturl + environment.fetchpayment + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
  fetchVendorOutstanding(userid: number): Observable<any> {
    console.log('companyyy ' + userid)
    return this.httpclient.get(environment.apiacturl + environment.fetchVendorOutstanding + '?userid=' + userid);
  }
}
