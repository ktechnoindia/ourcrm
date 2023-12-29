import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface userdata{
  username:string;
  companyid:number;
  fathname:string;
  email:string;
  phone:string;
  roletype: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsercreateService {

  constructor(private httpclient: HttpClient) {}

  createuser(UsercreateService:userdata,key:string,user:string){
    return this.httpclient.post(environment.apiloginurl+environment.adduser,UsercreateService,{headers:{'key':key,'user':user}})
  }
}
