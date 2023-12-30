import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface dcinstore {

  voucherformat: number;
  voucherNumber: string;
  datetype: string;
  vendcode: string;
  suppliertype: number;
  referenceNumber: number;
  refdate: string;
  ponumber:string;
  //table
  posttax: number;
  pretax: number;
  barcode: string;
  itemcode: number;
  itemname: number,
  description: string;
  quantity: number;
  unitname: number;
  mrp: number;
  basicrate: number;
  netrate: number;
  grossrate: number;
  taxrate: number;
  CGST: number;
  SGST: number;
  IGST: number;
  discount: number;
  discountamt: number;
  totaltax: number;
  total: number;
  taxrate1: number;

  totalitemno: string;
  totalquantity: string;
  totalgrossamt: string;
  totaldiscountamt: string;
  totaltaxamount: string;
  totalnetamount: string;
  deliverydate: string;
  deliveryplace: string;

  roundoff: string;

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
export class DcinService {
  total!: number;
  constructor(private httpclient: HttpClient) { }
  createdcin(dcin: dcinstore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.adddcin, dcin, { headers: { 'key': key, 'user': user } })
  }
  fetchallDcin(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchalldcin + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }

}
