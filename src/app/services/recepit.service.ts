import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface rec {
  voucherNumber: string;
  paymentdate: string;
  ledger: number;
  customername: number;
  outstanding: string;
  paymentmade: string;
  paymentway: string;
  debit: string;
  cradit: string;
  total: string;
  balance: string;

  total_payment: string;
  billtype: number;
  selectdrcr: number;
  particular: string;
  datetype: string;
  reference: string;
  oriamount: string;
  balanceamt: string;
  sale_person: string;
  totalamt: string;
  billno: string;
  receiveamt: string;
  pendingamt: string;
  currentamt: string;
  ledgername: string;
  companyname: string;
  credit: string;
  userid:number;
}
@Injectable({
  providedIn: 'root'
})
export class RecepitService {

  constructor(private httpclient: HttpClient) { }

  createRecepit(recepit: rec, key: string, user: string) {
    return this.httpclient.post(environment.apiacturl + environment.addrecepit, recepit, { headers: { 'key': key, 'user': user } })
  }

  fetchAllReceppit(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiacturl + environment.fetchrecepit + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
  fetchUserOutstanding(userid: number): Observable<any> {
    console.log('companyyy ' + userid)
    return this.httpclient.get(environment.apiacturl + environment.fetchUserOutstanding + '?userid='+ userid);
  }
}
