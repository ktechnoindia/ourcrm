import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface quotestore {

  quoteNumber: number;
  quateDate:string;
  quoteGroup: string;
  quateTax: string;
  payment : string;
  orderNumber : string;
  gstin : string;
  salePerson : string;
  taxrate : string;
  unit:string;
  item:string;
  description : string;
  quantity : string;
  basicrate : string;
  grossrate : string;
    CGST : string;
    SGST : string;
    total: number;
    ttotal: number;
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

