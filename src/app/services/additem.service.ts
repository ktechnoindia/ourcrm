import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


export interface item {

  itemDesc: string;
  itemCode: string;
  hsnname: string;
  selectHSN:number;
  selectItem:number;
  selectStock:number;
  selectPrimaryUnit:number;
  selectunitname:number;

  itemtype:string;
  stocktype:string;
  stocktypename: string;
  itemtypename: string;
  unitname: string;
  selectItemGroup: number;
  selectGst: number;
  openingbalance: string;
  closingbalance: string;
  selectedAttribute: string;
  files:string;
  barcode: number;
  minimum: number;
  maximum: number;
  reorder: string;

  attr1: string;
  attr2: string;
  attr3: string;
  attr4: string;
  attr5: string;
  attr6: string;
  attr7: string;
  attr8: string;

  selectGstservice: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdditemService {



  constructor(private httpclient: HttpClient) { }
  createItem(items: item, key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.additem, items, { headers: { 'key': key, 'user': user } })
  }
  fetchallItem(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallItem + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
   
  getAllItems(): Observable<any> {
    return this.httpclient.get(environment.apiactionurl+environment.fetchallItem);
  }
  // getItems(companyid: number,tid:number): Observable<any> {
  //   return this.httpclient.get(environment.apiactionurl + environment.fetchitemauto + '/' + companyid+ '/'+tid);
  // }

  getItems(companyid:number,itemid:number): Observable<any> {
    return this.httpclient.get(environment.apiactionurl + environment.fetchitemauto +'/'+ companyid +'/' + itemid);
  }
  
  }
  
  

