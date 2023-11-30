import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface salesstore {
  billformate:number;
  billNumber: number;
  billDate: string ;
  custcode: string;
  custname: number;
  refrence:string;
  refdate:string;
  orderDate: string;
  orderNumber: string;
  // ponumber:string;
  gstin:number;
  salePerson: number;
  payment: number;
  unitname: number;
 
  //table
  barcode:string;
itemcode:string;
itemname:number;
description:string;
quantity:number;
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
  ttotal:number;
}
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  getSales() {
    throw new Error('Method not implemented.');
  }
  total!: number;
  constructor(private httpclient:HttpClient) { }
  createsale(sales:salesstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addsales,sales,{headers:{'key':key,'user':user}})
  }
  fetchallSales(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallsales+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
