import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface hsrpout{
  billformate: number;
  billno: string;
  hsrpdate: string;
  custcode: string;
  custname: number;
  refrence: string;
  refdate: string;
  executive_name: number;
  engineframenumber:string;
  //table
barcode:string;
  part: number;
  frame: number;
  engine_no: number;
  vehicle_no: number;
  vehicle_reg_no: number;
  vehicle_reg_date: number;
  hsrp_front: number;
  hsrp_rear: number;
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
}

@Injectable({
  providedIn: 'root'
})
export class HsrpoutService {

  constructor(private httpclient: HttpClient) { }
  createhsrpout(hsrpout: hsrpout[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addhsrpout, hsrpout, { headers: { 'key': key, 'user': user } });
  }
}
