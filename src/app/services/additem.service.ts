import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface item{
 
  itemDesc: string;
  itemCode: number;
  selectHSN: string;
  selectItem:string;
  selectStock: string;
  selectPrimaryUnit: string;
  // selectAltUnit: string;
  selectItemGroup: string;
  selectGst: string;
  selectunitname:string;
  openingbalance: number;
  closingbalance: number;
  attr1: string ;
  attr2: string;
  attr3:string;
  attr4: string ;
  attr5: string ;
  attr6: string;
  attr7: string ;
  attr8: string ;
  barcode: number;
  minimum: number;
  maximum: number;
  reorder: string;
  // description: string;
  // dimension: string ;
  // weight: number ;
  // brandname: string ;
  // modelname: string ;
  // category: string ;
  // weightunit: number;
  // relailprofit: number;
  // delarprofit: number;
  selectGstservice:any;
  unitname$:any;
  hsnname$:any;
  hsnname:string;
  stocktypename$:any;
  stocktypename:string;
  itemtypename$:any;
  itemtypename:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdditemService {

  constructor(private httpclient:HttpClient) { }
  createItem(items:item,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.additem,items,{headers:{'key':key,'user':user}})
  }
  fetchallItem(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallitem+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
