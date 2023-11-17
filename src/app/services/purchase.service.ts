import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface purchasestore {

  billNumber: number;
  billDate: string;
  payment: number;
  supplier: number;
  gstin: number ;
  exicutive:number;
  unitname$: number;
  taxrate$: number;
  refrence:string;
  refdate:string;
  billformate:number;
  vendcode:string;
  orderDate:string;
  orderNumber:string;
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
