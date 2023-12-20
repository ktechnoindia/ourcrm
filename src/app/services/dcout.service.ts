import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface dcoutstore {
  voucherformat: number;
  voucherNumber: string;
  datetype: string;
  vendcode: string;
  custname: number;
  referenceNumber: number;
  refdate: string;

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
  taxrate1:number;
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

}
@Injectable({
  providedIn: 'root'
})
export class DcoutService {
  total!: number;
  constructor(private httpclient: HttpClient) { }
  createdcout(dcout: dcoutstore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.adddcout, dcout, { headers: { 'key': key, 'user': user } })
  }
  fetchallDcout(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchalldcout + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
}
