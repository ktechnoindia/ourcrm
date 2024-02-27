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

  //Not post emepty post
  totalquantity: number;
  totalgrossamt: number;
  totaldiscountamt: number;
  totaltaxamount: number;
  totalnetamount: number;
  roundoff: number;

  deliverydate: string;
  deliveryplace: string;
  pretax: number;
  posttax: number;
  openingbalance: number;
  closingbalance: number;
  debit: number;
  credit: number;

  ttotal: number;
  companyid:number;
  userid:number;
  itemid:number;
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
export class QuotationService {
  total!: number;
  ttotal!: number;
  taxrate: any;
  taxrate1: any;
  quantity: any;
  constructor(private httpclient: HttpClient) { }
  createquote(quatation: quotestore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addquote, quatation, { headers: { 'key': key, 'user': user } });
  }

  fetchallQuote(companyid: string,userid:string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallquote + '?p=' + companyid+userid, { headers: { 'key': key, 'user': user } })
  }
  fetchallQuoteno(cust_code:number,key:string,user:string){
    const body = { cust_code: cust_code};
    return this.httpclient.post(environment.apibaseurl+environment.quoteno,body,{headers:{'key':key,'user':user}})
  }
}

