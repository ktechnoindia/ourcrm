import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface purchasestore {

  billNumber: number;
  billDate:string;
  cName: string;
  orderDate: string;
  payment : string;
  orderNumber : string;
  gstin : string;
  exicutive : string;
  taxrate : string;
  unit:string;
  item:string;
}
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpclient:HttpClient) { }
  createsale(purchase:purchasestore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpurchase,purchase,{headers:{'key':key,'user':user}})
  }
}
