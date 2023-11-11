import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface dcinstore {
  voucherNumber: string;
  datetype: string;
  suppliertype: number;
  referenceNumber: number;
  payment: number;
  remark: string;
  item:number;
}
@Injectable({
  providedIn: 'root'
})
export class DcinService {
  total!: number;
  constructor(private httpclient:HttpClient) { }
  createdcin(dcin:dcinstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.adddcin,dcin,{headers:{'key':key,'user':user}})
  }
}