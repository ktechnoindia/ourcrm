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
  ponumber:string;
  gstin:string;
  salePerson: number;
  payment: number;
 
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
  totaltaxamount: string;
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

  ttotal: number;
  companyid:number;
  userid:number;
  quantityPopoverData: {
    att1: string;
    attr2: string;
    attr3: string;
    attr4: string;
    attr5: string;
    attr6: string;
    attr7: string;
    attr8: string;
    companyid:number;
    itemcode:number;
  }[];
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
  createsale(sales:salesstore[],key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addsales,sales,{headers:{'key':key,'user':user}})
  }
  fetchallSales(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallsales+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
  fetchallPurchaseById(itemcode:number,companyid:number): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchpurchasebyid+ '?itemcode='+itemcode)  }

}
