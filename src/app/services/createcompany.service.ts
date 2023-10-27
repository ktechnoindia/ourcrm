import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface companystore {
  cpyname: string;
  gstin:string;
  selectedCountry: string;
  selectedState: number;
  selectedDistrict : string;
  pinCode : string;
  address : string;
  phone : string;
  wpnumber : string;
  email : string;
  logo : string;
  rdate : string;
  industry : string;
  businesstype : string;
  segmenttype : string;
  companytype : string;
  pannumber : string;
  tanno : string;
  sales : string;
  purchase : string;
  quotation : string;
  challan : string;
  lms : string;
  amc : string;
  alloftheabove : string;
  language : string;
  currency : string;
  bname:string;
  accno:string;
  ifsc:string;
  branchname:string;
  upiid:string;
website:string;
selectedCountry1: string;
  selectedState1: number;
  selectedDistrict1 : string;
  pinCode1 : string;
  address1 : string;
  phone1 : string;
  wpnumber1 : string;
  email1 : string;
  website1:string;
}

@Injectable({
  providedIn: 'root'
})
export class CreatecompanyService {

  constructor(private httpclient:HttpClient) { }
  createcomapany(company:companystore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addcompany,company,{headers:{'key':key,'user':user}})
  }}
