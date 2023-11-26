import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface leadstore {
  catPerson:string;
  companyname:string
  phone:string;
  emails:string;
  pncode:string;
  fulladdress:string;
  lscore:number;
  selectpd:number;
  executivename:number;
  selectedCountry:number;
  selectedState: number;
  selectedDistrict: number;
  rmark:string;
  c:number;
  u:number;
  r:number;

}
@Injectable({
  providedIn: 'root'
})
export class LeadService {
 
  constructor(private httpclient:HttpClient) { }
  createLead(lead:leadstore,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addlead,lead,{headers:{'key':key,'user':user}})
  }
  fetchallleads(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiacturl+environment.fetchallleads+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
  
}
