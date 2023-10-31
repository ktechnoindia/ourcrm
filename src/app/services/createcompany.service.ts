import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface companystore {
  cpyname: string;
  gstin: string;
  selectedCountry: string;
  selectedState: number;
  selectedDistrict: string;
  pinCode: string;
  address: string;
  phone: string;
  wpnumber: string;
  email: string;
  logo: string;
  rdate: string;
  industry: string;
  businesstype: string;
  segmenttype: string;
  companytype: string;
  pannumber: string;
  tanno: string;
  sales: boolean;
  purchase: boolean;
  quotation: boolean;
  challan: boolean;
  lms: boolean;
  amc: boolean;
  alloftheabove: boolean;
  language: string;
  currency: string;
  bname: string;
  accno: string;
  ifsc: string;
  branchname: string;
  upiid: string;
  website: string;
  selectedCountry1: string;
  selectedState1: number;
  selectedDistrict1: string;
  pinCode1: string;
  address1: string;
  phone1: string;
  wpnumber1: string;
  email1: string;
  website1: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreatecompanyService {
  fetchallservice(arg0: string, arg1: string, arg2: string): Observable<any[]> {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient: HttpClient) { }
  createcomapany(company: companystore, key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addcompany, company, { headers: { 'key': key, 'user': user } })
  }
  fetchallCompany(companyid: string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallcompany + '?p=' + companyid, { headers: { 'key': key, 'user': user } })
  }
}
