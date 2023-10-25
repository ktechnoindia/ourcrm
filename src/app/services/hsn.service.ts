import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface hsn{
  hsnCode: number;
  unit: number;
  desc: string;
}


@Injectable({
  providedIn: 'root'
})
export class HsnService {

  constructor(private httpclient: HttpClient) {}

  gethsnservice(): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchhsn);
  }

  createHSN(hsnmanager:hsn,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addHsn,hsnmanager,{headers:{'key':key,'user':user}})
  }

}
