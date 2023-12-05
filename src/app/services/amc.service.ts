import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface amc{
  amc_id:string;
  amc_date:string;
  cust_code:string;
  cust_name:number;
  bill_number:string;
  renew_date:string;
  service_type:number;
  servic_coverage:string;
  itemname:number;
  saler_price:string;
  amc_type:number;
  amc_period:number;
}
@Injectable({
  providedIn: 'root'
})
export class AmcService {

  constructor(private httpclient:HttpClient) { }

  createAmc(createamc:amc,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addamc,createamc,{headers:{'key':key,'user':user}})
  }

  fetchallAmc(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiacturl+environment.fetchamc+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
