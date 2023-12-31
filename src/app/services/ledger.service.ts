import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface ledg{
lname:string;
    ledger_code: string;
    gstin: string;
    lgroup_name: string;
    opening_balance: number;
    closing_balance: number;
    mobile: string;
    whatsapp_number: string;
    email:string;
    country: number;
    state: number;
    district: number;
    pincode: string;
    address: string;
    tdn: string;
    aadhar_no: string;
    pan_no: string;
    udhyog_aadhar: string;
    account_number: string;
    ifsc_code: string;
    bank_name: string;
    branch_name: string;
    credit_period: number;
    credit_limit: number;
    select_sales_person: string;
    card_number: string;
    opening_point: number;
    closing_point: number;
    selectedSalutation: string;
    companyName: string;
    
    country1: number;
    state1: number;
    district1: number;
    pincode1: string;
    address1: string;
    companyid:number;
    userid:number;
    discount:number;
  }

@Injectable({
  providedIn: 'root'
})
export class LegderService {

  constructor(private httpclient:HttpClient) { }
  createLdeger(ledger:ledg,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addledger,ledger,{headers:{'key':key,'user':user}})
  }

  fetchAllLedger(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallledger +'/'+ companyid, { headers: { 'key': key, 'user': user } })
  }
  getledger(): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchallledger);
  }

  deleteledger(customerid: number, companyid: number): Observable<any> {
    return this.httpclient.post(environment.apiactionurl+environment.deleteLedger + '/' +customerid + '/' +companyid,{});
  }
}
