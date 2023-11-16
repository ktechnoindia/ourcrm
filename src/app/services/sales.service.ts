import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface salesstore {

  billNumber: number;
  billDate: string ;
  payment: number;
  orderDate: string;
  orderNumber: string;
  gstin: number;
  salePerson: number;
  taxrate: string;
  custcode: string;
  billformate:number;
  custname: number;
  unitname$: number;
  ponumber:string;
  refrence:string;
  refdate:string;
}
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  total!: number;
  constructor(private httpclient:HttpClient) { }
  createsale(sales:salesstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addsales,sales,{headers:{'key':key,'user':user}})
  }
}
