import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface quotestore {

  quoteNumber: number;
  quateDate: string;
  custname: number;
  quateTax: string;
  taxrate: string ;
  totaltax: string ;
  total: string ;
  refrence: string ;
  refdate: string ;
  billformate: number;
  description:string;
  quantity:number;
  basicrate:number;
  grossrate:number;
  CGST:number;
  SGST:number;
  orderNumber:number;
  ttotal:number;
}
@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  total!: number;
  ttotal!: number;
  constructor(private httpclient:HttpClient) { }
  createquote(quatation:quotestore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addquote,quatation,{headers:{'key':key,'user':user}})
  }
}

