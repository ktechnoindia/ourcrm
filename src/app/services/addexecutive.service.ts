import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface execut{
  role: string;
  name: string;
  manager: string;
  phone_number: number;
  email: string ;
  whatshapp_number: number;
  pan_number: number;
  commission: string;
  ledger: string;
  excode:string;
}

@Injectable({
  providedIn: 'root'
})
export class AddexecutiveService {

  constructor(private httpclient:HttpClient) { }
  createExecutive(executive:execut,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addexecutive,executive,{headers:{key:'key',user:'user'}})
  }

  fetchAllExecutive(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallexecuitve+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
