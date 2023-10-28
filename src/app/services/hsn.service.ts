import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface hsn{
  hsncode: string;
  unit: string;
  desc: string;
  companyid:number;
}


@Injectable({
  providedIn: 'root'
})
export class HsnService {
  

  constructor(private httpclient: HttpClient) {}

  getHSNNames(companyid:number): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchhsn+'?companyid='+companyid);
  }

  createHSN(hsn:hsn,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addHsn,hsn,{headers:{'key':key,'user':user}})
  }

}
