import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface salesstore {

  billNumber: number;
  billDate:string;
  cName: string;
  orderDate: string;
  payment : string;
  orderNumber : string;
  gstin : string;
  salePerson : string;
  taxrate : string;
  unit:string;
  item:string;
}
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private httpclient:HttpClient) { }
  createsale(sales:salesstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addsales,sales,{headers:{'key':key,'user':user}})
  }
}
