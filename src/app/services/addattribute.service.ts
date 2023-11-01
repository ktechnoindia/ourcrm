import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { attr } from 'highcharts';

export interface addattribute{
  attname:string;
  // attdetails:string;
}
@Injectable({
  providedIn: 'root'
})
export class AddattributeService {

  constructor(private httpclient:HttpClient) { }
  createAttribute(addatt:addattribute,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addattribute,addatt,{headers:{'key':key,'user':user}})
  }
}
