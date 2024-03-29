import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface companystore {
  cpyname: string;
  gstin: string;
  selectedCountry: number;
  selectedState: number;
  selectedDistrict: number;
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
  lms: boolean;
  challan: boolean;
  amc: boolean;
  alloftheabove: boolean;
  language: number;
  currency: number;
  bname: string;
  accno: string;
  ifsc: string;
  branchname: string;
  upiid: string;
  website: string;
  selectedCountry1: number;
  selectedState1: number;
  selectedDistrict1: number;
  pinCode1: string;
  address1: string;
  phone1: string;
  wpnumber1: string;
  email1: string;
  website1: string;
  userid:number;
}

@Injectable({
  providedIn: 'root'
})
export class CreatecompanyService {
  deleteCompany(arg0: string, keys: string, userid: void) {
    throw new Error('Method not implemented.');
  }
  fetchallservice(arg0: string, arg1: string, arg2: string): Observable<any[]> {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient: HttpClient) { }
  createCompany(company: companystore, key: string, user: string) {
    return this.httpclient.post(environment.apiactionurl + environment.addcompany, company, { headers: { 'key': key, 'user': user } })
  }
  fetchallcompany(companyid: number, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
    return this.httpclient.get(environment.apiactionurl + environment.fetchallcompany +'?p='+companyid , { headers: { 'key': key, 'user': user } })
  }
}
