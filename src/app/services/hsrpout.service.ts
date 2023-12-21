import { Injectable } from '@angular/core';


export interface hsrpout{
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
}

@Injectable({
  providedIn: 'root'
})
export class HsrpoutService {

  constructor() { }
}
