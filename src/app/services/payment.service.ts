import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';



export interface pay {
  voucherNumber: string ;
  paymentdate: string ;
  ledger: number ;
  outstanding: number ;
  paymentmade: number ;
  pendingamt: number ;
  paymentway:string ;
  total:number ;
  total_payment: number ;
  billno: string ;
  billdate:string;
  totalamt:number ;
  receiveamt: number ;
  currentamt :number ;
  companyname: number ;
  totaldueamt: number ;
  totalreceiveamt: number ;
  totalcurrentamt: number ;
  totalpendingamt: number ;
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
  private apiUrl = 'http://103.154.184.66:8000/account';

  constructor(private httpclient: HttpClient,private session:SessionService) { }

  createPayment(payment: pay[], key: string, user: string) {
    const token = this.session.getValue('token')?.valueOf();

    return this.httpclient.post(environment.apiacturl + environment.addpayment, payment, { headers: { 'key': '', 'user': '', 'Authorization': 'Bearer '+token }})
  }

  fetchAllPayment(companyid: string, key: string, user: string): Observable<any> {
    const token = this.session.getValue('token')?.valueOf();

    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiacturl + environment.fetchpayment + '?p=' + companyid, { headers: { 'key': '', 'user': '', 'Authorization': 'Bearer '+token }})
  }
  fetchVendorOutstanding(userid: number): Observable<any> {
    const token = this.session.getValue('token')?.valueOf();

    console.log('companyyy ' + userid)
    return this.httpclient.get(environment.apiacturl + environment.fetchVendorOutstanding + '?userid=' + userid,{ headers: { 'key': '', 'user': '', 'Authorization': 'Bearer '+token }});
  }

  getPurchaseById(companyId: number,vendorid: number ): Observable<any> {
    const token = this.session.getValue('token')?.valueOf();

    const url = `${this.apiUrl}/get_payment_byid?companyid=${companyId}&vendorid=${vendorid}`;
    return this.httpclient.get(url, { headers: { 'key': '', 'user': '', 'Authorization': 'Bearer '+token }});
  }
}

// get_payment_byid?companyid=1&vendorid=1
