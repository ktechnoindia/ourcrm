import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface changepass{
  oldpass: string;
  newpass: string;
  cunfpass: string;


}

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private httpclient: HttpClient) {}

  createChangePass(changepassword:changepass,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addpass,changepassword,{headers:{'key':key,'user':user}})
  }
}
