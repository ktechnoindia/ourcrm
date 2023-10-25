import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface dcinstore {
  voucherNumber: string;
  datetype:string;
  suppliertype: string;
  referenceNumber: number;
  payment : string;
  remark : string;
  item : string;
}
@Injectable({
  providedIn: 'root'
})
export class DcinService {
  constructor(private httpclient:HttpClient) { }
  createdcin(dcin:dcinstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.adddcin,dcin,{headers:{'key':key,'user':user}})
  }
}