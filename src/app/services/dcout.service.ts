import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface dcoutstore {
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
export class DcoutService {
    constructor(private httpclient:HttpClient) { }
    createdcout(dcout:dcoutstore,key:string,user:string){
      return this.httpclient.post(environment.apiactionurl+environment.adddcout,dcout,{headers:{'key':key,'user':user}})
    }
  }
