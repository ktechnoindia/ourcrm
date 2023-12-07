import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface passdata{
  create_pass:string;
  confirm_pass:string;

}
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private httpclient: HttpClient) {}

  createpass(password:passdata,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpass,password,{headers:{'key':key,'user':user}})
  }
}
