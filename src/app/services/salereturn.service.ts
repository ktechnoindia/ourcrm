import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface salereturnstore {

  billNumber: number;
  billDate: string;
  frombill: number;
  payment: number;
  orderDate: string;
  orderNumber: string;
  gstin: number;
  salePerson: number;
  taxrate: number;
  custcode: string;
  billformate: number;
  custname: number;
  // unitname$: number;
  // ponumber:string;
  refrence: string;
  refdate: string;

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
  openingbalance: string;
  closingbalance: string;
  debit: string;
  credit: string;
  companyid:number;
  userid:number;
  ponumber:string;
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
    itemcode:number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class SalereturnService {
  total!: number;
  constructor(private httpclient: HttpClient) { }
  createSaleReturn(salesreturn: salereturnstore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addsalesreturn, salesreturn, { headers: { 'key': key, 'user': user } })
  }
  fetchallSalesreturn(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallsalesreturn + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
}
