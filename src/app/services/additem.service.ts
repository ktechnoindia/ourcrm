import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface item{

  itemDesc: string;
   itemCode: number;
   selectHSN: number;
   selectItem:number;
   selectStock: number;
   selectPrimaryUnit: number;
   selectItemGroup: number;
   selectGst: number;
   selectunitname:number;
   openingbalance: string;
   closingbalance: string;
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
   selectGstservice:number;
   hsnname:string;
   stocktypename:string;
   itemtypename:string;
   unitname:string;
 itemtype:string;
 stocktype:string;
 
   unitname$:any;
   hsnname$:any;
   itemtypename$:any;
   stocktypename$:any;

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
