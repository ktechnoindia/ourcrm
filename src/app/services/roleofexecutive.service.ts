import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface roleofexecut{
 
  exname: string ;
  extilte: string ;
  phone: string ;
  wpnumber: string ;
  email: string;
  selectedOption: number ;
  selectedState:  number;
  selectedDistrict:  number;
  pinCode: string ;
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
