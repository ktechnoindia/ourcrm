import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface leadstore {
  catPerson: string;
  phone:number;
  whatshappnumber: number;
  emails: string;
  selectedCountry : string;
  selectedState : string;
  selectedDistrict : string;
  pncode: number;
  fulladdress : string;
  lscore : string;
  select_sales_person : string;
  rmark : string;
}
@Injectable({
  providedIn: 'root'
})
export class LeadService {
  constructor(private httpclient:HttpClient) { }
  createLead(lead:leadstore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addlead,lead,{headers:{'key':key,'user':user}})
  }
}
