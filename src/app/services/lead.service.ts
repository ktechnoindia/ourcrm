import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface leadstore {
  catPerson:string,
  companyname:string,
  phone:string,
  pncode:string,
  fulladdress:string,
  emails:string,
  lscore:number,
  rmark:string,
  selectpd:string
  executivename:number,
  selectedCountry:number,
  selectedState: number,
  selectedDistrict: number,

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
