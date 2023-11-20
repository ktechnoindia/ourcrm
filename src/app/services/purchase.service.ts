import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface purchasestore {
  billformate:number;
  billNumber: number;
  billDate: string;
    vendcode:string;
  payment: number;
  supplier: number;
  gstin: number ;
  executive$:number;
  unitname$: number;
  taxrate$: number;
  refrence:string;
  refdate:string;
  orderDate:string;
  orderNumber:string;


  //table
  barcode:string;
itemcode:string;
itemname:string;
description:string;
quantity:number;
unitname:number;
mrp:string;
basicrate:number;
netrate:string;
grossrate:string;
  taxrate: number ;
 IGST:string;
  CGST:string;
  SGST:string;
  discount:string;
  discountamt:string;
  totaltax: string ;
  total: string ;

  totalitemno:string;
  totalquantity:string;
  totalgrossamt:string;
  totaldiscountamt:string;
  totaltaxamount:string;
  totalnetamount:string;
  deliverydate: string;
  deliveryplace: string;

  roundoff: string;
  pretax: string;
  posttax: string;
  openingbalance: string;
  closingbalance: string;
  debit: string;
  credit: string;
}
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpclient:HttpClient) { }
  createpurchase(purchase:purchasestore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpurchase,purchase,{headers:{'key':key,'user':user}})
  }
  fetchallPurchase(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallpurchase+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
