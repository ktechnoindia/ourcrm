import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface upquotestore {

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
}
@Injectable({
  providedIn: 'root'
})
export class UpdatequoteService {
  constructor(private httpclient:HttpClient) { }
  createupquote(upquatation:upquotestore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addupquote,upquatation,{headers:{'key':key,'user':user}})
  }
}
