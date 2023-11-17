import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface purchasereturnstore {

  billNumber: number;
  billDate: string;
  frombill:number;
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
export class PurchasereturnService {

  constructor(private httpclient:HttpClient) { }
  createsale(purchasesreturn:purchasereturnstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpurchasereturn,purchasesreturn,{headers:{'key':key,'user':user}})
  }
}
