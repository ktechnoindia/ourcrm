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
  itemcode: number;
  itemname: number;
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

  constructor(private httpclient: HttpClient) { }
  createquote(quatation: quotestore, key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addquote, quatation, { headers: { 'key': key, 'user': user } })
  }

  fetchallQuote(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallquote + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
  
}

