import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface addattribute{
  attname:string;
  companyid:number,
  // attdetails:string;
}
@Injectable({
  providedIn: 'root'
})
export class AddattributeService {

  constructor(private httpclient:HttpClient) { }
  createAttribute(addatt:addattribute,key:string,user:string){
    return this.httpclient.post(environment.apibaseurl+environment.addattribute,addatt,{headers:{'key':key,'user':user}})
  }
  getattribute(companyid:number): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchattribute+'/'+companyid);
  }
}
