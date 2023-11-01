import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface userdata{
  fname:string;
  usercode:string;
  fathname:string;
  email:string;
  phone:string;
  roleid: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsercreateService {

  constructor(private httpclient: HttpClient) {}

  createuser(UsercreateService:userdata,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.adduser,user,{headers:{'key':key,'user':user}})
  }
}
