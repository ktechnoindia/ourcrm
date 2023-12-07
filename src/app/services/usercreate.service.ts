import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface userdata{
  username:string;
  usercode:string;
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
    return this.httpclient.post(environment.apiactionurl+environment.adduser,UsercreateService,{headers:{'key':key,'user':user}})
  }
}
