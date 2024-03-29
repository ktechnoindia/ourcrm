import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { SessionService } from './session.service';


export interface item {

  attributes: any;
  itemDesc: string;
  itemCode: string;
  hsnname: string;
  selectHSN: number;
  selectItem: number;
  selectStock: number;
  selectPrimaryUnit: number;
  selectunitname: number;

  itemtype: string;
  stocktype: string;
  stocktypename: string;
  itemtypename: string;
  unitname: string;
  selectItemGroup: number;
  selectGst: number;
  openingbalance: string;
  closingbalance: string;
  selectedAttribute: string;
  files: string;
  barcode: number;
  minimum: number;
  maximum: number;
  reorder: string;
  mrp: number;
  salerate: number;
  attr1: string;
  attr2: string;
  attr3: string;
  attr4: string;
  attr5: string;
  attr6: string;
  attr7: string;
  attr8: string;

  selectGstservice: number;
  companyid: number;
  purchaserate: number;
  basicrate: number;
  labelname: string;
  valuename: string;
  framenumber: string;
  enginenumber: string;
  partnumber: string;
  color: string;
  dealerrate: number;
  subdealerrate: number;
  itemDesccription:string;
  classofvehicle:string;
  makersname:string;
  hourspowerofcube:string;
  fuelused:string;
  noofcylinders:string;
  yearofmanufactur:string;
  seatingcapacity:string;
  unladenweight:string;
  grossvehicleweight:string;
  bodytype:string;
  wheelbase:string;

  
}

@Injectable({
  providedIn: 'root'
})
export class AdditemService {
 



  constructor(private httpclient: HttpClient,private session:SessionService) { }
  createItem(items: item, key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.additem, items, { headers: { 'key': key, 'user': user } })
  }
  fetchallItem(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallItem + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
  fetchitemtype(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchitemtype + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
  getAllItems(): Observable<any> {
    return this.httpclient.get(environment.apiactionurl + environment.fetchallItem);
  }
  getItems(companyid: number, itemid: number): Observable<any> {
    return this.httpclient.get(environment.apiactionurl + environment.fetchitemauto + '/' + companyid + '/' + itemid);
  }

  deleteItems(customerid: number, companyid: number): Observable<any> {
    return this.httpclient.post(environment.apiactionurl + environment.deleteItem + '/' + customerid + '/' + companyid, {});
  }
  // In itemService.ts
  getAllItemsattr(tid: string): Observable<any> {
    // ... implementation using tid
    return this.httpclient.get(environment.apiactionurl + environment.fetchallItem);

  }
  getItemAttributes(itemname: any) {
    return this.httpclient.get(environment.apiactionurl + environment.fetchallItem);
  }


  fetchitemledgerrpt(companyid:string): Observable<any> {
      console.log('companyyy '+companyid);
      return this.httpclient.get(environment.apiacturl+environment.fetchitemledgerrpt+companyid,{headers:{ }})
    }


    editItem(tid :number,companyid:number){
      return this.httpclient.post(`${environment.apibaseurl}${environment.edititem}/$${tid}/${companyid}`,{});
    }
}
