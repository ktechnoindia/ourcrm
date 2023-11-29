import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



export interface rec{
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
export class RecepitService {

  constructor(private httpclient:HttpClient) { }

  createRecepit(recepit:rec,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addrecepit,recepit,{headers:{'key':key,'user':user}})
  }
}