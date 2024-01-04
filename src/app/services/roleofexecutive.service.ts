import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface roleofexecut{
 
  exname: string ;
  extilte: string ;
  phone: string ;
  wpnumber: string ;
  email: string;
  selectedOption: number ;
  selectedState:  number;
  selectedDistrict:  number;
  pin_code: string ;
  fulladdress: string;
 companyid:number
}

@Injectable({
  providedIn: 'root'
})
export class RoleofexecutiveService {

  constructor(private httpclient:HttpClient) { }
  createRoleofExecutive(rolexecut:roleofexecut,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addroleofexecutive,rolexecut,{headers:{'key':key,'user':user}})
  }

  fetchroleexecutive(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiacturl+environment.fetchroleofexecutive+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
