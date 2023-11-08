import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface execut{
  roleid: number;
  excode:string;
  executivename: string;
  emanager: string;
  emobile: string;
  eemail: string;
  ewhatsapp: string;
  epan: string;
  ecommision: string;
  ledger: string;
  companyid:1;
}
@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {
  
  constructor(private httpclient: HttpClient) {}
  
  getexecutive(): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchexecutive);
  }

  createExecutive(executive:execut,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addexecutive,executive,{headers:{key:'key',user:'user'}})
  }

  fetchAllExecutive(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apibaseurl+environment.fetchexecutive+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}

