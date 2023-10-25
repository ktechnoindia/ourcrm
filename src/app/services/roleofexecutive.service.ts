import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface roleofexecut{
 
  exname: string;
  extilte: string;
  phone: number;
  wpnumber: number;
  email: string;
  selectedCountry: string;
  selectedState:string;
  selectedDistrict: string;
  pinCode: number;
  fulladdress: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class RoleofexecutiveService {

  constructor(private httpclient:HttpClient) { }
  createRoleofExecutive(rolexecut:roleofexecut,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addroleofexecutive,rolexecut,{headers:{'key':key,'user':user}})
  }
}
