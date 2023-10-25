import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


export interface ledg{
  name:string;
  group_name:string;
  address:string;
  alternate_name:string;
  vender_code:string;
  gstin:string;
  opening_balance:string;
  closing_balance:string;
 
}

@Injectable({
  providedIn: 'root'
})
export class LegderService {

  constructor(private httpclient:HttpClient) { }
  createLdeger(ledger:ledg,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addledger,ledger,{headers:{'key':key,'user':user}})
  }
}
