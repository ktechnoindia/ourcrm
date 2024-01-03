import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface rec {
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

  customername: number;
  userid: number;
  custid: number;
  companyname: string;



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
    return this.httpclient.get(environment.apiacturl + environment.fetchUserOutstanding + '?userid=' + userid);
  }
}
