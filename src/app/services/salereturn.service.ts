import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface salereturnstore {

  billNumber: number;
  billDate: string ;
  frombill:number;
  payment: number;
  orderDate: string;
  orderNumber: string;
  gstin: number;
  salePerson: number;
  taxrate: string;
  custcode: string;
  billformate:number;
  custname: number;
  unitname$: number;
  ponumber:string;
  refrence:string;
  refdate:string;

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
export class SalereturnService {
  total!: number;
  constructor(private httpclient:HttpClient) { }
  createSaleReturn(salesreturn:salereturnstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addsalesreturn,salesreturn,{headers:{'key':key,'user':user}})
  }
  fetchallSalesreturn(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallsalesreturn+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
