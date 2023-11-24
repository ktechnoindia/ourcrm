import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface logindata{
  emailphone:string;
  password:string;
  username: string;

}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpclient: HttpClient) {}

  createlogin(login:logindata,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addlogin,login,{headers:{'key':key,'user':user}})
  }
}
