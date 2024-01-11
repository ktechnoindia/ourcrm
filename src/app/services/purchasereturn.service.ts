import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface purchasereturnstore {

  billformate: number;
  billNumber: number;
  billDate: string;
  vendcode: string;
  supplier: number;
  refrence: string;
  refdate: string;
  orderDate: string;
  orderNumber: string;
  ponumber: string;

  gstin: number;
  payment: number;
  exicutive: number;
  taxrate$: number;
  
  //table
  barcode: string;
  itemcode: number;
  itemname: string;
  description: string;
  quantity: number;
  unitname: number;
  mrp: number;
  basicrate: number;
  netrate: number;
  grossrate: number;
  taxrate: number;
  IGST: number;
  CGST: number;
  SGST: number;
  discount: number;
  discountamt: number;
  totaltax: number;
  total: number;

  totalitemno: string;
  totalquantity: string;
  totalgrossamt: string;
  totaldiscountamt: string;
  totaltaxamount: number;
  totalnetamount: string;
  deliverydate: string;
  deliveryplace: string;

  roundoff: string;
  pretax: number;
  posttax: number;
  openingbalance: number;
  closingbalance: number;
  debit: number;
  credit: number;
  companyid:number;
  itemid:number;
  userid:number;
  executive:number;
frombill:number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchasereturnService {

  constructor(private httpclient:HttpClient) { }
  createpurchasereturn(purchasesreturn:purchasereturnstore[],key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpurchasereturn,purchasesreturn,{headers:{'key':key,'user':user}})
  }
  fetchallPurchasereturn(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallpurchasereturn+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
