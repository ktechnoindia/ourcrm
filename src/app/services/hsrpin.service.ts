import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface hsrpinstore{
  billformate: number;
  billno: string;
  hsrpdate: string;
  suppliercode: string;
  spler: number;
  refrence: string;
  refdate: string;
  executive_name: number;
  supplier:string;
  //table
barcode:string;
  part: number;
  frame: number;
  engine_no: number;
  vehicle_no: number;
  vehicle_reg_no: number;
  vehicle_reg_date: number;
  hsrp_front: number;
  hsrp_rear: string;
  description: string;
  hsn_code: string;
  quantity: number;
  basicrate: number;
  totaltax: number;
taxrate: number;
  tcs_value: number;
  totalitemno: number;
  totalquantity: number;
  totalgrossamt: number;
  deliverydate: string;
  deliveryplace: string;
  openingbalance: number;
  debit: number;
  closingbalance: number;
  credit: number;
  totaldiscountamt: number;
  totaltaxamount: number;
  roundoff: number;
  pretax: number;
  posttax: number;
  totalnetamount: number;
  mrp:string;
  netrate:number;
  ttotal: number;
  itemcode:number;
  itemname:string;
  grossrate:number;
  CGST:number;
  SGST: number;
  IGST:number;
  discount:number;
  discountamt:number;
  total:number;
  taxrate1:number;
  itemid: number;
  selectedItemId:number;
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
  engineframenumber:string;

}

@Injectable({
  providedIn: 'root'
})
export class HsrpinService {

  constructor(private httpclient: HttpClient) { }
  createhsrpin(hsrpin: hsrpinstore[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addhsrpin, hsrpin, { headers: { 'key': key, 'user': user } });
  }
  fetchbyengineno(): Observable<any> {
    const companyid = 'your_company_id'; // Assuming companyid is defined somewhere in your code
    console.log('companyyy ' + companyid);
    const engineNo = 'ADNSAKDSDNAS'; // Example engine number
    return this.httpclient.get(`${environment.apiactionurl}${environment.fetchbyframeno}?eno=${engineNo}`);
  }
}
