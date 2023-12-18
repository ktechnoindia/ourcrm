import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface quotestore {
  billformate: number;
  quoteNumber: number;
  quateDate: string;
  custcode: string;
  custname: number;
  refrence: string;
  refdate: string;

  //table
  barcode: string;
  itemcode: string;
  itemname: number;
  description: string;
  quantity: number;
  unitname: number;
  mrp: string;
  basicrate: number;
  netrate: string;
  grossrate: string;
  taxrate: number;
  IGST: string;
  CGST: string;
  SGST: string;
  discount: string;
  discountamt: string;
  totaltax: string;
  total: string;

  totalitemno: string;
  totalquantity: string;
  totalgrossamt: string;
  totaldiscountamt: string;
  totaltaxamount: string;
  totalnetamount: string;
  deliverydate: string;
  deliveryplace: string;

  roundoff: string;
  pretax: string;
  posttax: string;
  openingbalance: string;
  closingbalance: string;
  debit: string;
  credit: string;

  ttotal: number;
}
@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  total!: number;
  ttotal!: number;
  taxrate: any;
  constructor(private httpclient: HttpClient) { }
  createquote(quatation: quotestore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addquote, quatation, { headers: { 'key': key, 'user': user } });
  }

  fetchallQuote(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallquote + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
  fetchallQuoteno(cust_code:number,key:string,user:string){
    const body = { cust_code: cust_code};
    return this.httpclient.post(environment.apibaseurl+environment.quoteno,body,{headers:{'key':key,'user':user}})
  }
}

