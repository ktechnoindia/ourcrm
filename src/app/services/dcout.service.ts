import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface dcoutstore {
  voucherformat:number;
  voucherNumber: string;
  datetype: string;
  suppliertype: number;
  referenceNumber: number;
  refdate:string;
  vendcode:string;
  ponumber:string;
}
@Injectable({
  providedIn: 'root'
})
export class DcoutService {
    total!: number;
    constructor(private httpclient:HttpClient) { }
    createdcout(dcout:dcoutstore,key:string,user:string){
      return this.httpclient.post(environment.apiactionurl+environment.adddcout,dcout,{headers:{'key':key,'user':user}})
    }
  }
