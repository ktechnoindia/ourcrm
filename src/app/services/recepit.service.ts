import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface rec {
  voucherNumber: string ;
  paymentdate: string ;
  ledger: number ;
  companyname: number ;
  outstanding: number ;
  paymentmade: number ;
  pendingamt: number ; 
  paymentway: string ;
  total: number ;
  total_payment: number ;
  billno: string ;
  billdate:string;
  totalamt: number ;
  receiveamt: number ;
  currentamt: number ;
  billpendingamt: number ;
  totaldueamt:number;
  totalreceiveamt: number ;
  totalcurrentamt: number ;
  totalpendingamt: number ;
  userid: number ;
  custid: number ;
}
@Injectable({
  providedIn: 'root'
})
export class RecepitService {
  private apiUrl = 'http://103.154.184.66:8000/account';
  constructor(private httpclient: HttpClient) { }

  createRecepit(recepit: rec[], key: string, user: string) {
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

  getSalesById(custCode: number, companyId: number): Observable<any> {
    const url = `${this.apiUrl}/get_sales_byid?custcode=${custCode}&companyid=${companyId}`;
    return this.httpclient.get(url);
  }
}
