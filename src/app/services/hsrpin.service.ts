import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface hsrpin{
  billformate: number;
  billno: string;
  hsrpdate: string;
  suppliercode: string;
  spler: number;
  refrence: string;
  refdate: string;
  executive_name: number;

  //table

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
  basic_rate: number;
  gst_type: number;
  tax_amt: number;
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
  netrate:string;
  ttotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class HsrpinService {

  constructor(private httpclient: HttpClient) { }
  createhsrpin(hsrpin: hsrpin[], key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addhsrpin, hsrpin, { headers: { 'key': key, 'user': user } });
  }
}
