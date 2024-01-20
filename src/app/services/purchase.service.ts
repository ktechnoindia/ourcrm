import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface purchasestore {
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
  executive:string;
  quantityPopoverData: {
    attr1: string;
    attr2: string;
    attr3: string;
    attr4: string;
    attr5: string;
    attr6: string;
    attr7: string;
    attr8: string;
    companyid:number;
    itemcode:string;
  }[];
}
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpclient: HttpClient) { }
  createpurchase(purchase: purchasestore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addpurchase, purchase, { headers: { 'key': key, 'user': user } })
  }
  fetchallPurchase(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallpurchase + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
}
