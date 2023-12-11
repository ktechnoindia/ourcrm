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
    const body = new URLSearchParams();
    body.set('username', login.username);
    body.set('password', login.password);
    
    return this.httpclient.post(environment.apiloginurl+environment.addlogin,body.toString(),{headers:{'key':key,'user':user,'Content-Type': 'application/x-www-form-urlencoded'}})
  }
}
